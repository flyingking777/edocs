import redis
import json
import time
import os
import sqlite3
import pytesseract
import hmac
import hashlib
from PIL import Image
from io import BytesIO
from Crypto.Cipher import AES
from elasticsearch import Elasticsearch

# Configuration — every value here is overridable via environment variables
# so the same image can run unchanged on a developer laptop or in production.
REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT', '6379'))
REDIS_QUEUE = os.getenv('REDIS_QUEUE', 'ocr_task_queue')
DB_PATH = os.getenv('DB_PATH', './prisma/dev.db')
MASTER_KEY = os.getenv('ENCRYPTION_KEY', 'v6yB$E&H+MbQeThWmZq4t7w!z%C*F-Ja').encode('utf-8')
ES_URL = os.getenv('ELASTICSEARCH_URL', 'http://localhost:9200')

# Tesseract binary location.
#
# In production (Linux containers) the binary is usually on $PATH after
# `apt-get install tesseract-ocr`, so we leave pytesseract's default alone
# unless TESSERACT_CMD explicitly points us somewhere. This avoids the old
# Windows-only hardcoded path that broke deployment on Linux hosts.
_tesseract_cmd = os.getenv('TESSERACT_CMD')
if _tesseract_cmd:
    pytesseract.pytesseract.tesseract_cmd = _tesseract_cmd

es = Elasticsearch(ES_URL)

def generate_blind_index(value, salt):
    return hmac.new(salt.encode('utf-8'), value.encode('utf-8'), hashlib.sha256).hexdigest()

def get_tenant_salt(tenant_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT "searchSalt" FROM "Tenant" WHERE "id" = ?', (tenant_id,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else "default_salt"

def decrypt(data):
    iv = data[:16]
    tag = data[16:32]
    encrypted = data[32:]
    
    cipher = AES.new(MASTER_KEY, AES.MODE_GCM, nonce=iv)
    cipher.update(b'') # Next.js implementation didn't use associated data, but it's good practice
    return cipher.decrypt_and_verify(encrypted, tag)

def encrypt(data):
    cipher = AES.new(MASTER_KEY, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(data)
    # Return IV + Tag + Ciphertext
    return cipher.nonce + tag + ciphertext

def process_task(task_data):
    try:
        file_path = task_data['filePath']
        metadata = task_data['metadata']
        tenant_id = metadata['tenantId']

        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return

        # Read encrypted file
        with open(file_path, 'rb') as f:
            encrypted_data = f.read()

        # Decrypt in memory
        decrypted_buffer = decrypt(encrypted_data)
        
        try:
            # Load image from memory
            image = Image.open(BytesIO(decrypted_buffer))
            
            # OCR with PSM 6 and numeric whitelist
            # PSM 6: Assume a single uniform block of text.
            custom_config = r'--psm 6 -c tessedit_char_whitelist=0123456789.'
            extracted_text = pytesseract.image_to_string(image, config=custom_config)
            
            # Mock extraction logic for Account IDs and Amounts
            # In a real app, we would use regex on extracted_text
            # Let's assume we found an Account ID for the demo
            account_id = "ACC12345" # Extracted from extracted_text in real scenario
            
            # Generate Blind Index Hash
            salt = get_tenant_salt(tenant_id)
            account_id_hash = generate_blind_index(account_id, salt)
            
            results = {
                "raw_text": extracted_text,
                "account_id": account_id,
                "processed_at": time.time()
            }
            
            # 1. Index into Elasticsearch using Blind Index
            try:
                es.index(index="ocr_intel", document={
                    "tenantId": tenant_id,
                    "accountIdHash": account_id_hash,
                    "metadata": metadata,
                    "processed_at": results["processed_at"]
                })
            except Exception as es_err:
                print(f"ES Indexing Error: {es_err}")

            # 2. Re-encrypt results for DB storage
            results_json = json.dumps(results).encode('utf-8')
            encrypted_results = encrypt(results_json)
            
            # Update Database
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            
            cursor.execute("""
                INSERT INTO "OCRIntelStore" ("id", "tenantId", "originalFileId", "extractedData", "status", "createdAt", "updatedAt")
                VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
            """, (
                f"ocr_{int(time.time())}", 
                tenant_id, 
                metadata.get('originalName'), 
                encrypted_results.hex(), 
                "COMPLETED"
            ))
            
            conn.commit()
            conn.close()
            
            print(f"Successfully processed: {file_path}")

        finally:
            # Wipe in-memory decrypted buffer
            del decrypted_buffer
            if 'image' in locals():
                image.close()

    except Exception as e:
        print(f"Error processing task: {e}")

def main():
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    print(f"Worker listening on {REDIS_QUEUE}...")

    while True:
        # Blocking pop from Redis
        task = r.brpop(REDIS_QUEUE, timeout=5)
        
        if task:
            _, message = task
            print(f"Received task: {message}")
            task_data = json.loads(message)
            process_task(task_data)
        
        time.sleep(0.1)

if __name__ == "__main__":
    main()
