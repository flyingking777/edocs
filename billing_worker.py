import os
import sqlite3
import time

# Both paths are overridable via env so the same script can run in containers
# or in a dev checkout without code edits.
DB_PATH = os.getenv('DB_PATH', './prisma/dev.db')
STORAGE_BASE_PATH = os.getenv('STORAGE_BASE_PATH', './storage')
BILLING_INTERVAL_SECONDS = int(os.getenv('BILLING_INTERVAL_SECONDS', '3600'))

def get_size(start_path='.'):
    total_size = 0
    if not os.path.exists(start_path):
        return 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)
    return total_size

def run_billing_check():
    print(f"[{time.ctime()}] Running billing cycle...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        # Get all tenants and their current plans
        cursor.execute('''
            SELECT T.id, T.name, SP.storageLimit, SP.ocrLimit, IFNULL(TBM.ocrCount, 0)
            FROM Tenant T
            JOIN SubscriptionPlan SP ON T.id = SP.tenantId
            LEFT JOIN TenantBillingMeter TBM ON T.id = TBM.tenantId
        ''')
        tenants = cursor.fetchall()

        for tenant_id, name, storage_limit, ocr_limit, current_ocr_count in tenants:
            # 1. Calculate Storage Usage
            tenant_storage_path = os.path.join(STORAGE_BASE_PATH, tenant_id)
            current_storage_usage = get_size(tenant_storage_path)

            print(f"Tenant: {name}")
            print(f"  Storage: {current_storage_usage}/{storage_limit} bytes")
            print(f"  OCR: {current_ocr_count}/{ocr_limit} units")

            # 2. Check Limits
            is_over_quota = False
            if current_storage_usage > storage_limit:
                print(f"  ! Storage Limit Exceeded")
                is_over_quota = True
            if current_ocr_count > ocr_limit:
                print(f"  ! OCR Limit Exceeded")
                is_over_quota = True

            # 3. Update Status
            new_status = 'OVER_QUOTA' if is_over_quota else 'ACTIVE'
            cursor.execute('UPDATE Tenant SET status = ?, updatedAt = datetime("now") WHERE id = ?', (new_status, tenant_id))
            print(f"  Status updated to: {new_status}")

        conn.commit()
    except Exception as e:
        print(f"Error in billing cycle: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    while True:
        run_billing_check()
        print(f"Billing cycle complete. Sleeping for {BILLING_INTERVAL_SECONDS}s...")
        time.sleep(BILLING_INTERVAL_SECONDS)

