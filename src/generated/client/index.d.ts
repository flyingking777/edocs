
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Label
 * 
 */
export type Label = $Result.DefaultSelection<Prisma.$LabelPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model TenantSettings
 * 
 */
export type TenantSettings = $Result.DefaultSelection<Prisma.$TenantSettingsPayload>
/**
 * Model DocumentPermission
 * 
 */
export type DocumentPermission = $Result.DefaultSelection<Prisma.$DocumentPermissionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ActiveSession
 * 
 */
export type ActiveSession = $Result.DefaultSelection<Prisma.$ActiveSessionPayload>
/**
 * Model SecurityLog
 * 
 */
export type SecurityLog = $Result.DefaultSelection<Prisma.$SecurityLogPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model UserDepartment
 * 
 */
export type UserDepartment = $Result.DefaultSelection<Prisma.$UserDepartmentPayload>
/**
 * Model Folder
 * 
 */
export type Folder = $Result.DefaultSelection<Prisma.$FolderPayload>
/**
 * Model FolderPermission
 * 
 */
export type FolderPermission = $Result.DefaultSelection<Prisma.$FolderPermissionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Documents
 * const documents = await prisma.document.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Documents
   * const documents = await prisma.document.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.label`: Exposes CRUD operations for the **Label** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Labels
    * const labels = await prisma.label.findMany()
    * ```
    */
  get label(): Prisma.LabelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantSettings`: Exposes CRUD operations for the **TenantSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantSettings
    * const tenantSettings = await prisma.tenantSettings.findMany()
    * ```
    */
  get tenantSettings(): Prisma.TenantSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentPermission`: Exposes CRUD operations for the **DocumentPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentPermissions
    * const documentPermissions = await prisma.documentPermission.findMany()
    * ```
    */
  get documentPermission(): Prisma.DocumentPermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activeSession`: Exposes CRUD operations for the **ActiveSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveSessions
    * const activeSessions = await prisma.activeSession.findMany()
    * ```
    */
  get activeSession(): Prisma.ActiveSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.securityLog`: Exposes CRUD operations for the **SecurityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityLogs
    * const securityLogs = await prisma.securityLog.findMany()
    * ```
    */
  get securityLog(): Prisma.SecurityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDepartment`: Exposes CRUD operations for the **UserDepartment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDepartments
    * const userDepartments = await prisma.userDepartment.findMany()
    * ```
    */
  get userDepartment(): Prisma.UserDepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.folder`: Exposes CRUD operations for the **Folder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Folders
    * const folders = await prisma.folder.findMany()
    * ```
    */
  get folder(): Prisma.FolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.folderPermission`: Exposes CRUD operations for the **FolderPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FolderPermissions
    * const folderPermissions = await prisma.folderPermission.findMany()
    * ```
    */
  get folderPermission(): Prisma.FolderPermissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Document: 'Document',
    Label: 'Label',
    AuditLog: 'AuditLog',
    TenantSettings: 'TenantSettings',
    DocumentPermission: 'DocumentPermission',
    User: 'User',
    ActiveSession: 'ActiveSession',
    SecurityLog: 'SecurityLog',
    Department: 'Department',
    UserDepartment: 'UserDepartment',
    Folder: 'Folder',
    FolderPermission: 'FolderPermission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "document" | "label" | "auditLog" | "tenantSettings" | "documentPermission" | "user" | "activeSession" | "securityLog" | "department" | "userDepartment" | "folder" | "folderPermission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Label: {
        payload: Prisma.$LabelPayload<ExtArgs>
        fields: Prisma.LabelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LabelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LabelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          findFirst: {
            args: Prisma.LabelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LabelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          findMany: {
            args: Prisma.LabelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          create: {
            args: Prisma.LabelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          createMany: {
            args: Prisma.LabelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LabelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          delete: {
            args: Prisma.LabelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          update: {
            args: Prisma.LabelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          deleteMany: {
            args: Prisma.LabelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LabelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LabelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          upsert: {
            args: Prisma.LabelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          aggregate: {
            args: Prisma.LabelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLabel>
          }
          groupBy: {
            args: Prisma.LabelGroupByArgs<ExtArgs>
            result: $Utils.Optional<LabelGroupByOutputType>[]
          }
          count: {
            args: Prisma.LabelCountArgs<ExtArgs>
            result: $Utils.Optional<LabelCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      TenantSettings: {
        payload: Prisma.$TenantSettingsPayload<ExtArgs>
        fields: Prisma.TenantSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          findFirst: {
            args: Prisma.TenantSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          findMany: {
            args: Prisma.TenantSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>[]
          }
          create: {
            args: Prisma.TenantSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          createMany: {
            args: Prisma.TenantSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>[]
          }
          delete: {
            args: Prisma.TenantSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          update: {
            args: Prisma.TenantSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          deleteMany: {
            args: Prisma.TenantSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>[]
          }
          upsert: {
            args: Prisma.TenantSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSettingsPayload>
          }
          aggregate: {
            args: Prisma.TenantSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantSettings>
          }
          groupBy: {
            args: Prisma.TenantSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<TenantSettingsCountAggregateOutputType> | number
          }
        }
      }
      DocumentPermission: {
        payload: Prisma.$DocumentPermissionPayload<ExtArgs>
        fields: Prisma.DocumentPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          findFirst: {
            args: Prisma.DocumentPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          findMany: {
            args: Prisma.DocumentPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>[]
          }
          create: {
            args: Prisma.DocumentPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          createMany: {
            args: Prisma.DocumentPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>[]
          }
          delete: {
            args: Prisma.DocumentPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          update: {
            args: Prisma.DocumentPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          deleteMany: {
            args: Prisma.DocumentPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>[]
          }
          upsert: {
            args: Prisma.DocumentPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPermissionPayload>
          }
          aggregate: {
            args: Prisma.DocumentPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentPermission>
          }
          groupBy: {
            args: Prisma.DocumentPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentPermissionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ActiveSession: {
        payload: Prisma.$ActiveSessionPayload<ExtArgs>
        fields: Prisma.ActiveSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          findFirst: {
            args: Prisma.ActiveSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          findMany: {
            args: Prisma.ActiveSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>[]
          }
          create: {
            args: Prisma.ActiveSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          createMany: {
            args: Prisma.ActiveSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>[]
          }
          delete: {
            args: Prisma.ActiveSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          update: {
            args: Prisma.ActiveSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          deleteMany: {
            args: Prisma.ActiveSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActiveSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>[]
          }
          upsert: {
            args: Prisma.ActiveSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveSessionPayload>
          }
          aggregate: {
            args: Prisma.ActiveSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveSession>
          }
          groupBy: {
            args: Prisma.ActiveSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveSessionCountAggregateOutputType> | number
          }
        }
      }
      SecurityLog: {
        payload: Prisma.$SecurityLogPayload<ExtArgs>
        fields: Prisma.SecurityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findFirst: {
            args: Prisma.SecurityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findMany: {
            args: Prisma.SecurityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          create: {
            args: Prisma.SecurityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          createMany: {
            args: Prisma.SecurityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          delete: {
            args: Prisma.SecurityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          update: {
            args: Prisma.SecurityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          deleteMany: {
            args: Prisma.SecurityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecurityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          upsert: {
            args: Prisma.SecurityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          aggregate: {
            args: Prisma.SecurityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityLog>
          }
          groupBy: {
            args: Prisma.SecurityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityLogCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityLogCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      UserDepartment: {
        payload: Prisma.$UserDepartmentPayload<ExtArgs>
        fields: Prisma.UserDepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          findFirst: {
            args: Prisma.UserDepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          findMany: {
            args: Prisma.UserDepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>[]
          }
          create: {
            args: Prisma.UserDepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          createMany: {
            args: Prisma.UserDepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>[]
          }
          delete: {
            args: Prisma.UserDepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          update: {
            args: Prisma.UserDepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          deleteMany: {
            args: Prisma.UserDepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>[]
          }
          upsert: {
            args: Prisma.UserDepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDepartmentPayload>
          }
          aggregate: {
            args: Prisma.UserDepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDepartment>
          }
          groupBy: {
            args: Prisma.UserDepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<UserDepartmentCountAggregateOutputType> | number
          }
        }
      }
      Folder: {
        payload: Prisma.$FolderPayload<ExtArgs>
        fields: Prisma.FolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          findFirst: {
            args: Prisma.FolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          findMany: {
            args: Prisma.FolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          create: {
            args: Prisma.FolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          createMany: {
            args: Prisma.FolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          delete: {
            args: Prisma.FolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          update: {
            args: Prisma.FolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          deleteMany: {
            args: Prisma.FolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          upsert: {
            args: Prisma.FolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          aggregate: {
            args: Prisma.FolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFolder>
          }
          groupBy: {
            args: Prisma.FolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<FolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.FolderCountArgs<ExtArgs>
            result: $Utils.Optional<FolderCountAggregateOutputType> | number
          }
        }
      }
      FolderPermission: {
        payload: Prisma.$FolderPermissionPayload<ExtArgs>
        fields: Prisma.FolderPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FolderPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FolderPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          findFirst: {
            args: Prisma.FolderPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FolderPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          findMany: {
            args: Prisma.FolderPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>[]
          }
          create: {
            args: Prisma.FolderPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          createMany: {
            args: Prisma.FolderPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FolderPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>[]
          }
          delete: {
            args: Prisma.FolderPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          update: {
            args: Prisma.FolderPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          deleteMany: {
            args: Prisma.FolderPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FolderPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FolderPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>[]
          }
          upsert: {
            args: Prisma.FolderPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPermissionPayload>
          }
          aggregate: {
            args: Prisma.FolderPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFolderPermission>
          }
          groupBy: {
            args: Prisma.FolderPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FolderPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FolderPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<FolderPermissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    document?: DocumentOmit
    label?: LabelOmit
    auditLog?: AuditLogOmit
    tenantSettings?: TenantSettingsOmit
    documentPermission?: DocumentPermissionOmit
    user?: UserOmit
    activeSession?: ActiveSessionOmit
    securityLog?: SecurityLogOmit
    department?: DepartmentOmit
    userDepartment?: UserDepartmentOmit
    folder?: FolderOmit
    folderPermission?: FolderPermissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    labels: number
    permissions: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    labels?: boolean | DocumentCountOutputTypeCountLabelsArgs
    permissions?: boolean | DocumentCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPermissionWhereInput
  }


  /**
   * Count Type LabelCountOutputType
   */

  export type LabelCountOutputType = {
    documents: number
  }

  export type LabelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | LabelCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * LabelCountOutputType without action
   */
  export type LabelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabelCountOutputType
     */
    select?: LabelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LabelCountOutputType without action
   */
  export type LabelCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    departments: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | UserCountOutputTypeCountDepartmentsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDepartmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveSessionWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    users: number
    documents: number
    folders: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | DepartmentCountOutputTypeCountUsersArgs
    documents?: boolean | DepartmentCountOutputTypeCountDocumentsArgs
    folders?: boolean | DepartmentCountOutputTypeCountFoldersArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDepartmentWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
  }


  /**
   * Count Type FolderCountOutputType
   */

  export type FolderCountOutputType = {
    children: number
    documents: number
    permissions: number
  }

  export type FolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | FolderCountOutputTypeCountChildrenArgs
    documents?: boolean | FolderCountOutputTypeCountDocumentsArgs
    permissions?: boolean | FolderCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderCountOutputType
     */
    select?: FolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderPermissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    path: string | null
    mimeType: string | null
    userId: string | null
    departmentId: string | null
    folderId: string | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
    deletedByUserId: string | null
    searchTokens: string | null
    indexedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    path: string | null
    mimeType: string | null
    userId: string | null
    departmentId: string | null
    folderId: string | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
    deletedByUserId: string | null
    searchTokens: string | null
    indexedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    name: number
    displayName: number
    path: number
    mimeType: number
    userId: number
    departmentId: number
    folderId: number
    status: number
    createdAt: number
    deletedAt: number
    deletedByUserId: number
    searchTokens: number
    indexedAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    path?: true
    mimeType?: true
    userId?: true
    departmentId?: true
    folderId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
    searchTokens?: true
    indexedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    path?: true
    mimeType?: true
    userId?: true
    departmentId?: true
    folderId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
    searchTokens?: true
    indexedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    path?: true
    mimeType?: true
    userId?: true
    departmentId?: true
    folderId?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
    searchTokens?: true
    indexedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    name: string
    displayName: string | null
    path: string
    mimeType: string
    userId: string
    departmentId: string | null
    folderId: string | null
    status: string
    createdAt: Date
    deletedAt: Date | null
    deletedByUserId: string | null
    searchTokens: string | null
    indexedAt: Date | null
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    path?: boolean
    mimeType?: boolean
    userId?: boolean
    departmentId?: boolean
    folderId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    searchTokens?: boolean
    indexedAt?: boolean
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
    labels?: boolean | Document$labelsArgs<ExtArgs>
    permissions?: boolean | Document$permissionsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    path?: boolean
    mimeType?: boolean
    userId?: boolean
    departmentId?: boolean
    folderId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    searchTokens?: boolean
    indexedAt?: boolean
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    path?: boolean
    mimeType?: boolean
    userId?: boolean
    departmentId?: boolean
    folderId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    searchTokens?: boolean
    indexedAt?: boolean
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    name?: boolean
    displayName?: boolean
    path?: boolean
    mimeType?: boolean
    userId?: boolean
    departmentId?: boolean
    folderId?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    searchTokens?: boolean
    indexedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "displayName" | "path" | "mimeType" | "userId" | "departmentId" | "folderId" | "status" | "createdAt" | "deletedAt" | "deletedByUserId" | "searchTokens" | "indexedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
    labels?: boolean | Document$labelsArgs<ExtArgs>
    permissions?: boolean | Document$permissionsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Document$departmentArgs<ExtArgs>
    folder?: boolean | Document$folderArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      folder: Prisma.$FolderPayload<ExtArgs> | null
      labels: Prisma.$LabelPayload<ExtArgs>[]
      permissions: Prisma.$DocumentPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      displayName: string | null
      path: string
      mimeType: string
      userId: string
      departmentId: string | null
      folderId: string | null
      status: string
      createdAt: Date
      deletedAt: Date | null
      deletedByUserId: string | null
      searchTokens: string | null
      indexedAt: Date | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends Document$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Document$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    folder<T extends Document$folderArgs<ExtArgs> = {}>(args?: Subset<T, Document$folderArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    labels<T extends Document$labelsArgs<ExtArgs> = {}>(args?: Subset<T, Document$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Document$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Document$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly name: FieldRef<"Document", 'String'>
    readonly displayName: FieldRef<"Document", 'String'>
    readonly path: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly userId: FieldRef<"Document", 'String'>
    readonly departmentId: FieldRef<"Document", 'String'>
    readonly folderId: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly deletedAt: FieldRef<"Document", 'DateTime'>
    readonly deletedByUserId: FieldRef<"Document", 'String'>
    readonly searchTokens: FieldRef<"Document", 'String'>
    readonly indexedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.department
   */
  export type Document$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * Document.folder
   */
  export type Document$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
  }

  /**
   * Document.labels
   */
  export type Document$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    cursor?: LabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Document.permissions
   */
  export type Document$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    where?: DocumentPermissionWhereInput
    orderBy?: DocumentPermissionOrderByWithRelationInput | DocumentPermissionOrderByWithRelationInput[]
    cursor?: DocumentPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentPermissionScalarFieldEnum | DocumentPermissionScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Label
   */

  export type AggregateLabel = {
    _count: LabelCountAggregateOutputType | null
    _min: LabelMinAggregateOutputType | null
    _max: LabelMaxAggregateOutputType | null
  }

  export type LabelMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  export type LabelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  export type LabelCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    _all: number
  }


  export type LabelMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type LabelMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type LabelCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    _all?: true
  }

  export type LabelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Label to aggregate.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Labels
    **/
    _count?: true | LabelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LabelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LabelMaxAggregateInputType
  }

  export type GetLabelAggregateType<T extends LabelAggregateArgs> = {
        [P in keyof T & keyof AggregateLabel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLabel[P]>
      : GetScalarType<T[P], AggregateLabel[P]>
  }




  export type LabelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithAggregationInput | LabelOrderByWithAggregationInput[]
    by: LabelScalarFieldEnum[] | LabelScalarFieldEnum
    having?: LabelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LabelCountAggregateInputType | true
    _min?: LabelMinAggregateInputType
    _max?: LabelMaxAggregateInputType
  }

  export type LabelGroupByOutputType = {
    id: string
    name: string
    userId: string
    _count: LabelCountAggregateOutputType | null
    _min: LabelMinAggregateOutputType | null
    _max: LabelMaxAggregateOutputType | null
  }

  type GetLabelGroupByPayload<T extends LabelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LabelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LabelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LabelGroupByOutputType[P]>
            : GetScalarType<T[P], LabelGroupByOutputType[P]>
        }
      >
    >


  export type LabelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    documents?: boolean | Label$documentsArgs<ExtArgs>
    _count?: boolean | LabelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["label"]>

  export type LabelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
  }, ExtArgs["result"]["label"]>

  export type LabelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
  }, ExtArgs["result"]["label"]>

  export type LabelSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
  }

  export type LabelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId", ExtArgs["result"]["label"]>
  export type LabelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | Label$documentsArgs<ExtArgs>
    _count?: boolean | LabelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LabelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LabelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LabelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Label"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string
    }, ExtArgs["result"]["label"]>
    composites: {}
  }

  type LabelGetPayload<S extends boolean | null | undefined | LabelDefaultArgs> = $Result.GetResult<Prisma.$LabelPayload, S>

  type LabelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LabelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LabelCountAggregateInputType | true
    }

  export interface LabelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Label'], meta: { name: 'Label' } }
    /**
     * Find zero or one Label that matches the filter.
     * @param {LabelFindUniqueArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LabelFindUniqueArgs>(args: SelectSubset<T, LabelFindUniqueArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Label that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LabelFindUniqueOrThrowArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LabelFindUniqueOrThrowArgs>(args: SelectSubset<T, LabelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Label that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindFirstArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LabelFindFirstArgs>(args?: SelectSubset<T, LabelFindFirstArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Label that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindFirstOrThrowArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LabelFindFirstOrThrowArgs>(args?: SelectSubset<T, LabelFindFirstOrThrowArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Labels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Labels
     * const labels = await prisma.label.findMany()
     * 
     * // Get first 10 Labels
     * const labels = await prisma.label.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const labelWithIdOnly = await prisma.label.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LabelFindManyArgs>(args?: SelectSubset<T, LabelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Label.
     * @param {LabelCreateArgs} args - Arguments to create a Label.
     * @example
     * // Create one Label
     * const Label = await prisma.label.create({
     *   data: {
     *     // ... data to create a Label
     *   }
     * })
     * 
     */
    create<T extends LabelCreateArgs>(args: SelectSubset<T, LabelCreateArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Labels.
     * @param {LabelCreateManyArgs} args - Arguments to create many Labels.
     * @example
     * // Create many Labels
     * const label = await prisma.label.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LabelCreateManyArgs>(args?: SelectSubset<T, LabelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Labels and returns the data saved in the database.
     * @param {LabelCreateManyAndReturnArgs} args - Arguments to create many Labels.
     * @example
     * // Create many Labels
     * const label = await prisma.label.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Labels and only return the `id`
     * const labelWithIdOnly = await prisma.label.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LabelCreateManyAndReturnArgs>(args?: SelectSubset<T, LabelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Label.
     * @param {LabelDeleteArgs} args - Arguments to delete one Label.
     * @example
     * // Delete one Label
     * const Label = await prisma.label.delete({
     *   where: {
     *     // ... filter to delete one Label
     *   }
     * })
     * 
     */
    delete<T extends LabelDeleteArgs>(args: SelectSubset<T, LabelDeleteArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Label.
     * @param {LabelUpdateArgs} args - Arguments to update one Label.
     * @example
     * // Update one Label
     * const label = await prisma.label.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LabelUpdateArgs>(args: SelectSubset<T, LabelUpdateArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Labels.
     * @param {LabelDeleteManyArgs} args - Arguments to filter Labels to delete.
     * @example
     * // Delete a few Labels
     * const { count } = await prisma.label.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LabelDeleteManyArgs>(args?: SelectSubset<T, LabelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Labels
     * const label = await prisma.label.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LabelUpdateManyArgs>(args: SelectSubset<T, LabelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labels and returns the data updated in the database.
     * @param {LabelUpdateManyAndReturnArgs} args - Arguments to update many Labels.
     * @example
     * // Update many Labels
     * const label = await prisma.label.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Labels and only return the `id`
     * const labelWithIdOnly = await prisma.label.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LabelUpdateManyAndReturnArgs>(args: SelectSubset<T, LabelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Label.
     * @param {LabelUpsertArgs} args - Arguments to update or create a Label.
     * @example
     * // Update or create a Label
     * const label = await prisma.label.upsert({
     *   create: {
     *     // ... data to create a Label
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Label we want to update
     *   }
     * })
     */
    upsert<T extends LabelUpsertArgs>(args: SelectSubset<T, LabelUpsertArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Labels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelCountArgs} args - Arguments to filter Labels to count.
     * @example
     * // Count the number of Labels
     * const count = await prisma.label.count({
     *   where: {
     *     // ... the filter for the Labels we want to count
     *   }
     * })
    **/
    count<T extends LabelCountArgs>(
      args?: Subset<T, LabelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LabelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Label.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LabelAggregateArgs>(args: Subset<T, LabelAggregateArgs>): Prisma.PrismaPromise<GetLabelAggregateType<T>>

    /**
     * Group by Label.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LabelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LabelGroupByArgs['orderBy'] }
        : { orderBy?: LabelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LabelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLabelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Label model
   */
  readonly fields: LabelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Label.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LabelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends Label$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Label$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Label model
   */
  interface LabelFieldRefs {
    readonly id: FieldRef<"Label", 'String'>
    readonly name: FieldRef<"Label", 'String'>
    readonly userId: FieldRef<"Label", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Label findUnique
   */
  export type LabelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label findUniqueOrThrow
   */
  export type LabelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label findFirst
   */
  export type LabelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label findFirstOrThrow
   */
  export type LabelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label findMany
   */
  export type LabelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Labels to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label create
   */
  export type LabelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The data needed to create a Label.
     */
    data: XOR<LabelCreateInput, LabelUncheckedCreateInput>
  }

  /**
   * Label createMany
   */
  export type LabelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Labels.
     */
    data: LabelCreateManyInput | LabelCreateManyInput[]
  }

  /**
   * Label createManyAndReturn
   */
  export type LabelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * The data used to create many Labels.
     */
    data: LabelCreateManyInput | LabelCreateManyInput[]
  }

  /**
   * Label update
   */
  export type LabelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The data needed to update a Label.
     */
    data: XOR<LabelUpdateInput, LabelUncheckedUpdateInput>
    /**
     * Choose, which Label to update.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label updateMany
   */
  export type LabelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Labels.
     */
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyInput>
    /**
     * Filter which Labels to update
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to update.
     */
    limit?: number
  }

  /**
   * Label updateManyAndReturn
   */
  export type LabelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * The data used to update Labels.
     */
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyInput>
    /**
     * Filter which Labels to update
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to update.
     */
    limit?: number
  }

  /**
   * Label upsert
   */
  export type LabelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The filter to search for the Label to update in case it exists.
     */
    where: LabelWhereUniqueInput
    /**
     * In case the Label found by the `where` argument doesn't exist, create a new Label with this data.
     */
    create: XOR<LabelCreateInput, LabelUncheckedCreateInput>
    /**
     * In case the Label was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LabelUpdateInput, LabelUncheckedUpdateInput>
  }

  /**
   * Label delete
   */
  export type LabelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter which Label to delete.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label deleteMany
   */
  export type LabelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Labels to delete
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to delete.
     */
    limit?: number
  }

  /**
   * Label.documents
   */
  export type Label$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Label without action
   */
  export type LabelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    metadata: string | null
    ip: string | null
    userAgent: string | null
    departmentId: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    metadata: string | null
    ip: string | null
    userAgent: string | null
    departmentId: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    metadata: number
    ip: number
    userAgent: number
    departmentId: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    metadata?: true
    ip?: true
    userAgent?: true
    departmentId?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    metadata?: true
    ip?: true
    userAgent?: true
    departmentId?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    metadata?: true
    ip?: true
    userAgent?: true
    departmentId?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: string
    metadata: string | null
    ip: string | null
    userAgent: string | null
    departmentId: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    departmentId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    departmentId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    departmentId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    departmentId?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "metadata" | "ip" | "userAgent" | "departmentId" | "timestamp", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      metadata: string | null
      ip: string | null
      userAgent: string | null
      departmentId: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'String'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly departmentId: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model TenantSettings
   */

  export type AggregateTenantSettings = {
    _count: TenantSettingsCountAggregateOutputType | null
    _min: TenantSettingsMinAggregateOutputType | null
    _max: TenantSettingsMaxAggregateOutputType | null
  }

  export type TenantSettingsMinAggregateOutputType = {
    id: string | null
    watermarkingEnabled: boolean | null
    antiScreenshotBlur: boolean | null
  }

  export type TenantSettingsMaxAggregateOutputType = {
    id: string | null
    watermarkingEnabled: boolean | null
    antiScreenshotBlur: boolean | null
  }

  export type TenantSettingsCountAggregateOutputType = {
    id: number
    watermarkingEnabled: number
    antiScreenshotBlur: number
    _all: number
  }


  export type TenantSettingsMinAggregateInputType = {
    id?: true
    watermarkingEnabled?: true
    antiScreenshotBlur?: true
  }

  export type TenantSettingsMaxAggregateInputType = {
    id?: true
    watermarkingEnabled?: true
    antiScreenshotBlur?: true
  }

  export type TenantSettingsCountAggregateInputType = {
    id?: true
    watermarkingEnabled?: true
    antiScreenshotBlur?: true
    _all?: true
  }

  export type TenantSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSettings to aggregate.
     */
    where?: TenantSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSettings to fetch.
     */
    orderBy?: TenantSettingsOrderByWithRelationInput | TenantSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantSettings
    **/
    _count?: true | TenantSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantSettingsMaxAggregateInputType
  }

  export type GetTenantSettingsAggregateType<T extends TenantSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantSettings[P]>
      : GetScalarType<T[P], AggregateTenantSettings[P]>
  }




  export type TenantSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSettingsWhereInput
    orderBy?: TenantSettingsOrderByWithAggregationInput | TenantSettingsOrderByWithAggregationInput[]
    by: TenantSettingsScalarFieldEnum[] | TenantSettingsScalarFieldEnum
    having?: TenantSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantSettingsCountAggregateInputType | true
    _min?: TenantSettingsMinAggregateInputType
    _max?: TenantSettingsMaxAggregateInputType
  }

  export type TenantSettingsGroupByOutputType = {
    id: string
    watermarkingEnabled: boolean
    antiScreenshotBlur: boolean
    _count: TenantSettingsCountAggregateOutputType | null
    _min: TenantSettingsMinAggregateOutputType | null
    _max: TenantSettingsMaxAggregateOutputType | null
  }

  type GetTenantSettingsGroupByPayload<T extends TenantSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], TenantSettingsGroupByOutputType[P]>
        }
      >
    >


  export type TenantSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }, ExtArgs["result"]["tenantSettings"]>

  export type TenantSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }, ExtArgs["result"]["tenantSettings"]>

  export type TenantSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }, ExtArgs["result"]["tenantSettings"]>

  export type TenantSettingsSelectScalar = {
    id?: boolean
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }

  export type TenantSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "watermarkingEnabled" | "antiScreenshotBlur", ExtArgs["result"]["tenantSettings"]>

  export type $TenantSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      watermarkingEnabled: boolean
      antiScreenshotBlur: boolean
    }, ExtArgs["result"]["tenantSettings"]>
    composites: {}
  }

  type TenantSettingsGetPayload<S extends boolean | null | undefined | TenantSettingsDefaultArgs> = $Result.GetResult<Prisma.$TenantSettingsPayload, S>

  type TenantSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantSettingsCountAggregateInputType | true
    }

  export interface TenantSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantSettings'], meta: { name: 'TenantSettings' } }
    /**
     * Find zero or one TenantSettings that matches the filter.
     * @param {TenantSettingsFindUniqueArgs} args - Arguments to find a TenantSettings
     * @example
     * // Get one TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantSettingsFindUniqueArgs>(args: SelectSubset<T, TenantSettingsFindUniqueArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantSettingsFindUniqueOrThrowArgs} args - Arguments to find a TenantSettings
     * @example
     * // Get one TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsFindFirstArgs} args - Arguments to find a TenantSettings
     * @example
     * // Get one TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantSettingsFindFirstArgs>(args?: SelectSubset<T, TenantSettingsFindFirstArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsFindFirstOrThrowArgs} args - Arguments to find a TenantSettings
     * @example
     * // Get one TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findMany()
     * 
     * // Get first 10 TenantSettings
     * const tenantSettings = await prisma.tenantSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantSettingsWithIdOnly = await prisma.tenantSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantSettingsFindManyArgs>(args?: SelectSubset<T, TenantSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantSettings.
     * @param {TenantSettingsCreateArgs} args - Arguments to create a TenantSettings.
     * @example
     * // Create one TenantSettings
     * const TenantSettings = await prisma.tenantSettings.create({
     *   data: {
     *     // ... data to create a TenantSettings
     *   }
     * })
     * 
     */
    create<T extends TenantSettingsCreateArgs>(args: SelectSubset<T, TenantSettingsCreateArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantSettings.
     * @param {TenantSettingsCreateManyArgs} args - Arguments to create many TenantSettings.
     * @example
     * // Create many TenantSettings
     * const tenantSettings = await prisma.tenantSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantSettingsCreateManyArgs>(args?: SelectSubset<T, TenantSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantSettings and returns the data saved in the database.
     * @param {TenantSettingsCreateManyAndReturnArgs} args - Arguments to create many TenantSettings.
     * @example
     * // Create many TenantSettings
     * const tenantSettings = await prisma.tenantSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantSettings and only return the `id`
     * const tenantSettingsWithIdOnly = await prisma.tenantSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantSettings.
     * @param {TenantSettingsDeleteArgs} args - Arguments to delete one TenantSettings.
     * @example
     * // Delete one TenantSettings
     * const TenantSettings = await prisma.tenantSettings.delete({
     *   where: {
     *     // ... filter to delete one TenantSettings
     *   }
     * })
     * 
     */
    delete<T extends TenantSettingsDeleteArgs>(args: SelectSubset<T, TenantSettingsDeleteArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantSettings.
     * @param {TenantSettingsUpdateArgs} args - Arguments to update one TenantSettings.
     * @example
     * // Update one TenantSettings
     * const tenantSettings = await prisma.tenantSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantSettingsUpdateArgs>(args: SelectSubset<T, TenantSettingsUpdateArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantSettings.
     * @param {TenantSettingsDeleteManyArgs} args - Arguments to filter TenantSettings to delete.
     * @example
     * // Delete a few TenantSettings
     * const { count } = await prisma.tenantSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantSettingsDeleteManyArgs>(args?: SelectSubset<T, TenantSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantSettings
     * const tenantSettings = await prisma.tenantSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantSettingsUpdateManyArgs>(args: SelectSubset<T, TenantSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantSettings and returns the data updated in the database.
     * @param {TenantSettingsUpdateManyAndReturnArgs} args - Arguments to update many TenantSettings.
     * @example
     * // Update many TenantSettings
     * const tenantSettings = await prisma.tenantSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantSettings and only return the `id`
     * const tenantSettingsWithIdOnly = await prisma.tenantSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantSettings.
     * @param {TenantSettingsUpsertArgs} args - Arguments to update or create a TenantSettings.
     * @example
     * // Update or create a TenantSettings
     * const tenantSettings = await prisma.tenantSettings.upsert({
     *   create: {
     *     // ... data to create a TenantSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantSettings we want to update
     *   }
     * })
     */
    upsert<T extends TenantSettingsUpsertArgs>(args: SelectSubset<T, TenantSettingsUpsertArgs<ExtArgs>>): Prisma__TenantSettingsClient<$Result.GetResult<Prisma.$TenantSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsCountArgs} args - Arguments to filter TenantSettings to count.
     * @example
     * // Count the number of TenantSettings
     * const count = await prisma.tenantSettings.count({
     *   where: {
     *     // ... the filter for the TenantSettings we want to count
     *   }
     * })
    **/
    count<T extends TenantSettingsCountArgs>(
      args?: Subset<T, TenantSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantSettingsAggregateArgs>(args: Subset<T, TenantSettingsAggregateArgs>): Prisma.PrismaPromise<GetTenantSettingsAggregateType<T>>

    /**
     * Group by TenantSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantSettingsGroupByArgs['orderBy'] }
        : { orderBy?: TenantSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantSettings model
   */
  readonly fields: TenantSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantSettings model
   */
  interface TenantSettingsFieldRefs {
    readonly id: FieldRef<"TenantSettings", 'String'>
    readonly watermarkingEnabled: FieldRef<"TenantSettings", 'Boolean'>
    readonly antiScreenshotBlur: FieldRef<"TenantSettings", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TenantSettings findUnique
   */
  export type TenantSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter, which TenantSettings to fetch.
     */
    where: TenantSettingsWhereUniqueInput
  }

  /**
   * TenantSettings findUniqueOrThrow
   */
  export type TenantSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter, which TenantSettings to fetch.
     */
    where: TenantSettingsWhereUniqueInput
  }

  /**
   * TenantSettings findFirst
   */
  export type TenantSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter, which TenantSettings to fetch.
     */
    where?: TenantSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSettings to fetch.
     */
    orderBy?: TenantSettingsOrderByWithRelationInput | TenantSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSettings.
     */
    cursor?: TenantSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSettings.
     */
    distinct?: TenantSettingsScalarFieldEnum | TenantSettingsScalarFieldEnum[]
  }

  /**
   * TenantSettings findFirstOrThrow
   */
  export type TenantSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter, which TenantSettings to fetch.
     */
    where?: TenantSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSettings to fetch.
     */
    orderBy?: TenantSettingsOrderByWithRelationInput | TenantSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSettings.
     */
    cursor?: TenantSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSettings.
     */
    distinct?: TenantSettingsScalarFieldEnum | TenantSettingsScalarFieldEnum[]
  }

  /**
   * TenantSettings findMany
   */
  export type TenantSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter, which TenantSettings to fetch.
     */
    where?: TenantSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSettings to fetch.
     */
    orderBy?: TenantSettingsOrderByWithRelationInput | TenantSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantSettings.
     */
    cursor?: TenantSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSettings.
     */
    distinct?: TenantSettingsScalarFieldEnum | TenantSettingsScalarFieldEnum[]
  }

  /**
   * TenantSettings create
   */
  export type TenantSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a TenantSettings.
     */
    data?: XOR<TenantSettingsCreateInput, TenantSettingsUncheckedCreateInput>
  }

  /**
   * TenantSettings createMany
   */
  export type TenantSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantSettings.
     */
    data: TenantSettingsCreateManyInput | TenantSettingsCreateManyInput[]
  }

  /**
   * TenantSettings createManyAndReturn
   */
  export type TenantSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many TenantSettings.
     */
    data: TenantSettingsCreateManyInput | TenantSettingsCreateManyInput[]
  }

  /**
   * TenantSettings update
   */
  export type TenantSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a TenantSettings.
     */
    data: XOR<TenantSettingsUpdateInput, TenantSettingsUncheckedUpdateInput>
    /**
     * Choose, which TenantSettings to update.
     */
    where: TenantSettingsWhereUniqueInput
  }

  /**
   * TenantSettings updateMany
   */
  export type TenantSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantSettings.
     */
    data: XOR<TenantSettingsUpdateManyMutationInput, TenantSettingsUncheckedUpdateManyInput>
    /**
     * Filter which TenantSettings to update
     */
    where?: TenantSettingsWhereInput
    /**
     * Limit how many TenantSettings to update.
     */
    limit?: number
  }

  /**
   * TenantSettings updateManyAndReturn
   */
  export type TenantSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * The data used to update TenantSettings.
     */
    data: XOR<TenantSettingsUpdateManyMutationInput, TenantSettingsUncheckedUpdateManyInput>
    /**
     * Filter which TenantSettings to update
     */
    where?: TenantSettingsWhereInput
    /**
     * Limit how many TenantSettings to update.
     */
    limit?: number
  }

  /**
   * TenantSettings upsert
   */
  export type TenantSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the TenantSettings to update in case it exists.
     */
    where: TenantSettingsWhereUniqueInput
    /**
     * In case the TenantSettings found by the `where` argument doesn't exist, create a new TenantSettings with this data.
     */
    create: XOR<TenantSettingsCreateInput, TenantSettingsUncheckedCreateInput>
    /**
     * In case the TenantSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantSettingsUpdateInput, TenantSettingsUncheckedUpdateInput>
  }

  /**
   * TenantSettings delete
   */
  export type TenantSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
    /**
     * Filter which TenantSettings to delete.
     */
    where: TenantSettingsWhereUniqueInput
  }

  /**
   * TenantSettings deleteMany
   */
  export type TenantSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSettings to delete
     */
    where?: TenantSettingsWhereInput
    /**
     * Limit how many TenantSettings to delete.
     */
    limit?: number
  }

  /**
   * TenantSettings without action
   */
  export type TenantSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSettings
     */
    select?: TenantSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSettings
     */
    omit?: TenantSettingsOmit<ExtArgs> | null
  }


  /**
   * Model DocumentPermission
   */

  export type AggregateDocumentPermission = {
    _count: DocumentPermissionCountAggregateOutputType | null
    _min: DocumentPermissionMinAggregateOutputType | null
    _max: DocumentPermissionMaxAggregateOutputType | null
  }

  export type DocumentPermissionMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    sharedWithUserId: string | null
    permissionLevel: string | null
    sharedAt: Date | null
    expiresAt: Date | null
  }

  export type DocumentPermissionMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    sharedWithUserId: string | null
    permissionLevel: string | null
    sharedAt: Date | null
    expiresAt: Date | null
  }

  export type DocumentPermissionCountAggregateOutputType = {
    id: number
    documentId: number
    sharedWithUserId: number
    permissionLevel: number
    sharedAt: number
    expiresAt: number
    _all: number
  }


  export type DocumentPermissionMinAggregateInputType = {
    id?: true
    documentId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
  }

  export type DocumentPermissionMaxAggregateInputType = {
    id?: true
    documentId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
  }

  export type DocumentPermissionCountAggregateInputType = {
    id?: true
    documentId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type DocumentPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPermission to aggregate.
     */
    where?: DocumentPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPermissions to fetch.
     */
    orderBy?: DocumentPermissionOrderByWithRelationInput | DocumentPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentPermissions
    **/
    _count?: true | DocumentPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentPermissionMaxAggregateInputType
  }

  export type GetDocumentPermissionAggregateType<T extends DocumentPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentPermission[P]>
      : GetScalarType<T[P], AggregateDocumentPermission[P]>
  }




  export type DocumentPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentPermissionWhereInput
    orderBy?: DocumentPermissionOrderByWithAggregationInput | DocumentPermissionOrderByWithAggregationInput[]
    by: DocumentPermissionScalarFieldEnum[] | DocumentPermissionScalarFieldEnum
    having?: DocumentPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentPermissionCountAggregateInputType | true
    _min?: DocumentPermissionMinAggregateInputType
    _max?: DocumentPermissionMaxAggregateInputType
  }

  export type DocumentPermissionGroupByOutputType = {
    id: string
    documentId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt: Date
    expiresAt: Date | null
    _count: DocumentPermissionCountAggregateOutputType | null
    _min: DocumentPermissionMinAggregateOutputType | null
    _max: DocumentPermissionMaxAggregateOutputType | null
  }

  type GetDocumentPermissionGroupByPayload<T extends DocumentPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentPermissionGroupByOutputType[P]>
        }
      >
    >


  export type DocumentPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPermission"]>

  export type DocumentPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPermission"]>

  export type DocumentPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentPermission"]>

  export type DocumentPermissionSelectScalar = {
    id?: boolean
    documentId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
  }

  export type DocumentPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "sharedWithUserId" | "permissionLevel" | "sharedAt" | "expiresAt", ExtArgs["result"]["documentPermission"]>
  export type DocumentPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentPermission"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      sharedWithUserId: string
      permissionLevel: string
      sharedAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["documentPermission"]>
    composites: {}
  }

  type DocumentPermissionGetPayload<S extends boolean | null | undefined | DocumentPermissionDefaultArgs> = $Result.GetResult<Prisma.$DocumentPermissionPayload, S>

  type DocumentPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentPermissionCountAggregateInputType | true
    }

  export interface DocumentPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentPermission'], meta: { name: 'DocumentPermission' } }
    /**
     * Find zero or one DocumentPermission that matches the filter.
     * @param {DocumentPermissionFindUniqueArgs} args - Arguments to find a DocumentPermission
     * @example
     * // Get one DocumentPermission
     * const documentPermission = await prisma.documentPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentPermissionFindUniqueArgs>(args: SelectSubset<T, DocumentPermissionFindUniqueArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentPermissionFindUniqueOrThrowArgs} args - Arguments to find a DocumentPermission
     * @example
     * // Get one DocumentPermission
     * const documentPermission = await prisma.documentPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionFindFirstArgs} args - Arguments to find a DocumentPermission
     * @example
     * // Get one DocumentPermission
     * const documentPermission = await prisma.documentPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentPermissionFindFirstArgs>(args?: SelectSubset<T, DocumentPermissionFindFirstArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionFindFirstOrThrowArgs} args - Arguments to find a DocumentPermission
     * @example
     * // Get one DocumentPermission
     * const documentPermission = await prisma.documentPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentPermissions
     * const documentPermissions = await prisma.documentPermission.findMany()
     * 
     * // Get first 10 DocumentPermissions
     * const documentPermissions = await prisma.documentPermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentPermissionWithIdOnly = await prisma.documentPermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentPermissionFindManyArgs>(args?: SelectSubset<T, DocumentPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentPermission.
     * @param {DocumentPermissionCreateArgs} args - Arguments to create a DocumentPermission.
     * @example
     * // Create one DocumentPermission
     * const DocumentPermission = await prisma.documentPermission.create({
     *   data: {
     *     // ... data to create a DocumentPermission
     *   }
     * })
     * 
     */
    create<T extends DocumentPermissionCreateArgs>(args: SelectSubset<T, DocumentPermissionCreateArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentPermissions.
     * @param {DocumentPermissionCreateManyArgs} args - Arguments to create many DocumentPermissions.
     * @example
     * // Create many DocumentPermissions
     * const documentPermission = await prisma.documentPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentPermissionCreateManyArgs>(args?: SelectSubset<T, DocumentPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentPermissions and returns the data saved in the database.
     * @param {DocumentPermissionCreateManyAndReturnArgs} args - Arguments to create many DocumentPermissions.
     * @example
     * // Create many DocumentPermissions
     * const documentPermission = await prisma.documentPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentPermissions and only return the `id`
     * const documentPermissionWithIdOnly = await prisma.documentPermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentPermission.
     * @param {DocumentPermissionDeleteArgs} args - Arguments to delete one DocumentPermission.
     * @example
     * // Delete one DocumentPermission
     * const DocumentPermission = await prisma.documentPermission.delete({
     *   where: {
     *     // ... filter to delete one DocumentPermission
     *   }
     * })
     * 
     */
    delete<T extends DocumentPermissionDeleteArgs>(args: SelectSubset<T, DocumentPermissionDeleteArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentPermission.
     * @param {DocumentPermissionUpdateArgs} args - Arguments to update one DocumentPermission.
     * @example
     * // Update one DocumentPermission
     * const documentPermission = await prisma.documentPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentPermissionUpdateArgs>(args: SelectSubset<T, DocumentPermissionUpdateArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentPermissions.
     * @param {DocumentPermissionDeleteManyArgs} args - Arguments to filter DocumentPermissions to delete.
     * @example
     * // Delete a few DocumentPermissions
     * const { count } = await prisma.documentPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentPermissionDeleteManyArgs>(args?: SelectSubset<T, DocumentPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentPermissions
     * const documentPermission = await prisma.documentPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentPermissionUpdateManyArgs>(args: SelectSubset<T, DocumentPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentPermissions and returns the data updated in the database.
     * @param {DocumentPermissionUpdateManyAndReturnArgs} args - Arguments to update many DocumentPermissions.
     * @example
     * // Update many DocumentPermissions
     * const documentPermission = await prisma.documentPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentPermissions and only return the `id`
     * const documentPermissionWithIdOnly = await prisma.documentPermission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentPermission.
     * @param {DocumentPermissionUpsertArgs} args - Arguments to update or create a DocumentPermission.
     * @example
     * // Update or create a DocumentPermission
     * const documentPermission = await prisma.documentPermission.upsert({
     *   create: {
     *     // ... data to create a DocumentPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentPermission we want to update
     *   }
     * })
     */
    upsert<T extends DocumentPermissionUpsertArgs>(args: SelectSubset<T, DocumentPermissionUpsertArgs<ExtArgs>>): Prisma__DocumentPermissionClient<$Result.GetResult<Prisma.$DocumentPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionCountArgs} args - Arguments to filter DocumentPermissions to count.
     * @example
     * // Count the number of DocumentPermissions
     * const count = await prisma.documentPermission.count({
     *   where: {
     *     // ... the filter for the DocumentPermissions we want to count
     *   }
     * })
    **/
    count<T extends DocumentPermissionCountArgs>(
      args?: Subset<T, DocumentPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentPermissionAggregateArgs>(args: Subset<T, DocumentPermissionAggregateArgs>): Prisma.PrismaPromise<GetDocumentPermissionAggregateType<T>>

    /**
     * Group by DocumentPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentPermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentPermissionGroupByArgs['orderBy'] }
        : { orderBy?: DocumentPermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentPermission model
   */
  readonly fields: DocumentPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentPermission model
   */
  interface DocumentPermissionFieldRefs {
    readonly id: FieldRef<"DocumentPermission", 'String'>
    readonly documentId: FieldRef<"DocumentPermission", 'String'>
    readonly sharedWithUserId: FieldRef<"DocumentPermission", 'String'>
    readonly permissionLevel: FieldRef<"DocumentPermission", 'String'>
    readonly sharedAt: FieldRef<"DocumentPermission", 'DateTime'>
    readonly expiresAt: FieldRef<"DocumentPermission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentPermission findUnique
   */
  export type DocumentPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPermission to fetch.
     */
    where: DocumentPermissionWhereUniqueInput
  }

  /**
   * DocumentPermission findUniqueOrThrow
   */
  export type DocumentPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPermission to fetch.
     */
    where: DocumentPermissionWhereUniqueInput
  }

  /**
   * DocumentPermission findFirst
   */
  export type DocumentPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPermission to fetch.
     */
    where?: DocumentPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPermissions to fetch.
     */
    orderBy?: DocumentPermissionOrderByWithRelationInput | DocumentPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPermissions.
     */
    cursor?: DocumentPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPermissions.
     */
    distinct?: DocumentPermissionScalarFieldEnum | DocumentPermissionScalarFieldEnum[]
  }

  /**
   * DocumentPermission findFirstOrThrow
   */
  export type DocumentPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPermission to fetch.
     */
    where?: DocumentPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPermissions to fetch.
     */
    orderBy?: DocumentPermissionOrderByWithRelationInput | DocumentPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentPermissions.
     */
    cursor?: DocumentPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPermissions.
     */
    distinct?: DocumentPermissionScalarFieldEnum | DocumentPermissionScalarFieldEnum[]
  }

  /**
   * DocumentPermission findMany
   */
  export type DocumentPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentPermissions to fetch.
     */
    where?: DocumentPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentPermissions to fetch.
     */
    orderBy?: DocumentPermissionOrderByWithRelationInput | DocumentPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentPermissions.
     */
    cursor?: DocumentPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentPermissions.
     */
    distinct?: DocumentPermissionScalarFieldEnum | DocumentPermissionScalarFieldEnum[]
  }

  /**
   * DocumentPermission create
   */
  export type DocumentPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentPermission.
     */
    data: XOR<DocumentPermissionCreateInput, DocumentPermissionUncheckedCreateInput>
  }

  /**
   * DocumentPermission createMany
   */
  export type DocumentPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentPermissions.
     */
    data: DocumentPermissionCreateManyInput | DocumentPermissionCreateManyInput[]
  }

  /**
   * DocumentPermission createManyAndReturn
   */
  export type DocumentPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentPermissions.
     */
    data: DocumentPermissionCreateManyInput | DocumentPermissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPermission update
   */
  export type DocumentPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentPermission.
     */
    data: XOR<DocumentPermissionUpdateInput, DocumentPermissionUncheckedUpdateInput>
    /**
     * Choose, which DocumentPermission to update.
     */
    where: DocumentPermissionWhereUniqueInput
  }

  /**
   * DocumentPermission updateMany
   */
  export type DocumentPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentPermissions.
     */
    data: XOR<DocumentPermissionUpdateManyMutationInput, DocumentPermissionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPermissions to update
     */
    where?: DocumentPermissionWhereInput
    /**
     * Limit how many DocumentPermissions to update.
     */
    limit?: number
  }

  /**
   * DocumentPermission updateManyAndReturn
   */
  export type DocumentPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * The data used to update DocumentPermissions.
     */
    data: XOR<DocumentPermissionUpdateManyMutationInput, DocumentPermissionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentPermissions to update
     */
    where?: DocumentPermissionWhereInput
    /**
     * Limit how many DocumentPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentPermission upsert
   */
  export type DocumentPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentPermission to update in case it exists.
     */
    where: DocumentPermissionWhereUniqueInput
    /**
     * In case the DocumentPermission found by the `where` argument doesn't exist, create a new DocumentPermission with this data.
     */
    create: XOR<DocumentPermissionCreateInput, DocumentPermissionUncheckedCreateInput>
    /**
     * In case the DocumentPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentPermissionUpdateInput, DocumentPermissionUncheckedUpdateInput>
  }

  /**
   * DocumentPermission delete
   */
  export type DocumentPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
    /**
     * Filter which DocumentPermission to delete.
     */
    where: DocumentPermissionWhereUniqueInput
  }

  /**
   * DocumentPermission deleteMany
   */
  export type DocumentPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentPermissions to delete
     */
    where?: DocumentPermissionWhereInput
    /**
     * Limit how many DocumentPermissions to delete.
     */
    limit?: number
  }

  /**
   * DocumentPermission without action
   */
  export type DocumentPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentPermission
     */
    select?: DocumentPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentPermission
     */
    omit?: DocumentPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentPermissionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: string | null
    password_hash: string | null
    last_login_at: Date | null
    last_login_ip: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: string | null
    password_hash: string | null
    last_login_at: Date | null
    last_login_ip: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    password_hash: number
    last_login_at: number
    last_login_ip: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    password_hash?: true
    last_login_at?: true
    last_login_ip?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    password_hash?: true
    last_login_at?: true
    last_login_ip?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    password_hash?: true
    last_login_at?: true
    last_login_ip?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    role: string
    password_hash: string
    last_login_at: Date | null
    last_login_ip: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    password_hash?: boolean
    last_login_at?: boolean
    last_login_ip?: boolean
    departments?: boolean | User$departmentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    password_hash?: boolean
    last_login_at?: boolean
    last_login_ip?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    password_hash?: boolean
    last_login_at?: boolean
    last_login_ip?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    password_hash?: boolean
    last_login_at?: boolean
    last_login_ip?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "role" | "password_hash" | "last_login_at" | "last_login_ip", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | User$departmentsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      departments: Prisma.$UserDepartmentPayload<ExtArgs>[]
      sessions: Prisma.$ActiveSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      role: string
      password_hash: string
      last_login_at: Date | null
      last_login_ip: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departments<T extends User$departmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$departmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly last_login_at: FieldRef<"User", 'DateTime'>
    readonly last_login_ip: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.departments
   */
  export type User$departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    where?: UserDepartmentWhereInput
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    cursor?: UserDepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDepartmentScalarFieldEnum | UserDepartmentScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    where?: ActiveSessionWhereInput
    orderBy?: ActiveSessionOrderByWithRelationInput | ActiveSessionOrderByWithRelationInput[]
    cursor?: ActiveSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveSessionScalarFieldEnum | ActiveSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ActiveSession
   */

  export type AggregateActiveSession = {
    _count: ActiveSessionCountAggregateOutputType | null
    _min: ActiveSessionMinAggregateOutputType | null
    _max: ActiveSessionMaxAggregateOutputType | null
  }

  export type ActiveSessionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
    expires_at: Date | null
  }

  export type ActiveSessionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token_hash: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
    expires_at: Date | null
  }

  export type ActiveSessionCountAggregateOutputType = {
    id: number
    user_id: number
    token_hash: number
    ip_address: number
    user_agent: number
    created_at: number
    expires_at: number
    _all: number
  }


  export type ActiveSessionMinAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
    expires_at?: true
  }

  export type ActiveSessionMaxAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
    expires_at?: true
  }

  export type ActiveSessionCountAggregateInputType = {
    id?: true
    user_id?: true
    token_hash?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
    expires_at?: true
    _all?: true
  }

  export type ActiveSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveSession to aggregate.
     */
    where?: ActiveSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveSessions to fetch.
     */
    orderBy?: ActiveSessionOrderByWithRelationInput | ActiveSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveSessions
    **/
    _count?: true | ActiveSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveSessionMaxAggregateInputType
  }

  export type GetActiveSessionAggregateType<T extends ActiveSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveSession[P]>
      : GetScalarType<T[P], AggregateActiveSession[P]>
  }




  export type ActiveSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveSessionWhereInput
    orderBy?: ActiveSessionOrderByWithAggregationInput | ActiveSessionOrderByWithAggregationInput[]
    by: ActiveSessionScalarFieldEnum[] | ActiveSessionScalarFieldEnum
    having?: ActiveSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveSessionCountAggregateInputType | true
    _min?: ActiveSessionMinAggregateInputType
    _max?: ActiveSessionMaxAggregateInputType
  }

  export type ActiveSessionGroupByOutputType = {
    id: string
    user_id: string
    token_hash: string
    ip_address: string | null
    user_agent: string | null
    created_at: Date
    expires_at: Date
    _count: ActiveSessionCountAggregateOutputType | null
    _min: ActiveSessionMinAggregateOutputType | null
    _max: ActiveSessionMaxAggregateOutputType | null
  }

  type GetActiveSessionGroupByPayload<T extends ActiveSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveSessionGroupByOutputType[P]>
        }
      >
    >


  export type ActiveSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeSession"]>

  export type ActiveSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeSession"]>

  export type ActiveSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    expires_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeSession"]>

  export type ActiveSessionSelectScalar = {
    id?: boolean
    user_id?: boolean
    token_hash?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    expires_at?: boolean
  }

  export type ActiveSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token_hash" | "ip_address" | "user_agent" | "created_at" | "expires_at", ExtArgs["result"]["activeSession"]>
  export type ActiveSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActiveSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActiveSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActiveSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token_hash: string
      ip_address: string | null
      user_agent: string | null
      created_at: Date
      expires_at: Date
    }, ExtArgs["result"]["activeSession"]>
    composites: {}
  }

  type ActiveSessionGetPayload<S extends boolean | null | undefined | ActiveSessionDefaultArgs> = $Result.GetResult<Prisma.$ActiveSessionPayload, S>

  type ActiveSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActiveSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActiveSessionCountAggregateInputType | true
    }

  export interface ActiveSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveSession'], meta: { name: 'ActiveSession' } }
    /**
     * Find zero or one ActiveSession that matches the filter.
     * @param {ActiveSessionFindUniqueArgs} args - Arguments to find a ActiveSession
     * @example
     * // Get one ActiveSession
     * const activeSession = await prisma.activeSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveSessionFindUniqueArgs>(args: SelectSubset<T, ActiveSessionFindUniqueArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActiveSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActiveSessionFindUniqueOrThrowArgs} args - Arguments to find a ActiveSession
     * @example
     * // Get one ActiveSession
     * const activeSession = await prisma.activeSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionFindFirstArgs} args - Arguments to find a ActiveSession
     * @example
     * // Get one ActiveSession
     * const activeSession = await prisma.activeSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveSessionFindFirstArgs>(args?: SelectSubset<T, ActiveSessionFindFirstArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActiveSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionFindFirstOrThrowArgs} args - Arguments to find a ActiveSession
     * @example
     * // Get one ActiveSession
     * const activeSession = await prisma.activeSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActiveSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveSessions
     * const activeSessions = await prisma.activeSession.findMany()
     * 
     * // Get first 10 ActiveSessions
     * const activeSessions = await prisma.activeSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeSessionWithIdOnly = await prisma.activeSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveSessionFindManyArgs>(args?: SelectSubset<T, ActiveSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActiveSession.
     * @param {ActiveSessionCreateArgs} args - Arguments to create a ActiveSession.
     * @example
     * // Create one ActiveSession
     * const ActiveSession = await prisma.activeSession.create({
     *   data: {
     *     // ... data to create a ActiveSession
     *   }
     * })
     * 
     */
    create<T extends ActiveSessionCreateArgs>(args: SelectSubset<T, ActiveSessionCreateArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActiveSessions.
     * @param {ActiveSessionCreateManyArgs} args - Arguments to create many ActiveSessions.
     * @example
     * // Create many ActiveSessions
     * const activeSession = await prisma.activeSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveSessionCreateManyArgs>(args?: SelectSubset<T, ActiveSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveSessions and returns the data saved in the database.
     * @param {ActiveSessionCreateManyAndReturnArgs} args - Arguments to create many ActiveSessions.
     * @example
     * // Create many ActiveSessions
     * const activeSession = await prisma.activeSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveSessions and only return the `id`
     * const activeSessionWithIdOnly = await prisma.activeSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActiveSession.
     * @param {ActiveSessionDeleteArgs} args - Arguments to delete one ActiveSession.
     * @example
     * // Delete one ActiveSession
     * const ActiveSession = await prisma.activeSession.delete({
     *   where: {
     *     // ... filter to delete one ActiveSession
     *   }
     * })
     * 
     */
    delete<T extends ActiveSessionDeleteArgs>(args: SelectSubset<T, ActiveSessionDeleteArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActiveSession.
     * @param {ActiveSessionUpdateArgs} args - Arguments to update one ActiveSession.
     * @example
     * // Update one ActiveSession
     * const activeSession = await prisma.activeSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveSessionUpdateArgs>(args: SelectSubset<T, ActiveSessionUpdateArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActiveSessions.
     * @param {ActiveSessionDeleteManyArgs} args - Arguments to filter ActiveSessions to delete.
     * @example
     * // Delete a few ActiveSessions
     * const { count } = await prisma.activeSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveSessionDeleteManyArgs>(args?: SelectSubset<T, ActiveSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveSessions
     * const activeSession = await prisma.activeSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveSessionUpdateManyArgs>(args: SelectSubset<T, ActiveSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveSessions and returns the data updated in the database.
     * @param {ActiveSessionUpdateManyAndReturnArgs} args - Arguments to update many ActiveSessions.
     * @example
     * // Update many ActiveSessions
     * const activeSession = await prisma.activeSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActiveSessions and only return the `id`
     * const activeSessionWithIdOnly = await prisma.activeSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActiveSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ActiveSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActiveSession.
     * @param {ActiveSessionUpsertArgs} args - Arguments to update or create a ActiveSession.
     * @example
     * // Update or create a ActiveSession
     * const activeSession = await prisma.activeSession.upsert({
     *   create: {
     *     // ... data to create a ActiveSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveSession we want to update
     *   }
     * })
     */
    upsert<T extends ActiveSessionUpsertArgs>(args: SelectSubset<T, ActiveSessionUpsertArgs<ExtArgs>>): Prisma__ActiveSessionClient<$Result.GetResult<Prisma.$ActiveSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActiveSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionCountArgs} args - Arguments to filter ActiveSessions to count.
     * @example
     * // Count the number of ActiveSessions
     * const count = await prisma.activeSession.count({
     *   where: {
     *     // ... the filter for the ActiveSessions we want to count
     *   }
     * })
    **/
    count<T extends ActiveSessionCountArgs>(
      args?: Subset<T, ActiveSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActiveSessionAggregateArgs>(args: Subset<T, ActiveSessionAggregateArgs>): Prisma.PrismaPromise<GetActiveSessionAggregateType<T>>

    /**
     * Group by ActiveSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActiveSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveSessionGroupByArgs['orderBy'] }
        : { orderBy?: ActiveSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActiveSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveSession model
   */
  readonly fields: ActiveSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActiveSession model
   */
  interface ActiveSessionFieldRefs {
    readonly id: FieldRef<"ActiveSession", 'String'>
    readonly user_id: FieldRef<"ActiveSession", 'String'>
    readonly token_hash: FieldRef<"ActiveSession", 'String'>
    readonly ip_address: FieldRef<"ActiveSession", 'String'>
    readonly user_agent: FieldRef<"ActiveSession", 'String'>
    readonly created_at: FieldRef<"ActiveSession", 'DateTime'>
    readonly expires_at: FieldRef<"ActiveSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActiveSession findUnique
   */
  export type ActiveSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter, which ActiveSession to fetch.
     */
    where: ActiveSessionWhereUniqueInput
  }

  /**
   * ActiveSession findUniqueOrThrow
   */
  export type ActiveSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter, which ActiveSession to fetch.
     */
    where: ActiveSessionWhereUniqueInput
  }

  /**
   * ActiveSession findFirst
   */
  export type ActiveSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter, which ActiveSession to fetch.
     */
    where?: ActiveSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveSessions to fetch.
     */
    orderBy?: ActiveSessionOrderByWithRelationInput | ActiveSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveSessions.
     */
    cursor?: ActiveSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveSessions.
     */
    distinct?: ActiveSessionScalarFieldEnum | ActiveSessionScalarFieldEnum[]
  }

  /**
   * ActiveSession findFirstOrThrow
   */
  export type ActiveSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter, which ActiveSession to fetch.
     */
    where?: ActiveSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveSessions to fetch.
     */
    orderBy?: ActiveSessionOrderByWithRelationInput | ActiveSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveSessions.
     */
    cursor?: ActiveSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveSessions.
     */
    distinct?: ActiveSessionScalarFieldEnum | ActiveSessionScalarFieldEnum[]
  }

  /**
   * ActiveSession findMany
   */
  export type ActiveSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter, which ActiveSessions to fetch.
     */
    where?: ActiveSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveSessions to fetch.
     */
    orderBy?: ActiveSessionOrderByWithRelationInput | ActiveSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveSessions.
     */
    cursor?: ActiveSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveSessions.
     */
    distinct?: ActiveSessionScalarFieldEnum | ActiveSessionScalarFieldEnum[]
  }

  /**
   * ActiveSession create
   */
  export type ActiveSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveSession.
     */
    data: XOR<ActiveSessionCreateInput, ActiveSessionUncheckedCreateInput>
  }

  /**
   * ActiveSession createMany
   */
  export type ActiveSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveSessions.
     */
    data: ActiveSessionCreateManyInput | ActiveSessionCreateManyInput[]
  }

  /**
   * ActiveSession createManyAndReturn
   */
  export type ActiveSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ActiveSessions.
     */
    data: ActiveSessionCreateManyInput | ActiveSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveSession update
   */
  export type ActiveSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveSession.
     */
    data: XOR<ActiveSessionUpdateInput, ActiveSessionUncheckedUpdateInput>
    /**
     * Choose, which ActiveSession to update.
     */
    where: ActiveSessionWhereUniqueInput
  }

  /**
   * ActiveSession updateMany
   */
  export type ActiveSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveSessions.
     */
    data: XOR<ActiveSessionUpdateManyMutationInput, ActiveSessionUncheckedUpdateManyInput>
    /**
     * Filter which ActiveSessions to update
     */
    where?: ActiveSessionWhereInput
    /**
     * Limit how many ActiveSessions to update.
     */
    limit?: number
  }

  /**
   * ActiveSession updateManyAndReturn
   */
  export type ActiveSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * The data used to update ActiveSessions.
     */
    data: XOR<ActiveSessionUpdateManyMutationInput, ActiveSessionUncheckedUpdateManyInput>
    /**
     * Filter which ActiveSessions to update
     */
    where?: ActiveSessionWhereInput
    /**
     * Limit how many ActiveSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveSession upsert
   */
  export type ActiveSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveSession to update in case it exists.
     */
    where: ActiveSessionWhereUniqueInput
    /**
     * In case the ActiveSession found by the `where` argument doesn't exist, create a new ActiveSession with this data.
     */
    create: XOR<ActiveSessionCreateInput, ActiveSessionUncheckedCreateInput>
    /**
     * In case the ActiveSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveSessionUpdateInput, ActiveSessionUncheckedUpdateInput>
  }

  /**
   * ActiveSession delete
   */
  export type ActiveSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
    /**
     * Filter which ActiveSession to delete.
     */
    where: ActiveSessionWhereUniqueInput
  }

  /**
   * ActiveSession deleteMany
   */
  export type ActiveSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveSessions to delete
     */
    where?: ActiveSessionWhereInput
    /**
     * Limit how many ActiveSessions to delete.
     */
    limit?: number
  }

  /**
   * ActiveSession without action
   */
  export type ActiveSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveSession
     */
    select?: ActiveSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActiveSession
     */
    omit?: ActiveSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveSessionInclude<ExtArgs> | null
  }


  /**
   * Model SecurityLog
   */

  export type AggregateSecurityLog = {
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  export type SecurityLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    ip_address: string | null
    user_id: string | null
    created_at: Date | null
  }

  export type SecurityLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    ip_address: string | null
    user_id: string | null
    created_at: Date | null
  }

  export type SecurityLogCountAggregateOutputType = {
    id: number
    action: number
    ip_address: number
    user_id: number
    created_at: number
    _all: number
  }


  export type SecurityLogMinAggregateInputType = {
    id?: true
    action?: true
    ip_address?: true
    user_id?: true
    created_at?: true
  }

  export type SecurityLogMaxAggregateInputType = {
    id?: true
    action?: true
    ip_address?: true
    user_id?: true
    created_at?: true
  }

  export type SecurityLogCountAggregateInputType = {
    id?: true
    action?: true
    ip_address?: true
    user_id?: true
    created_at?: true
    _all?: true
  }

  export type SecurityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLog to aggregate.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityLogs
    **/
    _count?: true | SecurityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityLogMaxAggregateInputType
  }

  export type GetSecurityLogAggregateType<T extends SecurityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityLog[P]>
      : GetScalarType<T[P], AggregateSecurityLog[P]>
  }




  export type SecurityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityLogWhereInput
    orderBy?: SecurityLogOrderByWithAggregationInput | SecurityLogOrderByWithAggregationInput[]
    by: SecurityLogScalarFieldEnum[] | SecurityLogScalarFieldEnum
    having?: SecurityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityLogCountAggregateInputType | true
    _min?: SecurityLogMinAggregateInputType
    _max?: SecurityLogMaxAggregateInputType
  }

  export type SecurityLogGroupByOutputType = {
    id: string
    action: string
    ip_address: string | null
    user_id: string | null
    created_at: Date
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  type GetSecurityLogGroupByPayload<T extends SecurityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
        }
      >
    >


  export type SecurityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    ip_address?: boolean
    user_id?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    ip_address?: boolean
    user_id?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    ip_address?: boolean
    user_id?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectScalar = {
    id?: boolean
    action?: boolean
    ip_address?: boolean
    user_id?: boolean
    created_at?: boolean
  }

  export type SecurityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "ip_address" | "user_id" | "created_at", ExtArgs["result"]["securityLog"]>

  export type $SecurityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      ip_address: string | null
      user_id: string | null
      created_at: Date
    }, ExtArgs["result"]["securityLog"]>
    composites: {}
  }

  type SecurityLogGetPayload<S extends boolean | null | undefined | SecurityLogDefaultArgs> = $Result.GetResult<Prisma.$SecurityLogPayload, S>

  type SecurityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecurityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecurityLogCountAggregateInputType | true
    }

  export interface SecurityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityLog'], meta: { name: 'SecurityLog' } }
    /**
     * Find zero or one SecurityLog that matches the filter.
     * @param {SecurityLogFindUniqueArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityLogFindUniqueArgs>(args: SelectSubset<T, SecurityLogFindUniqueArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SecurityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecurityLogFindUniqueOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityLogFindFirstArgs>(args?: SelectSubset<T, SecurityLogFindFirstArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SecurityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany()
     * 
     * // Get first 10 SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityLogFindManyArgs>(args?: SelectSubset<T, SecurityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SecurityLog.
     * @param {SecurityLogCreateArgs} args - Arguments to create a SecurityLog.
     * @example
     * // Create one SecurityLog
     * const SecurityLog = await prisma.securityLog.create({
     *   data: {
     *     // ... data to create a SecurityLog
     *   }
     * })
     * 
     */
    create<T extends SecurityLogCreateArgs>(args: SelectSubset<T, SecurityLogCreateArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SecurityLogs.
     * @param {SecurityLogCreateManyArgs} args - Arguments to create many SecurityLogs.
     * @example
     * // Create many SecurityLogs
     * const securityLog = await prisma.securityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityLogCreateManyArgs>(args?: SelectSubset<T, SecurityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityLogs and returns the data saved in the database.
     * @param {SecurityLogCreateManyAndReturnArgs} args - Arguments to create many SecurityLogs.
     * @example
     * // Create many SecurityLogs
     * const securityLog = await prisma.securityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityLogs and only return the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SecurityLog.
     * @param {SecurityLogDeleteArgs} args - Arguments to delete one SecurityLog.
     * @example
     * // Delete one SecurityLog
     * const SecurityLog = await prisma.securityLog.delete({
     *   where: {
     *     // ... filter to delete one SecurityLog
     *   }
     * })
     * 
     */
    delete<T extends SecurityLogDeleteArgs>(args: SelectSubset<T, SecurityLogDeleteArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SecurityLog.
     * @param {SecurityLogUpdateArgs} args - Arguments to update one SecurityLog.
     * @example
     * // Update one SecurityLog
     * const securityLog = await prisma.securityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityLogUpdateArgs>(args: SelectSubset<T, SecurityLogUpdateArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SecurityLogs.
     * @param {SecurityLogDeleteManyArgs} args - Arguments to filter SecurityLogs to delete.
     * @example
     * // Delete a few SecurityLogs
     * const { count } = await prisma.securityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityLogDeleteManyArgs>(args?: SelectSubset<T, SecurityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityLogs
     * const securityLog = await prisma.securityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityLogUpdateManyArgs>(args: SelectSubset<T, SecurityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityLogs and returns the data updated in the database.
     * @param {SecurityLogUpdateManyAndReturnArgs} args - Arguments to update many SecurityLogs.
     * @example
     * // Update many SecurityLogs
     * const securityLog = await prisma.securityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SecurityLogs and only return the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SecurityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SecurityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SecurityLog.
     * @param {SecurityLogUpsertArgs} args - Arguments to update or create a SecurityLog.
     * @example
     * // Update or create a SecurityLog
     * const securityLog = await prisma.securityLog.upsert({
     *   create: {
     *     // ... data to create a SecurityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityLog we want to update
     *   }
     * })
     */
    upsert<T extends SecurityLogUpsertArgs>(args: SelectSubset<T, SecurityLogUpsertArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogCountArgs} args - Arguments to filter SecurityLogs to count.
     * @example
     * // Count the number of SecurityLogs
     * const count = await prisma.securityLog.count({
     *   where: {
     *     // ... the filter for the SecurityLogs we want to count
     *   }
     * })
    **/
    count<T extends SecurityLogCountArgs>(
      args?: Subset<T, SecurityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityLogAggregateArgs>(args: Subset<T, SecurityLogAggregateArgs>): Prisma.PrismaPromise<GetSecurityLogAggregateType<T>>

    /**
     * Group by SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityLogGroupByArgs['orderBy'] }
        : { orderBy?: SecurityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityLog model
   */
  readonly fields: SecurityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SecurityLog model
   */
  interface SecurityLogFieldRefs {
    readonly id: FieldRef<"SecurityLog", 'String'>
    readonly action: FieldRef<"SecurityLog", 'String'>
    readonly ip_address: FieldRef<"SecurityLog", 'String'>
    readonly user_id: FieldRef<"SecurityLog", 'String'>
    readonly created_at: FieldRef<"SecurityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityLog findUnique
   */
  export type SecurityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog findUniqueOrThrow
   */
  export type SecurityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog findFirst
   */
  export type SecurityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog findFirstOrThrow
   */
  export type SecurityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog findMany
   */
  export type SecurityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLogs to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog create
   */
  export type SecurityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SecurityLog.
     */
    data: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
  }

  /**
   * SecurityLog createMany
   */
  export type SecurityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityLogs.
     */
    data: SecurityLogCreateManyInput | SecurityLogCreateManyInput[]
  }

  /**
   * SecurityLog createManyAndReturn
   */
  export type SecurityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data used to create many SecurityLogs.
     */
    data: SecurityLogCreateManyInput | SecurityLogCreateManyInput[]
  }

  /**
   * SecurityLog update
   */
  export type SecurityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SecurityLog.
     */
    data: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
    /**
     * Choose, which SecurityLog to update.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog updateMany
   */
  export type SecurityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityLogs.
     */
    data: XOR<SecurityLogUpdateManyMutationInput, SecurityLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityLogs to update
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to update.
     */
    limit?: number
  }

  /**
   * SecurityLog updateManyAndReturn
   */
  export type SecurityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data used to update SecurityLogs.
     */
    data: XOR<SecurityLogUpdateManyMutationInput, SecurityLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityLogs to update
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to update.
     */
    limit?: number
  }

  /**
   * SecurityLog upsert
   */
  export type SecurityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SecurityLog to update in case it exists.
     */
    where: SecurityLogWhereUniqueInput
    /**
     * In case the SecurityLog found by the `where` argument doesn't exist, create a new SecurityLog with this data.
     */
    create: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
    /**
     * In case the SecurityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
  }

  /**
   * SecurityLog delete
   */
  export type SecurityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter which SecurityLog to delete.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog deleteMany
   */
  export type SecurityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLogs to delete
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to delete.
     */
    limit?: number
  }

  /**
   * SecurityLog without action
   */
  export type SecurityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    tenantId: string | null
    defaultPermissionPreset: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tenantId: string | null
    defaultPermissionPreset: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    tenantId: number
    defaultPermissionPreset: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    defaultPermissionPreset?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    defaultPermissionPreset?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    tenantId?: true
    defaultPermissionPreset?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    name: string
    tenantId: string
    defaultPermissionPreset: string | null
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tenantId?: boolean
    defaultPermissionPreset?: boolean
    users?: boolean | Department$usersArgs<ExtArgs>
    documents?: boolean | Department$documentsArgs<ExtArgs>
    folders?: boolean | Department$foldersArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tenantId?: boolean
    defaultPermissionPreset?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tenantId?: boolean
    defaultPermissionPreset?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    tenantId?: boolean
    defaultPermissionPreset?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tenantId" | "defaultPermissionPreset", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Department$usersArgs<ExtArgs>
    documents?: boolean | Department$documentsArgs<ExtArgs>
    folders?: boolean | Department$foldersArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      users: Prisma.$UserDepartmentPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      folders: Prisma.$FolderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tenantId: string
      defaultPermissionPreset: string | null
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Department$usersArgs<ExtArgs> = {}>(args?: Subset<T, Department$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Department$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Department$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    folders<T extends Department$foldersArgs<ExtArgs> = {}>(args?: Subset<T, Department$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly tenantId: FieldRef<"Department", 'String'>
    readonly defaultPermissionPreset: FieldRef<"Department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.users
   */
  export type Department$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    where?: UserDepartmentWhereInput
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    cursor?: UserDepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDepartmentScalarFieldEnum | UserDepartmentScalarFieldEnum[]
  }

  /**
   * Department.documents
   */
  export type Department$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Department.folders
   */
  export type Department$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    cursor?: FolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model UserDepartment
   */

  export type AggregateUserDepartment = {
    _count: UserDepartmentCountAggregateOutputType | null
    _min: UserDepartmentMinAggregateOutputType | null
    _max: UserDepartmentMaxAggregateOutputType | null
  }

  export type UserDepartmentMinAggregateOutputType = {
    userId: string | null
    departmentId: string | null
    role: string | null
    isPrimary: boolean | null
    permissions: string | null
  }

  export type UserDepartmentMaxAggregateOutputType = {
    userId: string | null
    departmentId: string | null
    role: string | null
    isPrimary: boolean | null
    permissions: string | null
  }

  export type UserDepartmentCountAggregateOutputType = {
    userId: number
    departmentId: number
    role: number
    isPrimary: number
    permissions: number
    _all: number
  }


  export type UserDepartmentMinAggregateInputType = {
    userId?: true
    departmentId?: true
    role?: true
    isPrimary?: true
    permissions?: true
  }

  export type UserDepartmentMaxAggregateInputType = {
    userId?: true
    departmentId?: true
    role?: true
    isPrimary?: true
    permissions?: true
  }

  export type UserDepartmentCountAggregateInputType = {
    userId?: true
    departmentId?: true
    role?: true
    isPrimary?: true
    permissions?: true
    _all?: true
  }

  export type UserDepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDepartment to aggregate.
     */
    where?: UserDepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDepartments to fetch.
     */
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDepartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDepartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDepartments
    **/
    _count?: true | UserDepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDepartmentMaxAggregateInputType
  }

  export type GetUserDepartmentAggregateType<T extends UserDepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDepartment[P]>
      : GetScalarType<T[P], AggregateUserDepartment[P]>
  }




  export type UserDepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDepartmentWhereInput
    orderBy?: UserDepartmentOrderByWithAggregationInput | UserDepartmentOrderByWithAggregationInput[]
    by: UserDepartmentScalarFieldEnum[] | UserDepartmentScalarFieldEnum
    having?: UserDepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDepartmentCountAggregateInputType | true
    _min?: UserDepartmentMinAggregateInputType
    _max?: UserDepartmentMaxAggregateInputType
  }

  export type UserDepartmentGroupByOutputType = {
    userId: string
    departmentId: string
    role: string
    isPrimary: boolean
    permissions: string
    _count: UserDepartmentCountAggregateOutputType | null
    _min: UserDepartmentMinAggregateOutputType | null
    _max: UserDepartmentMaxAggregateOutputType | null
  }

  type GetUserDepartmentGroupByPayload<T extends UserDepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], UserDepartmentGroupByOutputType[P]>
        }
      >
    >


  export type UserDepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    departmentId?: boolean
    role?: boolean
    isPrimary?: boolean
    permissions?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDepartment"]>

  export type UserDepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    departmentId?: boolean
    role?: boolean
    isPrimary?: boolean
    permissions?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDepartment"]>

  export type UserDepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    departmentId?: boolean
    role?: boolean
    isPrimary?: boolean
    permissions?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDepartment"]>

  export type UserDepartmentSelectScalar = {
    userId?: boolean
    departmentId?: boolean
    role?: boolean
    isPrimary?: boolean
    permissions?: boolean
  }

  export type UserDepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "departmentId" | "role" | "isPrimary" | "permissions", ExtArgs["result"]["userDepartment"]>
  export type UserDepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type UserDepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }
  export type UserDepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }

  export type $UserDepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDepartment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      department: Prisma.$DepartmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      departmentId: string
      role: string
      isPrimary: boolean
      permissions: string
    }, ExtArgs["result"]["userDepartment"]>
    composites: {}
  }

  type UserDepartmentGetPayload<S extends boolean | null | undefined | UserDepartmentDefaultArgs> = $Result.GetResult<Prisma.$UserDepartmentPayload, S>

  type UserDepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDepartmentCountAggregateInputType | true
    }

  export interface UserDepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDepartment'], meta: { name: 'UserDepartment' } }
    /**
     * Find zero or one UserDepartment that matches the filter.
     * @param {UserDepartmentFindUniqueArgs} args - Arguments to find a UserDepartment
     * @example
     * // Get one UserDepartment
     * const userDepartment = await prisma.userDepartment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDepartmentFindUniqueArgs>(args: SelectSubset<T, UserDepartmentFindUniqueArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDepartment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDepartmentFindUniqueOrThrowArgs} args - Arguments to find a UserDepartment
     * @example
     * // Get one UserDepartment
     * const userDepartment = await prisma.userDepartment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDepartment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentFindFirstArgs} args - Arguments to find a UserDepartment
     * @example
     * // Get one UserDepartment
     * const userDepartment = await prisma.userDepartment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDepartmentFindFirstArgs>(args?: SelectSubset<T, UserDepartmentFindFirstArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDepartment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentFindFirstOrThrowArgs} args - Arguments to find a UserDepartment
     * @example
     * // Get one UserDepartment
     * const userDepartment = await prisma.userDepartment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDepartments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDepartments
     * const userDepartments = await prisma.userDepartment.findMany()
     * 
     * // Get first 10 UserDepartments
     * const userDepartments = await prisma.userDepartment.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userDepartmentWithUserIdOnly = await prisma.userDepartment.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserDepartmentFindManyArgs>(args?: SelectSubset<T, UserDepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDepartment.
     * @param {UserDepartmentCreateArgs} args - Arguments to create a UserDepartment.
     * @example
     * // Create one UserDepartment
     * const UserDepartment = await prisma.userDepartment.create({
     *   data: {
     *     // ... data to create a UserDepartment
     *   }
     * })
     * 
     */
    create<T extends UserDepartmentCreateArgs>(args: SelectSubset<T, UserDepartmentCreateArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDepartments.
     * @param {UserDepartmentCreateManyArgs} args - Arguments to create many UserDepartments.
     * @example
     * // Create many UserDepartments
     * const userDepartment = await prisma.userDepartment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDepartmentCreateManyArgs>(args?: SelectSubset<T, UserDepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDepartments and returns the data saved in the database.
     * @param {UserDepartmentCreateManyAndReturnArgs} args - Arguments to create many UserDepartments.
     * @example
     * // Create many UserDepartments
     * const userDepartment = await prisma.userDepartment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDepartments and only return the `userId`
     * const userDepartmentWithUserIdOnly = await prisma.userDepartment.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDepartment.
     * @param {UserDepartmentDeleteArgs} args - Arguments to delete one UserDepartment.
     * @example
     * // Delete one UserDepartment
     * const UserDepartment = await prisma.userDepartment.delete({
     *   where: {
     *     // ... filter to delete one UserDepartment
     *   }
     * })
     * 
     */
    delete<T extends UserDepartmentDeleteArgs>(args: SelectSubset<T, UserDepartmentDeleteArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDepartment.
     * @param {UserDepartmentUpdateArgs} args - Arguments to update one UserDepartment.
     * @example
     * // Update one UserDepartment
     * const userDepartment = await prisma.userDepartment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDepartmentUpdateArgs>(args: SelectSubset<T, UserDepartmentUpdateArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDepartments.
     * @param {UserDepartmentDeleteManyArgs} args - Arguments to filter UserDepartments to delete.
     * @example
     * // Delete a few UserDepartments
     * const { count } = await prisma.userDepartment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDepartmentDeleteManyArgs>(args?: SelectSubset<T, UserDepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDepartments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDepartments
     * const userDepartment = await prisma.userDepartment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDepartmentUpdateManyArgs>(args: SelectSubset<T, UserDepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDepartments and returns the data updated in the database.
     * @param {UserDepartmentUpdateManyAndReturnArgs} args - Arguments to update many UserDepartments.
     * @example
     * // Update many UserDepartments
     * const userDepartment = await prisma.userDepartment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDepartments and only return the `userId`
     * const userDepartmentWithUserIdOnly = await prisma.userDepartment.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDepartment.
     * @param {UserDepartmentUpsertArgs} args - Arguments to update or create a UserDepartment.
     * @example
     * // Update or create a UserDepartment
     * const userDepartment = await prisma.userDepartment.upsert({
     *   create: {
     *     // ... data to create a UserDepartment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDepartment we want to update
     *   }
     * })
     */
    upsert<T extends UserDepartmentUpsertArgs>(args: SelectSubset<T, UserDepartmentUpsertArgs<ExtArgs>>): Prisma__UserDepartmentClient<$Result.GetResult<Prisma.$UserDepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDepartments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentCountArgs} args - Arguments to filter UserDepartments to count.
     * @example
     * // Count the number of UserDepartments
     * const count = await prisma.userDepartment.count({
     *   where: {
     *     // ... the filter for the UserDepartments we want to count
     *   }
     * })
    **/
    count<T extends UserDepartmentCountArgs>(
      args?: Subset<T, UserDepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDepartment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDepartmentAggregateArgs>(args: Subset<T, UserDepartmentAggregateArgs>): Prisma.PrismaPromise<GetUserDepartmentAggregateType<T>>

    /**
     * Group by UserDepartment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDepartmentGroupByArgs['orderBy'] }
        : { orderBy?: UserDepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDepartment model
   */
  readonly fields: UserDepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDepartment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDepartment model
   */
  interface UserDepartmentFieldRefs {
    readonly userId: FieldRef<"UserDepartment", 'String'>
    readonly departmentId: FieldRef<"UserDepartment", 'String'>
    readonly role: FieldRef<"UserDepartment", 'String'>
    readonly isPrimary: FieldRef<"UserDepartment", 'Boolean'>
    readonly permissions: FieldRef<"UserDepartment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserDepartment findUnique
   */
  export type UserDepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter, which UserDepartment to fetch.
     */
    where: UserDepartmentWhereUniqueInput
  }

  /**
   * UserDepartment findUniqueOrThrow
   */
  export type UserDepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter, which UserDepartment to fetch.
     */
    where: UserDepartmentWhereUniqueInput
  }

  /**
   * UserDepartment findFirst
   */
  export type UserDepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter, which UserDepartment to fetch.
     */
    where?: UserDepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDepartments to fetch.
     */
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDepartments.
     */
    cursor?: UserDepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDepartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDepartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDepartments.
     */
    distinct?: UserDepartmentScalarFieldEnum | UserDepartmentScalarFieldEnum[]
  }

  /**
   * UserDepartment findFirstOrThrow
   */
  export type UserDepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter, which UserDepartment to fetch.
     */
    where?: UserDepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDepartments to fetch.
     */
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDepartments.
     */
    cursor?: UserDepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDepartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDepartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDepartments.
     */
    distinct?: UserDepartmentScalarFieldEnum | UserDepartmentScalarFieldEnum[]
  }

  /**
   * UserDepartment findMany
   */
  export type UserDepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter, which UserDepartments to fetch.
     */
    where?: UserDepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDepartments to fetch.
     */
    orderBy?: UserDepartmentOrderByWithRelationInput | UserDepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDepartments.
     */
    cursor?: UserDepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDepartments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDepartments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDepartments.
     */
    distinct?: UserDepartmentScalarFieldEnum | UserDepartmentScalarFieldEnum[]
  }

  /**
   * UserDepartment create
   */
  export type UserDepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDepartment.
     */
    data: XOR<UserDepartmentCreateInput, UserDepartmentUncheckedCreateInput>
  }

  /**
   * UserDepartment createMany
   */
  export type UserDepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDepartments.
     */
    data: UserDepartmentCreateManyInput | UserDepartmentCreateManyInput[]
  }

  /**
   * UserDepartment createManyAndReturn
   */
  export type UserDepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many UserDepartments.
     */
    data: UserDepartmentCreateManyInput | UserDepartmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDepartment update
   */
  export type UserDepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDepartment.
     */
    data: XOR<UserDepartmentUpdateInput, UserDepartmentUncheckedUpdateInput>
    /**
     * Choose, which UserDepartment to update.
     */
    where: UserDepartmentWhereUniqueInput
  }

  /**
   * UserDepartment updateMany
   */
  export type UserDepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDepartments.
     */
    data: XOR<UserDepartmentUpdateManyMutationInput, UserDepartmentUncheckedUpdateManyInput>
    /**
     * Filter which UserDepartments to update
     */
    where?: UserDepartmentWhereInput
    /**
     * Limit how many UserDepartments to update.
     */
    limit?: number
  }

  /**
   * UserDepartment updateManyAndReturn
   */
  export type UserDepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * The data used to update UserDepartments.
     */
    data: XOR<UserDepartmentUpdateManyMutationInput, UserDepartmentUncheckedUpdateManyInput>
    /**
     * Filter which UserDepartments to update
     */
    where?: UserDepartmentWhereInput
    /**
     * Limit how many UserDepartments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDepartment upsert
   */
  export type UserDepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDepartment to update in case it exists.
     */
    where: UserDepartmentWhereUniqueInput
    /**
     * In case the UserDepartment found by the `where` argument doesn't exist, create a new UserDepartment with this data.
     */
    create: XOR<UserDepartmentCreateInput, UserDepartmentUncheckedCreateInput>
    /**
     * In case the UserDepartment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDepartmentUpdateInput, UserDepartmentUncheckedUpdateInput>
  }

  /**
   * UserDepartment delete
   */
  export type UserDepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
    /**
     * Filter which UserDepartment to delete.
     */
    where: UserDepartmentWhereUniqueInput
  }

  /**
   * UserDepartment deleteMany
   */
  export type UserDepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDepartments to delete
     */
    where?: UserDepartmentWhereInput
    /**
     * Limit how many UserDepartments to delete.
     */
    limit?: number
  }

  /**
   * UserDepartment without action
   */
  export type UserDepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDepartment
     */
    select?: UserDepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDepartment
     */
    omit?: UserDepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Folder
   */

  export type AggregateFolder = {
    _count: FolderCountAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  export type FolderMinAggregateOutputType = {
    id: string | null
    name: string | null
    departmentId: string | null
    userId: string | null
    parentId: string | null
    createdAt: Date | null
    deletedAt: Date | null
    deletedByUserId: string | null
  }

  export type FolderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    departmentId: string | null
    userId: string | null
    parentId: string | null
    createdAt: Date | null
    deletedAt: Date | null
    deletedByUserId: string | null
  }

  export type FolderCountAggregateOutputType = {
    id: number
    name: number
    departmentId: number
    userId: number
    parentId: number
    createdAt: number
    deletedAt: number
    deletedByUserId: number
    _all: number
  }


  export type FolderMinAggregateInputType = {
    id?: true
    name?: true
    departmentId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
  }

  export type FolderMaxAggregateInputType = {
    id?: true
    name?: true
    departmentId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
  }

  export type FolderCountAggregateInputType = {
    id?: true
    name?: true
    departmentId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    deletedAt?: true
    deletedByUserId?: true
    _all?: true
  }

  export type FolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Folder to aggregate.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Folders
    **/
    _count?: true | FolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FolderMaxAggregateInputType
  }

  export type GetFolderAggregateType<T extends FolderAggregateArgs> = {
        [P in keyof T & keyof AggregateFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFolder[P]>
      : GetScalarType<T[P], AggregateFolder[P]>
  }




  export type FolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithAggregationInput | FolderOrderByWithAggregationInput[]
    by: FolderScalarFieldEnum[] | FolderScalarFieldEnum
    having?: FolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FolderCountAggregateInputType | true
    _min?: FolderMinAggregateInputType
    _max?: FolderMaxAggregateInputType
  }

  export type FolderGroupByOutputType = {
    id: string
    name: string
    departmentId: string
    userId: string
    parentId: string | null
    createdAt: Date
    deletedAt: Date | null
    deletedByUserId: string | null
    _count: FolderCountAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  type GetFolderGroupByPayload<T extends FolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FolderGroupByOutputType[P]>
            : GetScalarType<T[P], FolderGroupByOutputType[P]>
        }
      >
    >


  export type FolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
    children?: boolean | Folder$childrenArgs<ExtArgs>
    documents?: boolean | Folder$documentsArgs<ExtArgs>
    permissions?: boolean | Folder$permissionsArgs<ExtArgs>
    _count?: boolean | FolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectScalar = {
    id?: boolean
    name?: boolean
    departmentId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    deletedByUserId?: boolean
  }

  export type FolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "departmentId" | "userId" | "parentId" | "createdAt" | "deletedAt" | "deletedByUserId", ExtArgs["result"]["folder"]>
  export type FolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
    children?: boolean | Folder$childrenArgs<ExtArgs>
    documents?: boolean | Folder$documentsArgs<ExtArgs>
    permissions?: boolean | Folder$permissionsArgs<ExtArgs>
    _count?: boolean | FolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }
  export type FolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }

  export type $FolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Folder"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs>
      parent: Prisma.$FolderPayload<ExtArgs> | null
      children: Prisma.$FolderPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      permissions: Prisma.$FolderPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      departmentId: string
      userId: string
      parentId: string | null
      createdAt: Date
      deletedAt: Date | null
      deletedByUserId: string | null
    }, ExtArgs["result"]["folder"]>
    composites: {}
  }

  type FolderGetPayload<S extends boolean | null | undefined | FolderDefaultArgs> = $Result.GetResult<Prisma.$FolderPayload, S>

  type FolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FolderCountAggregateInputType | true
    }

  export interface FolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Folder'], meta: { name: 'Folder' } }
    /**
     * Find zero or one Folder that matches the filter.
     * @param {FolderFindUniqueArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FolderFindUniqueArgs>(args: SelectSubset<T, FolderFindUniqueArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Folder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FolderFindUniqueOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FolderFindUniqueOrThrowArgs>(args: SelectSubset<T, FolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FolderFindFirstArgs>(args?: SelectSubset<T, FolderFindFirstArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FolderFindFirstOrThrowArgs>(args?: SelectSubset<T, FolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Folders
     * const folders = await prisma.folder.findMany()
     * 
     * // Get first 10 Folders
     * const folders = await prisma.folder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const folderWithIdOnly = await prisma.folder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FolderFindManyArgs>(args?: SelectSubset<T, FolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Folder.
     * @param {FolderCreateArgs} args - Arguments to create a Folder.
     * @example
     * // Create one Folder
     * const Folder = await prisma.folder.create({
     *   data: {
     *     // ... data to create a Folder
     *   }
     * })
     * 
     */
    create<T extends FolderCreateArgs>(args: SelectSubset<T, FolderCreateArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Folders.
     * @param {FolderCreateManyArgs} args - Arguments to create many Folders.
     * @example
     * // Create many Folders
     * const folder = await prisma.folder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FolderCreateManyArgs>(args?: SelectSubset<T, FolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Folders and returns the data saved in the database.
     * @param {FolderCreateManyAndReturnArgs} args - Arguments to create many Folders.
     * @example
     * // Create many Folders
     * const folder = await prisma.folder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Folders and only return the `id`
     * const folderWithIdOnly = await prisma.folder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FolderCreateManyAndReturnArgs>(args?: SelectSubset<T, FolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Folder.
     * @param {FolderDeleteArgs} args - Arguments to delete one Folder.
     * @example
     * // Delete one Folder
     * const Folder = await prisma.folder.delete({
     *   where: {
     *     // ... filter to delete one Folder
     *   }
     * })
     * 
     */
    delete<T extends FolderDeleteArgs>(args: SelectSubset<T, FolderDeleteArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Folder.
     * @param {FolderUpdateArgs} args - Arguments to update one Folder.
     * @example
     * // Update one Folder
     * const folder = await prisma.folder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FolderUpdateArgs>(args: SelectSubset<T, FolderUpdateArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Folders.
     * @param {FolderDeleteManyArgs} args - Arguments to filter Folders to delete.
     * @example
     * // Delete a few Folders
     * const { count } = await prisma.folder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FolderDeleteManyArgs>(args?: SelectSubset<T, FolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Folders
     * const folder = await prisma.folder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FolderUpdateManyArgs>(args: SelectSubset<T, FolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders and returns the data updated in the database.
     * @param {FolderUpdateManyAndReturnArgs} args - Arguments to update many Folders.
     * @example
     * // Update many Folders
     * const folder = await prisma.folder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Folders and only return the `id`
     * const folderWithIdOnly = await prisma.folder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FolderUpdateManyAndReturnArgs>(args: SelectSubset<T, FolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Folder.
     * @param {FolderUpsertArgs} args - Arguments to update or create a Folder.
     * @example
     * // Update or create a Folder
     * const folder = await prisma.folder.upsert({
     *   create: {
     *     // ... data to create a Folder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Folder we want to update
     *   }
     * })
     */
    upsert<T extends FolderUpsertArgs>(args: SelectSubset<T, FolderUpsertArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderCountArgs} args - Arguments to filter Folders to count.
     * @example
     * // Count the number of Folders
     * const count = await prisma.folder.count({
     *   where: {
     *     // ... the filter for the Folders we want to count
     *   }
     * })
    **/
    count<T extends FolderCountArgs>(
      args?: Subset<T, FolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FolderAggregateArgs>(args: Subset<T, FolderAggregateArgs>): Prisma.PrismaPromise<GetFolderAggregateType<T>>

    /**
     * Group by Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FolderGroupByArgs['orderBy'] }
        : { orderBy?: FolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Folder model
   */
  readonly fields: FolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Folder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Folder$parentArgs<ExtArgs> = {}>(args?: Subset<T, Folder$parentArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Folder$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Folder$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends Folder$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Folder$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Folder$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Folder$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Folder model
   */
  interface FolderFieldRefs {
    readonly id: FieldRef<"Folder", 'String'>
    readonly name: FieldRef<"Folder", 'String'>
    readonly departmentId: FieldRef<"Folder", 'String'>
    readonly userId: FieldRef<"Folder", 'String'>
    readonly parentId: FieldRef<"Folder", 'String'>
    readonly createdAt: FieldRef<"Folder", 'DateTime'>
    readonly deletedAt: FieldRef<"Folder", 'DateTime'>
    readonly deletedByUserId: FieldRef<"Folder", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Folder findUnique
   */
  export type FolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder findUniqueOrThrow
   */
  export type FolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder findFirst
   */
  export type FolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder findFirstOrThrow
   */
  export type FolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder findMany
   */
  export type FolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folders to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder create
   */
  export type FolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The data needed to create a Folder.
     */
    data: XOR<FolderCreateInput, FolderUncheckedCreateInput>
  }

  /**
   * Folder createMany
   */
  export type FolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Folders.
     */
    data: FolderCreateManyInput | FolderCreateManyInput[]
  }

  /**
   * Folder createManyAndReturn
   */
  export type FolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * The data used to create many Folders.
     */
    data: FolderCreateManyInput | FolderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Folder update
   */
  export type FolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The data needed to update a Folder.
     */
    data: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
    /**
     * Choose, which Folder to update.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder updateMany
   */
  export type FolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Folders.
     */
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyInput>
    /**
     * Filter which Folders to update
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to update.
     */
    limit?: number
  }

  /**
   * Folder updateManyAndReturn
   */
  export type FolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * The data used to update Folders.
     */
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyInput>
    /**
     * Filter which Folders to update
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Folder upsert
   */
  export type FolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The filter to search for the Folder to update in case it exists.
     */
    where: FolderWhereUniqueInput
    /**
     * In case the Folder found by the `where` argument doesn't exist, create a new Folder with this data.
     */
    create: XOR<FolderCreateInput, FolderUncheckedCreateInput>
    /**
     * In case the Folder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
  }

  /**
   * Folder delete
   */
  export type FolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter which Folder to delete.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder deleteMany
   */
  export type FolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Folders to delete
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to delete.
     */
    limit?: number
  }

  /**
   * Folder.parent
   */
  export type Folder$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
  }

  /**
   * Folder.children
   */
  export type Folder$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    cursor?: FolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder.documents
   */
  export type Folder$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Folder.permissions
   */
  export type Folder$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    where?: FolderPermissionWhereInput
    orderBy?: FolderPermissionOrderByWithRelationInput | FolderPermissionOrderByWithRelationInput[]
    cursor?: FolderPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FolderPermissionScalarFieldEnum | FolderPermissionScalarFieldEnum[]
  }

  /**
   * Folder without action
   */
  export type FolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
  }


  /**
   * Model FolderPermission
   */

  export type AggregateFolderPermission = {
    _count: FolderPermissionCountAggregateOutputType | null
    _min: FolderPermissionMinAggregateOutputType | null
    _max: FolderPermissionMaxAggregateOutputType | null
  }

  export type FolderPermissionMinAggregateOutputType = {
    id: string | null
    folderId: string | null
    sharedWithUserId: string | null
    permissionLevel: string | null
    sharedAt: Date | null
    expiresAt: Date | null
    grantedByUserId: string | null
  }

  export type FolderPermissionMaxAggregateOutputType = {
    id: string | null
    folderId: string | null
    sharedWithUserId: string | null
    permissionLevel: string | null
    sharedAt: Date | null
    expiresAt: Date | null
    grantedByUserId: string | null
  }

  export type FolderPermissionCountAggregateOutputType = {
    id: number
    folderId: number
    sharedWithUserId: number
    permissionLevel: number
    sharedAt: number
    expiresAt: number
    grantedByUserId: number
    _all: number
  }


  export type FolderPermissionMinAggregateInputType = {
    id?: true
    folderId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
    grantedByUserId?: true
  }

  export type FolderPermissionMaxAggregateInputType = {
    id?: true
    folderId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
    grantedByUserId?: true
  }

  export type FolderPermissionCountAggregateInputType = {
    id?: true
    folderId?: true
    sharedWithUserId?: true
    permissionLevel?: true
    sharedAt?: true
    expiresAt?: true
    grantedByUserId?: true
    _all?: true
  }

  export type FolderPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FolderPermission to aggregate.
     */
    where?: FolderPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FolderPermissions to fetch.
     */
    orderBy?: FolderPermissionOrderByWithRelationInput | FolderPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FolderPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FolderPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FolderPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FolderPermissions
    **/
    _count?: true | FolderPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FolderPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FolderPermissionMaxAggregateInputType
  }

  export type GetFolderPermissionAggregateType<T extends FolderPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateFolderPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFolderPermission[P]>
      : GetScalarType<T[P], AggregateFolderPermission[P]>
  }




  export type FolderPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderPermissionWhereInput
    orderBy?: FolderPermissionOrderByWithAggregationInput | FolderPermissionOrderByWithAggregationInput[]
    by: FolderPermissionScalarFieldEnum[] | FolderPermissionScalarFieldEnum
    having?: FolderPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FolderPermissionCountAggregateInputType | true
    _min?: FolderPermissionMinAggregateInputType
    _max?: FolderPermissionMaxAggregateInputType
  }

  export type FolderPermissionGroupByOutputType = {
    id: string
    folderId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt: Date
    expiresAt: Date | null
    grantedByUserId: string | null
    _count: FolderPermissionCountAggregateOutputType | null
    _min: FolderPermissionMinAggregateOutputType | null
    _max: FolderPermissionMaxAggregateOutputType | null
  }

  type GetFolderPermissionGroupByPayload<T extends FolderPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FolderPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FolderPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FolderPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], FolderPermissionGroupByOutputType[P]>
        }
      >
    >


  export type FolderPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    folderId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    grantedByUserId?: boolean
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folderPermission"]>

  export type FolderPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    folderId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    grantedByUserId?: boolean
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folderPermission"]>

  export type FolderPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    folderId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    grantedByUserId?: boolean
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folderPermission"]>

  export type FolderPermissionSelectScalar = {
    id?: boolean
    folderId?: boolean
    sharedWithUserId?: boolean
    permissionLevel?: boolean
    sharedAt?: boolean
    expiresAt?: boolean
    grantedByUserId?: boolean
  }

  export type FolderPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "folderId" | "sharedWithUserId" | "permissionLevel" | "sharedAt" | "expiresAt" | "grantedByUserId", ExtArgs["result"]["folderPermission"]>
  export type FolderPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }
  export type FolderPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }
  export type FolderPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | FolderDefaultArgs<ExtArgs>
  }

  export type $FolderPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FolderPermission"
    objects: {
      folder: Prisma.$FolderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      folderId: string
      sharedWithUserId: string
      permissionLevel: string
      sharedAt: Date
      expiresAt: Date | null
      grantedByUserId: string | null
    }, ExtArgs["result"]["folderPermission"]>
    composites: {}
  }

  type FolderPermissionGetPayload<S extends boolean | null | undefined | FolderPermissionDefaultArgs> = $Result.GetResult<Prisma.$FolderPermissionPayload, S>

  type FolderPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FolderPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FolderPermissionCountAggregateInputType | true
    }

  export interface FolderPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FolderPermission'], meta: { name: 'FolderPermission' } }
    /**
     * Find zero or one FolderPermission that matches the filter.
     * @param {FolderPermissionFindUniqueArgs} args - Arguments to find a FolderPermission
     * @example
     * // Get one FolderPermission
     * const folderPermission = await prisma.folderPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FolderPermissionFindUniqueArgs>(args: SelectSubset<T, FolderPermissionFindUniqueArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FolderPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FolderPermissionFindUniqueOrThrowArgs} args - Arguments to find a FolderPermission
     * @example
     * // Get one FolderPermission
     * const folderPermission = await prisma.folderPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FolderPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, FolderPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FolderPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionFindFirstArgs} args - Arguments to find a FolderPermission
     * @example
     * // Get one FolderPermission
     * const folderPermission = await prisma.folderPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FolderPermissionFindFirstArgs>(args?: SelectSubset<T, FolderPermissionFindFirstArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FolderPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionFindFirstOrThrowArgs} args - Arguments to find a FolderPermission
     * @example
     * // Get one FolderPermission
     * const folderPermission = await prisma.folderPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FolderPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, FolderPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FolderPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FolderPermissions
     * const folderPermissions = await prisma.folderPermission.findMany()
     * 
     * // Get first 10 FolderPermissions
     * const folderPermissions = await prisma.folderPermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const folderPermissionWithIdOnly = await prisma.folderPermission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FolderPermissionFindManyArgs>(args?: SelectSubset<T, FolderPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FolderPermission.
     * @param {FolderPermissionCreateArgs} args - Arguments to create a FolderPermission.
     * @example
     * // Create one FolderPermission
     * const FolderPermission = await prisma.folderPermission.create({
     *   data: {
     *     // ... data to create a FolderPermission
     *   }
     * })
     * 
     */
    create<T extends FolderPermissionCreateArgs>(args: SelectSubset<T, FolderPermissionCreateArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FolderPermissions.
     * @param {FolderPermissionCreateManyArgs} args - Arguments to create many FolderPermissions.
     * @example
     * // Create many FolderPermissions
     * const folderPermission = await prisma.folderPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FolderPermissionCreateManyArgs>(args?: SelectSubset<T, FolderPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FolderPermissions and returns the data saved in the database.
     * @param {FolderPermissionCreateManyAndReturnArgs} args - Arguments to create many FolderPermissions.
     * @example
     * // Create many FolderPermissions
     * const folderPermission = await prisma.folderPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FolderPermissions and only return the `id`
     * const folderPermissionWithIdOnly = await prisma.folderPermission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FolderPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, FolderPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FolderPermission.
     * @param {FolderPermissionDeleteArgs} args - Arguments to delete one FolderPermission.
     * @example
     * // Delete one FolderPermission
     * const FolderPermission = await prisma.folderPermission.delete({
     *   where: {
     *     // ... filter to delete one FolderPermission
     *   }
     * })
     * 
     */
    delete<T extends FolderPermissionDeleteArgs>(args: SelectSubset<T, FolderPermissionDeleteArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FolderPermission.
     * @param {FolderPermissionUpdateArgs} args - Arguments to update one FolderPermission.
     * @example
     * // Update one FolderPermission
     * const folderPermission = await prisma.folderPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FolderPermissionUpdateArgs>(args: SelectSubset<T, FolderPermissionUpdateArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FolderPermissions.
     * @param {FolderPermissionDeleteManyArgs} args - Arguments to filter FolderPermissions to delete.
     * @example
     * // Delete a few FolderPermissions
     * const { count } = await prisma.folderPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FolderPermissionDeleteManyArgs>(args?: SelectSubset<T, FolderPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FolderPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FolderPermissions
     * const folderPermission = await prisma.folderPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FolderPermissionUpdateManyArgs>(args: SelectSubset<T, FolderPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FolderPermissions and returns the data updated in the database.
     * @param {FolderPermissionUpdateManyAndReturnArgs} args - Arguments to update many FolderPermissions.
     * @example
     * // Update many FolderPermissions
     * const folderPermission = await prisma.folderPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FolderPermissions and only return the `id`
     * const folderPermissionWithIdOnly = await prisma.folderPermission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FolderPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, FolderPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FolderPermission.
     * @param {FolderPermissionUpsertArgs} args - Arguments to update or create a FolderPermission.
     * @example
     * // Update or create a FolderPermission
     * const folderPermission = await prisma.folderPermission.upsert({
     *   create: {
     *     // ... data to create a FolderPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FolderPermission we want to update
     *   }
     * })
     */
    upsert<T extends FolderPermissionUpsertArgs>(args: SelectSubset<T, FolderPermissionUpsertArgs<ExtArgs>>): Prisma__FolderPermissionClient<$Result.GetResult<Prisma.$FolderPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FolderPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionCountArgs} args - Arguments to filter FolderPermissions to count.
     * @example
     * // Count the number of FolderPermissions
     * const count = await prisma.folderPermission.count({
     *   where: {
     *     // ... the filter for the FolderPermissions we want to count
     *   }
     * })
    **/
    count<T extends FolderPermissionCountArgs>(
      args?: Subset<T, FolderPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FolderPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FolderPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FolderPermissionAggregateArgs>(args: Subset<T, FolderPermissionAggregateArgs>): Prisma.PrismaPromise<GetFolderPermissionAggregateType<T>>

    /**
     * Group by FolderPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderPermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FolderPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FolderPermissionGroupByArgs['orderBy'] }
        : { orderBy?: FolderPermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FolderPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFolderPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FolderPermission model
   */
  readonly fields: FolderPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FolderPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FolderPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folder<T extends FolderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FolderDefaultArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FolderPermission model
   */
  interface FolderPermissionFieldRefs {
    readonly id: FieldRef<"FolderPermission", 'String'>
    readonly folderId: FieldRef<"FolderPermission", 'String'>
    readonly sharedWithUserId: FieldRef<"FolderPermission", 'String'>
    readonly permissionLevel: FieldRef<"FolderPermission", 'String'>
    readonly sharedAt: FieldRef<"FolderPermission", 'DateTime'>
    readonly expiresAt: FieldRef<"FolderPermission", 'DateTime'>
    readonly grantedByUserId: FieldRef<"FolderPermission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FolderPermission findUnique
   */
  export type FolderPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter, which FolderPermission to fetch.
     */
    where: FolderPermissionWhereUniqueInput
  }

  /**
   * FolderPermission findUniqueOrThrow
   */
  export type FolderPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter, which FolderPermission to fetch.
     */
    where: FolderPermissionWhereUniqueInput
  }

  /**
   * FolderPermission findFirst
   */
  export type FolderPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter, which FolderPermission to fetch.
     */
    where?: FolderPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FolderPermissions to fetch.
     */
    orderBy?: FolderPermissionOrderByWithRelationInput | FolderPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FolderPermissions.
     */
    cursor?: FolderPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FolderPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FolderPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FolderPermissions.
     */
    distinct?: FolderPermissionScalarFieldEnum | FolderPermissionScalarFieldEnum[]
  }

  /**
   * FolderPermission findFirstOrThrow
   */
  export type FolderPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter, which FolderPermission to fetch.
     */
    where?: FolderPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FolderPermissions to fetch.
     */
    orderBy?: FolderPermissionOrderByWithRelationInput | FolderPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FolderPermissions.
     */
    cursor?: FolderPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FolderPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FolderPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FolderPermissions.
     */
    distinct?: FolderPermissionScalarFieldEnum | FolderPermissionScalarFieldEnum[]
  }

  /**
   * FolderPermission findMany
   */
  export type FolderPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter, which FolderPermissions to fetch.
     */
    where?: FolderPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FolderPermissions to fetch.
     */
    orderBy?: FolderPermissionOrderByWithRelationInput | FolderPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FolderPermissions.
     */
    cursor?: FolderPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FolderPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FolderPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FolderPermissions.
     */
    distinct?: FolderPermissionScalarFieldEnum | FolderPermissionScalarFieldEnum[]
  }

  /**
   * FolderPermission create
   */
  export type FolderPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a FolderPermission.
     */
    data: XOR<FolderPermissionCreateInput, FolderPermissionUncheckedCreateInput>
  }

  /**
   * FolderPermission createMany
   */
  export type FolderPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FolderPermissions.
     */
    data: FolderPermissionCreateManyInput | FolderPermissionCreateManyInput[]
  }

  /**
   * FolderPermission createManyAndReturn
   */
  export type FolderPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many FolderPermissions.
     */
    data: FolderPermissionCreateManyInput | FolderPermissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FolderPermission update
   */
  export type FolderPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a FolderPermission.
     */
    data: XOR<FolderPermissionUpdateInput, FolderPermissionUncheckedUpdateInput>
    /**
     * Choose, which FolderPermission to update.
     */
    where: FolderPermissionWhereUniqueInput
  }

  /**
   * FolderPermission updateMany
   */
  export type FolderPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FolderPermissions.
     */
    data: XOR<FolderPermissionUpdateManyMutationInput, FolderPermissionUncheckedUpdateManyInput>
    /**
     * Filter which FolderPermissions to update
     */
    where?: FolderPermissionWhereInput
    /**
     * Limit how many FolderPermissions to update.
     */
    limit?: number
  }

  /**
   * FolderPermission updateManyAndReturn
   */
  export type FolderPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * The data used to update FolderPermissions.
     */
    data: XOR<FolderPermissionUpdateManyMutationInput, FolderPermissionUncheckedUpdateManyInput>
    /**
     * Filter which FolderPermissions to update
     */
    where?: FolderPermissionWhereInput
    /**
     * Limit how many FolderPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FolderPermission upsert
   */
  export type FolderPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the FolderPermission to update in case it exists.
     */
    where: FolderPermissionWhereUniqueInput
    /**
     * In case the FolderPermission found by the `where` argument doesn't exist, create a new FolderPermission with this data.
     */
    create: XOR<FolderPermissionCreateInput, FolderPermissionUncheckedCreateInput>
    /**
     * In case the FolderPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FolderPermissionUpdateInput, FolderPermissionUncheckedUpdateInput>
  }

  /**
   * FolderPermission delete
   */
  export type FolderPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
    /**
     * Filter which FolderPermission to delete.
     */
    where: FolderPermissionWhereUniqueInput
  }

  /**
   * FolderPermission deleteMany
   */
  export type FolderPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FolderPermissions to delete
     */
    where?: FolderPermissionWhereInput
    /**
     * Limit how many FolderPermissions to delete.
     */
    limit?: number
  }

  /**
   * FolderPermission without action
   */
  export type FolderPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderPermission
     */
    select?: FolderPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FolderPermission
     */
    omit?: FolderPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderPermissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    displayName: 'displayName',
    path: 'path',
    mimeType: 'mimeType',
    userId: 'userId',
    departmentId: 'departmentId',
    folderId: 'folderId',
    status: 'status',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    deletedByUserId: 'deletedByUserId',
    searchTokens: 'searchTokens',
    indexedAt: 'indexedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const LabelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId'
  };

  export type LabelScalarFieldEnum = (typeof LabelScalarFieldEnum)[keyof typeof LabelScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    metadata: 'metadata',
    ip: 'ip',
    userAgent: 'userAgent',
    departmentId: 'departmentId',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const TenantSettingsScalarFieldEnum: {
    id: 'id',
    watermarkingEnabled: 'watermarkingEnabled',
    antiScreenshotBlur: 'antiScreenshotBlur'
  };

  export type TenantSettingsScalarFieldEnum = (typeof TenantSettingsScalarFieldEnum)[keyof typeof TenantSettingsScalarFieldEnum]


  export const DocumentPermissionScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    sharedWithUserId: 'sharedWithUserId',
    permissionLevel: 'permissionLevel',
    sharedAt: 'sharedAt',
    expiresAt: 'expiresAt'
  };

  export type DocumentPermissionScalarFieldEnum = (typeof DocumentPermissionScalarFieldEnum)[keyof typeof DocumentPermissionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role',
    password_hash: 'password_hash',
    last_login_at: 'last_login_at',
    last_login_ip: 'last_login_ip'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActiveSessionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token_hash: 'token_hash',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    created_at: 'created_at',
    expires_at: 'expires_at'
  };

  export type ActiveSessionScalarFieldEnum = (typeof ActiveSessionScalarFieldEnum)[keyof typeof ActiveSessionScalarFieldEnum]


  export const SecurityLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    ip_address: 'ip_address',
    user_id: 'user_id',
    created_at: 'created_at'
  };

  export type SecurityLogScalarFieldEnum = (typeof SecurityLogScalarFieldEnum)[keyof typeof SecurityLogScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tenantId: 'tenantId',
    defaultPermissionPreset: 'defaultPermissionPreset'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const UserDepartmentScalarFieldEnum: {
    userId: 'userId',
    departmentId: 'departmentId',
    role: 'role',
    isPrimary: 'isPrimary',
    permissions: 'permissions'
  };

  export type UserDepartmentScalarFieldEnum = (typeof UserDepartmentScalarFieldEnum)[keyof typeof UserDepartmentScalarFieldEnum]


  export const FolderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    departmentId: 'departmentId',
    userId: 'userId',
    parentId: 'parentId',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    deletedByUserId: 'deletedByUserId'
  };

  export type FolderScalarFieldEnum = (typeof FolderScalarFieldEnum)[keyof typeof FolderScalarFieldEnum]


  export const FolderPermissionScalarFieldEnum: {
    id: 'id',
    folderId: 'folderId',
    sharedWithUserId: 'sharedWithUserId',
    permissionLevel: 'permissionLevel',
    sharedAt: 'sharedAt',
    expiresAt: 'expiresAt',
    grantedByUserId: 'grantedByUserId'
  };

  export type FolderPermissionScalarFieldEnum = (typeof FolderPermissionScalarFieldEnum)[keyof typeof FolderPermissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    displayName?: StringNullableFilter<"Document"> | string | null
    path?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    userId?: StringFilter<"Document"> | string
    departmentId?: StringNullableFilter<"Document"> | string | null
    folderId?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Document"> | string | null
    searchTokens?: StringNullableFilter<"Document"> | string | null
    indexedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    labels?: LabelListRelationFilter
    permissions?: DocumentPermissionListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrderInput | SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    searchTokens?: SortOrderInput | SortOrder
    indexedAt?: SortOrderInput | SortOrder
    department?: DepartmentOrderByWithRelationInput
    folder?: FolderOrderByWithRelationInput
    labels?: LabelOrderByRelationAggregateInput
    permissions?: DocumentPermissionOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    name?: StringFilter<"Document"> | string
    displayName?: StringNullableFilter<"Document"> | string | null
    path?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    userId?: StringFilter<"Document"> | string
    departmentId?: StringNullableFilter<"Document"> | string | null
    folderId?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Document"> | string | null
    searchTokens?: StringNullableFilter<"Document"> | string | null
    indexedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    labels?: LabelListRelationFilter
    permissions?: DocumentPermissionListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrderInput | SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    searchTokens?: SortOrderInput | SortOrder
    indexedAt?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    name?: StringWithAggregatesFilter<"Document"> | string
    displayName?: StringNullableWithAggregatesFilter<"Document"> | string | null
    path?: StringWithAggregatesFilter<"Document"> | string
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    userId?: StringWithAggregatesFilter<"Document"> | string
    departmentId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    deletedByUserId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    searchTokens?: StringNullableWithAggregatesFilter<"Document"> | string | null
    indexedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
  }

  export type LabelWhereInput = {
    AND?: LabelWhereInput | LabelWhereInput[]
    OR?: LabelWhereInput[]
    NOT?: LabelWhereInput | LabelWhereInput[]
    id?: StringFilter<"Label"> | string
    name?: StringFilter<"Label"> | string
    userId?: StringFilter<"Label"> | string
    documents?: DocumentListRelationFilter
  }

  export type LabelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type LabelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_userId?: LabelNameUserIdCompoundUniqueInput
    AND?: LabelWhereInput | LabelWhereInput[]
    OR?: LabelWhereInput[]
    NOT?: LabelWhereInput | LabelWhereInput[]
    name?: StringFilter<"Label"> | string
    userId?: StringFilter<"Label"> | string
    documents?: DocumentListRelationFilter
  }, "id" | "name_userId">

  export type LabelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    _count?: LabelCountOrderByAggregateInput
    _max?: LabelMaxOrderByAggregateInput
    _min?: LabelMinOrderByAggregateInput
  }

  export type LabelScalarWhereWithAggregatesInput = {
    AND?: LabelScalarWhereWithAggregatesInput | LabelScalarWhereWithAggregatesInput[]
    OR?: LabelScalarWhereWithAggregatesInput[]
    NOT?: LabelScalarWhereWithAggregatesInput | LabelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Label"> | string
    name?: StringWithAggregatesFilter<"Label"> | string
    userId?: StringWithAggregatesFilter<"Label"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    departmentId?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    metadata?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    departmentId?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    departmentId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type TenantSettingsWhereInput = {
    AND?: TenantSettingsWhereInput | TenantSettingsWhereInput[]
    OR?: TenantSettingsWhereInput[]
    NOT?: TenantSettingsWhereInput | TenantSettingsWhereInput[]
    id?: StringFilter<"TenantSettings"> | string
    watermarkingEnabled?: BoolFilter<"TenantSettings"> | boolean
    antiScreenshotBlur?: BoolFilter<"TenantSettings"> | boolean
  }

  export type TenantSettingsOrderByWithRelationInput = {
    id?: SortOrder
    watermarkingEnabled?: SortOrder
    antiScreenshotBlur?: SortOrder
  }

  export type TenantSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TenantSettingsWhereInput | TenantSettingsWhereInput[]
    OR?: TenantSettingsWhereInput[]
    NOT?: TenantSettingsWhereInput | TenantSettingsWhereInput[]
    watermarkingEnabled?: BoolFilter<"TenantSettings"> | boolean
    antiScreenshotBlur?: BoolFilter<"TenantSettings"> | boolean
  }, "id">

  export type TenantSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    watermarkingEnabled?: SortOrder
    antiScreenshotBlur?: SortOrder
    _count?: TenantSettingsCountOrderByAggregateInput
    _max?: TenantSettingsMaxOrderByAggregateInput
    _min?: TenantSettingsMinOrderByAggregateInput
  }

  export type TenantSettingsScalarWhereWithAggregatesInput = {
    AND?: TenantSettingsScalarWhereWithAggregatesInput | TenantSettingsScalarWhereWithAggregatesInput[]
    OR?: TenantSettingsScalarWhereWithAggregatesInput[]
    NOT?: TenantSettingsScalarWhereWithAggregatesInput | TenantSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantSettings"> | string
    watermarkingEnabled?: BoolWithAggregatesFilter<"TenantSettings"> | boolean
    antiScreenshotBlur?: BoolWithAggregatesFilter<"TenantSettings"> | boolean
  }

  export type DocumentPermissionWhereInput = {
    AND?: DocumentPermissionWhereInput | DocumentPermissionWhereInput[]
    OR?: DocumentPermissionWhereInput[]
    NOT?: DocumentPermissionWhereInput | DocumentPermissionWhereInput[]
    id?: StringFilter<"DocumentPermission"> | string
    documentId?: StringFilter<"DocumentPermission"> | string
    sharedWithUserId?: StringFilter<"DocumentPermission"> | string
    permissionLevel?: StringFilter<"DocumentPermission"> | string
    sharedAt?: DateTimeFilter<"DocumentPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"DocumentPermission"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type DocumentPermissionOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_sharedWithUserId?: DocumentPermissionDocumentIdSharedWithUserIdCompoundUniqueInput
    AND?: DocumentPermissionWhereInput | DocumentPermissionWhereInput[]
    OR?: DocumentPermissionWhereInput[]
    NOT?: DocumentPermissionWhereInput | DocumentPermissionWhereInput[]
    documentId?: StringFilter<"DocumentPermission"> | string
    sharedWithUserId?: StringFilter<"DocumentPermission"> | string
    permissionLevel?: StringFilter<"DocumentPermission"> | string
    sharedAt?: DateTimeFilter<"DocumentPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"DocumentPermission"> | Date | string | null
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "documentId_sharedWithUserId">

  export type DocumentPermissionOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: DocumentPermissionCountOrderByAggregateInput
    _max?: DocumentPermissionMaxOrderByAggregateInput
    _min?: DocumentPermissionMinOrderByAggregateInput
  }

  export type DocumentPermissionScalarWhereWithAggregatesInput = {
    AND?: DocumentPermissionScalarWhereWithAggregatesInput | DocumentPermissionScalarWhereWithAggregatesInput[]
    OR?: DocumentPermissionScalarWhereWithAggregatesInput[]
    NOT?: DocumentPermissionScalarWhereWithAggregatesInput | DocumentPermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentPermission"> | string
    documentId?: StringWithAggregatesFilter<"DocumentPermission"> | string
    sharedWithUserId?: StringWithAggregatesFilter<"DocumentPermission"> | string
    permissionLevel?: StringWithAggregatesFilter<"DocumentPermission"> | string
    sharedAt?: DateTimeWithAggregatesFilter<"DocumentPermission"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"DocumentPermission"> | Date | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    last_login_at?: DateTimeNullableFilter<"User"> | Date | string | null
    last_login_ip?: StringNullableFilter<"User"> | string | null
    departments?: UserDepartmentListRelationFilter
    sessions?: ActiveSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password_hash?: SortOrder
    last_login_at?: SortOrderInput | SortOrder
    last_login_ip?: SortOrderInput | SortOrder
    departments?: UserDepartmentOrderByRelationAggregateInput
    sessions?: ActiveSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    last_login_at?: DateTimeNullableFilter<"User"> | Date | string | null
    last_login_ip?: StringNullableFilter<"User"> | string | null
    departments?: UserDepartmentListRelationFilter
    sessions?: ActiveSessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password_hash?: SortOrder
    last_login_at?: SortOrderInput | SortOrder
    last_login_ip?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    last_login_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    last_login_ip?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ActiveSessionWhereInput = {
    AND?: ActiveSessionWhereInput | ActiveSessionWhereInput[]
    OR?: ActiveSessionWhereInput[]
    NOT?: ActiveSessionWhereInput | ActiveSessionWhereInput[]
    id?: StringFilter<"ActiveSession"> | string
    user_id?: StringFilter<"ActiveSession"> | string
    token_hash?: StringFilter<"ActiveSession"> | string
    ip_address?: StringNullableFilter<"ActiveSession"> | string | null
    user_agent?: StringNullableFilter<"ActiveSession"> | string | null
    created_at?: DateTimeFilter<"ActiveSession"> | Date | string
    expires_at?: DateTimeFilter<"ActiveSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActiveSessionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActiveSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActiveSessionWhereInput | ActiveSessionWhereInput[]
    OR?: ActiveSessionWhereInput[]
    NOT?: ActiveSessionWhereInput | ActiveSessionWhereInput[]
    user_id?: StringFilter<"ActiveSession"> | string
    token_hash?: StringFilter<"ActiveSession"> | string
    ip_address?: StringNullableFilter<"ActiveSession"> | string | null
    user_agent?: StringNullableFilter<"ActiveSession"> | string | null
    created_at?: DateTimeFilter<"ActiveSession"> | Date | string
    expires_at?: DateTimeFilter<"ActiveSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActiveSessionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    _count?: ActiveSessionCountOrderByAggregateInput
    _max?: ActiveSessionMaxOrderByAggregateInput
    _min?: ActiveSessionMinOrderByAggregateInput
  }

  export type ActiveSessionScalarWhereWithAggregatesInput = {
    AND?: ActiveSessionScalarWhereWithAggregatesInput | ActiveSessionScalarWhereWithAggregatesInput[]
    OR?: ActiveSessionScalarWhereWithAggregatesInput[]
    NOT?: ActiveSessionScalarWhereWithAggregatesInput | ActiveSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActiveSession"> | string
    user_id?: StringWithAggregatesFilter<"ActiveSession"> | string
    token_hash?: StringWithAggregatesFilter<"ActiveSession"> | string
    ip_address?: StringNullableWithAggregatesFilter<"ActiveSession"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"ActiveSession"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ActiveSession"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"ActiveSession"> | Date | string
  }

  export type SecurityLogWhereInput = {
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    id?: StringFilter<"SecurityLog"> | string
    action?: StringFilter<"SecurityLog"> | string
    ip_address?: StringNullableFilter<"SecurityLog"> | string | null
    user_id?: StringNullableFilter<"SecurityLog"> | string | null
    created_at?: DateTimeFilter<"SecurityLog"> | Date | string
  }

  export type SecurityLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type SecurityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    action?: StringFilter<"SecurityLog"> | string
    ip_address?: StringNullableFilter<"SecurityLog"> | string | null
    user_id?: StringNullableFilter<"SecurityLog"> | string | null
    created_at?: DateTimeFilter<"SecurityLog"> | Date | string
  }, "id">

  export type SecurityLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: SecurityLogCountOrderByAggregateInput
    _max?: SecurityLogMaxOrderByAggregateInput
    _min?: SecurityLogMinOrderByAggregateInput
  }

  export type SecurityLogScalarWhereWithAggregatesInput = {
    AND?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    OR?: SecurityLogScalarWhereWithAggregatesInput[]
    NOT?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityLog"> | string
    action?: StringWithAggregatesFilter<"SecurityLog"> | string
    ip_address?: StringNullableWithAggregatesFilter<"SecurityLog"> | string | null
    user_id?: StringNullableWithAggregatesFilter<"SecurityLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"SecurityLog"> | Date | string
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    tenantId?: StringFilter<"Department"> | string
    defaultPermissionPreset?: StringNullableFilter<"Department"> | string | null
    users?: UserDepartmentListRelationFilter
    documents?: DocumentListRelationFilter
    folders?: FolderListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    defaultPermissionPreset?: SortOrderInput | SortOrder
    users?: UserDepartmentOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    folders?: FolderOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name?: StringFilter<"Department"> | string
    tenantId?: StringFilter<"Department"> | string
    defaultPermissionPreset?: StringNullableFilter<"Department"> | string | null
    users?: UserDepartmentListRelationFilter
    documents?: DocumentListRelationFilter
    folders?: FolderListRelationFilter
  }, "id">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    defaultPermissionPreset?: SortOrderInput | SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    tenantId?: StringWithAggregatesFilter<"Department"> | string
    defaultPermissionPreset?: StringNullableWithAggregatesFilter<"Department"> | string | null
  }

  export type UserDepartmentWhereInput = {
    AND?: UserDepartmentWhereInput | UserDepartmentWhereInput[]
    OR?: UserDepartmentWhereInput[]
    NOT?: UserDepartmentWhereInput | UserDepartmentWhereInput[]
    userId?: StringFilter<"UserDepartment"> | string
    departmentId?: StringFilter<"UserDepartment"> | string
    role?: StringFilter<"UserDepartment"> | string
    isPrimary?: BoolFilter<"UserDepartment"> | boolean
    permissions?: StringFilter<"UserDepartment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }

  export type UserDepartmentOrderByWithRelationInput = {
    userId?: SortOrder
    departmentId?: SortOrder
    role?: SortOrder
    isPrimary?: SortOrder
    permissions?: SortOrder
    user?: UserOrderByWithRelationInput
    department?: DepartmentOrderByWithRelationInput
  }

  export type UserDepartmentWhereUniqueInput = Prisma.AtLeast<{
    userId_departmentId?: UserDepartmentUserIdDepartmentIdCompoundUniqueInput
    AND?: UserDepartmentWhereInput | UserDepartmentWhereInput[]
    OR?: UserDepartmentWhereInput[]
    NOT?: UserDepartmentWhereInput | UserDepartmentWhereInput[]
    userId?: StringFilter<"UserDepartment"> | string
    departmentId?: StringFilter<"UserDepartment"> | string
    role?: StringFilter<"UserDepartment"> | string
    isPrimary?: BoolFilter<"UserDepartment"> | boolean
    permissions?: StringFilter<"UserDepartment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
  }, "userId_departmentId">

  export type UserDepartmentOrderByWithAggregationInput = {
    userId?: SortOrder
    departmentId?: SortOrder
    role?: SortOrder
    isPrimary?: SortOrder
    permissions?: SortOrder
    _count?: UserDepartmentCountOrderByAggregateInput
    _max?: UserDepartmentMaxOrderByAggregateInput
    _min?: UserDepartmentMinOrderByAggregateInput
  }

  export type UserDepartmentScalarWhereWithAggregatesInput = {
    AND?: UserDepartmentScalarWhereWithAggregatesInput | UserDepartmentScalarWhereWithAggregatesInput[]
    OR?: UserDepartmentScalarWhereWithAggregatesInput[]
    NOT?: UserDepartmentScalarWhereWithAggregatesInput | UserDepartmentScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserDepartment"> | string
    departmentId?: StringWithAggregatesFilter<"UserDepartment"> | string
    role?: StringWithAggregatesFilter<"UserDepartment"> | string
    isPrimary?: BoolWithAggregatesFilter<"UserDepartment"> | boolean
    permissions?: StringWithAggregatesFilter<"UserDepartment"> | string
  }

  export type FolderWhereInput = {
    AND?: FolderWhereInput | FolderWhereInput[]
    OR?: FolderWhereInput[]
    NOT?: FolderWhereInput | FolderWhereInput[]
    id?: StringFilter<"Folder"> | string
    name?: StringFilter<"Folder"> | string
    departmentId?: StringFilter<"Folder"> | string
    userId?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Folder"> | string | null
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    parent?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    children?: FolderListRelationFilter
    documents?: DocumentListRelationFilter
    permissions?: FolderPermissionListRelationFilter
  }

  export type FolderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    departmentId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    department?: DepartmentOrderByWithRelationInput
    parent?: FolderOrderByWithRelationInput
    children?: FolderOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    permissions?: FolderPermissionOrderByRelationAggregateInput
  }

  export type FolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FolderWhereInput | FolderWhereInput[]
    OR?: FolderWhereInput[]
    NOT?: FolderWhereInput | FolderWhereInput[]
    name?: StringFilter<"Folder"> | string
    departmentId?: StringFilter<"Folder"> | string
    userId?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Folder"> | string | null
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    parent?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    children?: FolderListRelationFilter
    documents?: DocumentListRelationFilter
    permissions?: FolderPermissionListRelationFilter
  }, "id">

  export type FolderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    departmentId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    deletedByUserId?: SortOrderInput | SortOrder
    _count?: FolderCountOrderByAggregateInput
    _max?: FolderMaxOrderByAggregateInput
    _min?: FolderMinOrderByAggregateInput
  }

  export type FolderScalarWhereWithAggregatesInput = {
    AND?: FolderScalarWhereWithAggregatesInput | FolderScalarWhereWithAggregatesInput[]
    OR?: FolderScalarWhereWithAggregatesInput[]
    NOT?: FolderScalarWhereWithAggregatesInput | FolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Folder"> | string
    name?: StringWithAggregatesFilter<"Folder"> | string
    departmentId?: StringWithAggregatesFilter<"Folder"> | string
    userId?: StringWithAggregatesFilter<"Folder"> | string
    parentId?: StringNullableWithAggregatesFilter<"Folder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Folder"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Folder"> | Date | string | null
    deletedByUserId?: StringNullableWithAggregatesFilter<"Folder"> | string | null
  }

  export type FolderPermissionWhereInput = {
    AND?: FolderPermissionWhereInput | FolderPermissionWhereInput[]
    OR?: FolderPermissionWhereInput[]
    NOT?: FolderPermissionWhereInput | FolderPermissionWhereInput[]
    id?: StringFilter<"FolderPermission"> | string
    folderId?: StringFilter<"FolderPermission"> | string
    sharedWithUserId?: StringFilter<"FolderPermission"> | string
    permissionLevel?: StringFilter<"FolderPermission"> | string
    sharedAt?: DateTimeFilter<"FolderPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FolderPermission"> | Date | string | null
    grantedByUserId?: StringNullableFilter<"FolderPermission"> | string | null
    folder?: XOR<FolderScalarRelationFilter, FolderWhereInput>
  }

  export type FolderPermissionOrderByWithRelationInput = {
    id?: SortOrder
    folderId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    grantedByUserId?: SortOrderInput | SortOrder
    folder?: FolderOrderByWithRelationInput
  }

  export type FolderPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    folderId_sharedWithUserId?: FolderPermissionFolderIdSharedWithUserIdCompoundUniqueInput
    AND?: FolderPermissionWhereInput | FolderPermissionWhereInput[]
    OR?: FolderPermissionWhereInput[]
    NOT?: FolderPermissionWhereInput | FolderPermissionWhereInput[]
    folderId?: StringFilter<"FolderPermission"> | string
    sharedWithUserId?: StringFilter<"FolderPermission"> | string
    permissionLevel?: StringFilter<"FolderPermission"> | string
    sharedAt?: DateTimeFilter<"FolderPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FolderPermission"> | Date | string | null
    grantedByUserId?: StringNullableFilter<"FolderPermission"> | string | null
    folder?: XOR<FolderScalarRelationFilter, FolderWhereInput>
  }, "id" | "folderId_sharedWithUserId">

  export type FolderPermissionOrderByWithAggregationInput = {
    id?: SortOrder
    folderId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    grantedByUserId?: SortOrderInput | SortOrder
    _count?: FolderPermissionCountOrderByAggregateInput
    _max?: FolderPermissionMaxOrderByAggregateInput
    _min?: FolderPermissionMinOrderByAggregateInput
  }

  export type FolderPermissionScalarWhereWithAggregatesInput = {
    AND?: FolderPermissionScalarWhereWithAggregatesInput | FolderPermissionScalarWhereWithAggregatesInput[]
    OR?: FolderPermissionScalarWhereWithAggregatesInput[]
    NOT?: FolderPermissionScalarWhereWithAggregatesInput | FolderPermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FolderPermission"> | string
    folderId?: StringWithAggregatesFilter<"FolderPermission"> | string
    sharedWithUserId?: StringWithAggregatesFilter<"FolderPermission"> | string
    permissionLevel?: StringWithAggregatesFilter<"FolderPermission"> | string
    sharedAt?: DateTimeWithAggregatesFilter<"FolderPermission"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"FolderPermission"> | Date | string | null
    grantedByUserId?: StringNullableWithAggregatesFilter<"FolderPermission"> | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    department?: DepartmentCreateNestedOneWithoutDocumentsInput
    folder?: FolderCreateNestedOneWithoutDocumentsInput
    labels?: LabelCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    labels?: LabelUncheckedCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: DepartmentUpdateOneWithoutDocumentsNestedInput
    folder?: FolderUpdateOneWithoutDocumentsNestedInput
    labels?: LabelUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labels?: LabelUncheckedUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LabelCreateInput = {
    id?: string
    name: string
    userId: string
    documents?: DocumentCreateNestedManyWithoutLabelsInput
  }

  export type LabelUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    documents?: DocumentUncheckedCreateNestedManyWithoutLabelsInput
  }

  export type LabelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUpdateManyWithoutLabelsNestedInput
  }

  export type LabelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documents?: DocumentUncheckedUpdateManyWithoutLabelsNestedInput
  }

  export type LabelCreateManyInput = {
    id?: string
    name: string
    userId: string
  }

  export type LabelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LabelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    id?: string
    userId: string
    action: string
    metadata?: string | null
    ip?: string | null
    userAgent?: string | null
    departmentId?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    metadata?: string | null
    ip?: string | null
    userAgent?: string | null
    departmentId?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: string
    metadata?: string | null
    ip?: string | null
    userAgent?: string | null
    departmentId?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSettingsCreateInput = {
    id?: string
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }

  export type TenantSettingsUncheckedCreateInput = {
    id?: string
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }

  export type TenantSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watermarkingEnabled?: BoolFieldUpdateOperationsInput | boolean
    antiScreenshotBlur?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watermarkingEnabled?: BoolFieldUpdateOperationsInput | boolean
    antiScreenshotBlur?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantSettingsCreateManyInput = {
    id?: string
    watermarkingEnabled?: boolean
    antiScreenshotBlur?: boolean
  }

  export type TenantSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    watermarkingEnabled?: BoolFieldUpdateOperationsInput | boolean
    antiScreenshotBlur?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TenantSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    watermarkingEnabled?: BoolFieldUpdateOperationsInput | boolean
    antiScreenshotBlur?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentPermissionCreateInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    document: DocumentCreateNestedOneWithoutPermissionsInput
  }

  export type DocumentPermissionUncheckedCreateInput = {
    id?: string
    documentId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentPermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    document?: DocumentUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type DocumentPermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentPermissionCreateManyInput = {
    id?: string
    documentId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentPermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentPermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    departments?: UserDepartmentCreateNestedManyWithoutUserInput
    sessions?: ActiveSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    departments?: UserDepartmentUncheckedCreateNestedManyWithoutUserInput
    sessions?: ActiveSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: UserDepartmentUpdateManyWithoutUserNestedInput
    sessions?: ActiveSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: UserDepartmentUncheckedUpdateManyWithoutUserNestedInput
    sessions?: ActiveSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActiveSessionCreateInput = {
    id?: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type ActiveSessionUncheckedCreateInput = {
    id?: string
    user_id: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
  }

  export type ActiveSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type ActiveSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveSessionCreateManyInput = {
    id?: string
    user_id: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
  }

  export type ActiveSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogCreateInput = {
    id?: string
    action: string
    ip_address?: string | null
    user_id?: string | null
    created_at?: Date | string
  }

  export type SecurityLogUncheckedCreateInput = {
    id?: string
    action: string
    ip_address?: string | null
    user_id?: string | null
    created_at?: Date | string
  }

  export type SecurityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogCreateManyInput = {
    id?: string
    action: string
    ip_address?: string | null
    user_id?: string | null
    created_at?: Date | string
  }

  export type SecurityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentCreateNestedManyWithoutDepartmentInput
    documents?: DocumentCreateNestedManyWithoutDepartmentInput
    folders?: FolderCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentUncheckedCreateNestedManyWithoutDepartmentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutDepartmentInput
    folders?: FolderUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUpdateManyWithoutDepartmentNestedInput
    documents?: DocumentUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserDepartmentCreateInput = {
    role?: string
    isPrimary?: boolean
    permissions?: string
    user: UserCreateNestedOneWithoutDepartmentsInput
    department: DepartmentCreateNestedOneWithoutUsersInput
  }

  export type UserDepartmentUncheckedCreateInput = {
    userId: string
    departmentId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type UserDepartmentUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutDepartmentsNestedInput
    department?: DepartmentUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserDepartmentUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type UserDepartmentCreateManyInput = {
    userId: string
    departmentId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type UserDepartmentUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type UserDepartmentUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type FolderCreateInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    department: DepartmentCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    documents?: DocumentCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    documents?: DocumentUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderCreateManyInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
  }

  export type FolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderPermissionCreateInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
    folder: FolderCreateNestedOneWithoutPermissionsInput
  }

  export type FolderPermissionUncheckedCreateInput = {
    id?: string
    folderId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
  }

  export type FolderPermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    folder?: FolderUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type FolderPermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderPermissionCreateManyInput = {
    id?: string
    folderId: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
  }

  export type FolderPermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderPermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DepartmentNullableScalarRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type FolderNullableScalarRelationFilter = {
    is?: FolderWhereInput | null
    isNot?: FolderWhereInput | null
  }

  export type LabelListRelationFilter = {
    every?: LabelWhereInput
    some?: LabelWhereInput
    none?: LabelWhereInput
  }

  export type DocumentPermissionListRelationFilter = {
    every?: DocumentPermissionWhereInput
    some?: DocumentPermissionWhereInput
    none?: DocumentPermissionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LabelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    folderId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
    searchTokens?: SortOrder
    indexedAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    folderId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
    searchTokens?: SortOrder
    indexedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    path?: SortOrder
    mimeType?: SortOrder
    userId?: SortOrder
    departmentId?: SortOrder
    folderId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
    searchTokens?: SortOrder
    indexedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LabelNameUserIdCompoundUniqueInput = {
    name: string
    userId: string
  }

  export type LabelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type LabelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type LabelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    metadata?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    departmentId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    metadata?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    departmentId?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    metadata?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    departmentId?: SortOrder
    timestamp?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TenantSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    watermarkingEnabled?: SortOrder
    antiScreenshotBlur?: SortOrder
  }

  export type TenantSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    watermarkingEnabled?: SortOrder
    antiScreenshotBlur?: SortOrder
  }

  export type TenantSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    watermarkingEnabled?: SortOrder
    antiScreenshotBlur?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentPermissionDocumentIdSharedWithUserIdCompoundUniqueInput = {
    documentId: string
    sharedWithUserId: string
  }

  export type DocumentPermissionCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DocumentPermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DocumentPermissionMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type UserDepartmentListRelationFilter = {
    every?: UserDepartmentWhereInput
    some?: UserDepartmentWhereInput
    none?: UserDepartmentWhereInput
  }

  export type ActiveSessionListRelationFilter = {
    every?: ActiveSessionWhereInput
    some?: ActiveSessionWhereInput
    none?: ActiveSessionWhereInput
  }

  export type UserDepartmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActiveSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password_hash?: SortOrder
    last_login_at?: SortOrder
    last_login_ip?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password_hash?: SortOrder
    last_login_at?: SortOrder
    last_login_ip?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password_hash?: SortOrder
    last_login_at?: SortOrder
    last_login_ip?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ActiveSessionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type ActiveSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type ActiveSessionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token_hash?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
  }

  export type SecurityLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    ip_address?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type SecurityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    ip_address?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type SecurityLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    ip_address?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type FolderListRelationFilter = {
    every?: FolderWhereInput
    some?: FolderWhereInput
    none?: FolderWhereInput
  }

  export type FolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    defaultPermissionPreset?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    defaultPermissionPreset?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tenantId?: SortOrder
    defaultPermissionPreset?: SortOrder
  }

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type UserDepartmentUserIdDepartmentIdCompoundUniqueInput = {
    userId: string
    departmentId: string
  }

  export type UserDepartmentCountOrderByAggregateInput = {
    userId?: SortOrder
    departmentId?: SortOrder
    role?: SortOrder
    isPrimary?: SortOrder
    permissions?: SortOrder
  }

  export type UserDepartmentMaxOrderByAggregateInput = {
    userId?: SortOrder
    departmentId?: SortOrder
    role?: SortOrder
    isPrimary?: SortOrder
    permissions?: SortOrder
  }

  export type UserDepartmentMinOrderByAggregateInput = {
    userId?: SortOrder
    departmentId?: SortOrder
    role?: SortOrder
    isPrimary?: SortOrder
    permissions?: SortOrder
  }

  export type FolderPermissionListRelationFilter = {
    every?: FolderPermissionWhereInput
    some?: FolderPermissionWhereInput
    none?: FolderPermissionWhereInput
  }

  export type FolderPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FolderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
  }

  export type FolderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
  }

  export type FolderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    deletedByUserId?: SortOrder
  }

  export type FolderScalarRelationFilter = {
    is?: FolderWhereInput
    isNot?: FolderWhereInput
  }

  export type FolderPermissionFolderIdSharedWithUserIdCompoundUniqueInput = {
    folderId: string
    sharedWithUserId: string
  }

  export type FolderPermissionCountOrderByAggregateInput = {
    id?: SortOrder
    folderId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
    grantedByUserId?: SortOrder
  }

  export type FolderPermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    folderId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
    grantedByUserId?: SortOrder
  }

  export type FolderPermissionMinOrderByAggregateInput = {
    id?: SortOrder
    folderId?: SortOrder
    sharedWithUserId?: SortOrder
    permissionLevel?: SortOrder
    sharedAt?: SortOrder
    expiresAt?: SortOrder
    grantedByUserId?: SortOrder
  }

  export type DepartmentCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<DepartmentCreateWithoutDocumentsInput, DepartmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutDocumentsInput
    connect?: DepartmentWhereUniqueInput
  }

  export type FolderCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<FolderCreateWithoutDocumentsInput, FolderUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: FolderCreateOrConnectWithoutDocumentsInput
    connect?: FolderWhereUniqueInput
  }

  export type LabelCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput> | LabelCreateWithoutDocumentsInput[] | LabelUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutDocumentsInput | LabelCreateOrConnectWithoutDocumentsInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type DocumentPermissionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput> | DocumentPermissionCreateWithoutDocumentInput[] | DocumentPermissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPermissionCreateOrConnectWithoutDocumentInput | DocumentPermissionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentPermissionCreateManyDocumentInputEnvelope
    connect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
  }

  export type LabelUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput> | LabelCreateWithoutDocumentsInput[] | LabelUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutDocumentsInput | LabelCreateOrConnectWithoutDocumentsInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type DocumentPermissionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput> | DocumentPermissionCreateWithoutDocumentInput[] | DocumentPermissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPermissionCreateOrConnectWithoutDocumentInput | DocumentPermissionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentPermissionCreateManyDocumentInputEnvelope
    connect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DepartmentUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<DepartmentCreateWithoutDocumentsInput, DepartmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutDocumentsInput
    upsert?: DepartmentUpsertWithoutDocumentsInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutDocumentsInput, DepartmentUpdateWithoutDocumentsInput>, DepartmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type FolderUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<FolderCreateWithoutDocumentsInput, FolderUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: FolderCreateOrConnectWithoutDocumentsInput
    upsert?: FolderUpsertWithoutDocumentsInput
    disconnect?: FolderWhereInput | boolean
    delete?: FolderWhereInput | boolean
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutDocumentsInput, FolderUpdateWithoutDocumentsInput>, FolderUncheckedUpdateWithoutDocumentsInput>
  }

  export type LabelUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput> | LabelCreateWithoutDocumentsInput[] | LabelUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutDocumentsInput | LabelCreateOrConnectWithoutDocumentsInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutDocumentsInput | LabelUpsertWithWhereUniqueWithoutDocumentsInput[]
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutDocumentsInput | LabelUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutDocumentsInput | LabelUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type DocumentPermissionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput> | DocumentPermissionCreateWithoutDocumentInput[] | DocumentPermissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPermissionCreateOrConnectWithoutDocumentInput | DocumentPermissionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentPermissionUpsertWithWhereUniqueWithoutDocumentInput | DocumentPermissionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentPermissionCreateManyDocumentInputEnvelope
    set?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    disconnect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    delete?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    connect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    update?: DocumentPermissionUpdateWithWhereUniqueWithoutDocumentInput | DocumentPermissionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentPermissionUpdateManyWithWhereWithoutDocumentInput | DocumentPermissionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentPermissionScalarWhereInput | DocumentPermissionScalarWhereInput[]
  }

  export type LabelUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput> | LabelCreateWithoutDocumentsInput[] | LabelUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutDocumentsInput | LabelCreateOrConnectWithoutDocumentsInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutDocumentsInput | LabelUpsertWithWhereUniqueWithoutDocumentsInput[]
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutDocumentsInput | LabelUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutDocumentsInput | LabelUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type DocumentPermissionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput> | DocumentPermissionCreateWithoutDocumentInput[] | DocumentPermissionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentPermissionCreateOrConnectWithoutDocumentInput | DocumentPermissionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentPermissionUpsertWithWhereUniqueWithoutDocumentInput | DocumentPermissionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentPermissionCreateManyDocumentInputEnvelope
    set?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    disconnect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    delete?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    connect?: DocumentPermissionWhereUniqueInput | DocumentPermissionWhereUniqueInput[]
    update?: DocumentPermissionUpdateWithWhereUniqueWithoutDocumentInput | DocumentPermissionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentPermissionUpdateManyWithWhereWithoutDocumentInput | DocumentPermissionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentPermissionScalarWhereInput | DocumentPermissionScalarWhereInput[]
  }

  export type DocumentCreateNestedManyWithoutLabelsInput = {
    create?: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput> | DocumentCreateWithoutLabelsInput[] | DocumentUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLabelsInput | DocumentCreateOrConnectWithoutLabelsInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutLabelsInput = {
    create?: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput> | DocumentCreateWithoutLabelsInput[] | DocumentUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLabelsInput | DocumentCreateOrConnectWithoutLabelsInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUpdateManyWithoutLabelsNestedInput = {
    create?: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput> | DocumentCreateWithoutLabelsInput[] | DocumentUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLabelsInput | DocumentCreateOrConnectWithoutLabelsInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLabelsInput | DocumentUpsertWithWhereUniqueWithoutLabelsInput[]
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLabelsInput | DocumentUpdateWithWhereUniqueWithoutLabelsInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLabelsInput | DocumentUpdateManyWithWhereWithoutLabelsInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutLabelsNestedInput = {
    create?: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput> | DocumentCreateWithoutLabelsInput[] | DocumentUncheckedCreateWithoutLabelsInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutLabelsInput | DocumentCreateOrConnectWithoutLabelsInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutLabelsInput | DocumentUpsertWithWhereUniqueWithoutLabelsInput[]
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutLabelsInput | DocumentUpdateWithWhereUniqueWithoutLabelsInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutLabelsInput | DocumentUpdateManyWithWhereWithoutLabelsInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DocumentCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<DocumentCreateWithoutPermissionsInput, DocumentUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPermissionsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<DocumentCreateWithoutPermissionsInput, DocumentUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPermissionsInput
    upsert?: DocumentUpsertWithoutPermissionsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutPermissionsInput, DocumentUpdateWithoutPermissionsInput>, DocumentUncheckedUpdateWithoutPermissionsInput>
  }

  export type UserDepartmentCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput> | UserDepartmentCreateWithoutUserInput[] | UserDepartmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutUserInput | UserDepartmentCreateOrConnectWithoutUserInput[]
    createMany?: UserDepartmentCreateManyUserInputEnvelope
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
  }

  export type ActiveSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput> | ActiveSessionCreateWithoutUserInput[] | ActiveSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveSessionCreateOrConnectWithoutUserInput | ActiveSessionCreateOrConnectWithoutUserInput[]
    createMany?: ActiveSessionCreateManyUserInputEnvelope
    connect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
  }

  export type UserDepartmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput> | UserDepartmentCreateWithoutUserInput[] | UserDepartmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutUserInput | UserDepartmentCreateOrConnectWithoutUserInput[]
    createMany?: UserDepartmentCreateManyUserInputEnvelope
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
  }

  export type ActiveSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput> | ActiveSessionCreateWithoutUserInput[] | ActiveSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveSessionCreateOrConnectWithoutUserInput | ActiveSessionCreateOrConnectWithoutUserInput[]
    createMany?: ActiveSessionCreateManyUserInputEnvelope
    connect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
  }

  export type UserDepartmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput> | UserDepartmentCreateWithoutUserInput[] | UserDepartmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutUserInput | UserDepartmentCreateOrConnectWithoutUserInput[]
    upsert?: UserDepartmentUpsertWithWhereUniqueWithoutUserInput | UserDepartmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDepartmentCreateManyUserInputEnvelope
    set?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    disconnect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    delete?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    update?: UserDepartmentUpdateWithWhereUniqueWithoutUserInput | UserDepartmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDepartmentUpdateManyWithWhereWithoutUserInput | UserDepartmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
  }

  export type ActiveSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput> | ActiveSessionCreateWithoutUserInput[] | ActiveSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveSessionCreateOrConnectWithoutUserInput | ActiveSessionCreateOrConnectWithoutUserInput[]
    upsert?: ActiveSessionUpsertWithWhereUniqueWithoutUserInput | ActiveSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveSessionCreateManyUserInputEnvelope
    set?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    disconnect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    delete?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    connect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    update?: ActiveSessionUpdateWithWhereUniqueWithoutUserInput | ActiveSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveSessionUpdateManyWithWhereWithoutUserInput | ActiveSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveSessionScalarWhereInput | ActiveSessionScalarWhereInput[]
  }

  export type UserDepartmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput> | UserDepartmentCreateWithoutUserInput[] | UserDepartmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutUserInput | UserDepartmentCreateOrConnectWithoutUserInput[]
    upsert?: UserDepartmentUpsertWithWhereUniqueWithoutUserInput | UserDepartmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDepartmentCreateManyUserInputEnvelope
    set?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    disconnect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    delete?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    update?: UserDepartmentUpdateWithWhereUniqueWithoutUserInput | UserDepartmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDepartmentUpdateManyWithWhereWithoutUserInput | UserDepartmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
  }

  export type ActiveSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput> | ActiveSessionCreateWithoutUserInput[] | ActiveSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveSessionCreateOrConnectWithoutUserInput | ActiveSessionCreateOrConnectWithoutUserInput[]
    upsert?: ActiveSessionUpsertWithWhereUniqueWithoutUserInput | ActiveSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveSessionCreateManyUserInputEnvelope
    set?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    disconnect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    delete?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    connect?: ActiveSessionWhereUniqueInput | ActiveSessionWhereUniqueInput[]
    update?: ActiveSessionUpdateWithWhereUniqueWithoutUserInput | ActiveSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveSessionUpdateManyWithWhereWithoutUserInput | ActiveSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveSessionScalarWhereInput | ActiveSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserDepartmentCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput> | UserDepartmentCreateWithoutDepartmentInput[] | UserDepartmentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutDepartmentInput | UserDepartmentCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserDepartmentCreateManyDepartmentInputEnvelope
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput> | DocumentCreateWithoutDepartmentInput[] | DocumentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutDepartmentInput | DocumentCreateOrConnectWithoutDepartmentInput[]
    createMany?: DocumentCreateManyDepartmentInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FolderCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput> | FolderCreateWithoutDepartmentInput[] | FolderUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutDepartmentInput | FolderCreateOrConnectWithoutDepartmentInput[]
    createMany?: FolderCreateManyDepartmentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type UserDepartmentUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput> | UserDepartmentCreateWithoutDepartmentInput[] | UserDepartmentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutDepartmentInput | UserDepartmentCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserDepartmentCreateManyDepartmentInputEnvelope
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput> | DocumentCreateWithoutDepartmentInput[] | DocumentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutDepartmentInput | DocumentCreateOrConnectWithoutDepartmentInput[]
    createMany?: DocumentCreateManyDepartmentInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FolderUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput> | FolderCreateWithoutDepartmentInput[] | FolderUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutDepartmentInput | FolderCreateOrConnectWithoutDepartmentInput[]
    createMany?: FolderCreateManyDepartmentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type UserDepartmentUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput> | UserDepartmentCreateWithoutDepartmentInput[] | UserDepartmentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutDepartmentInput | UserDepartmentCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput | UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserDepartmentCreateManyDepartmentInputEnvelope
    set?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    disconnect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    delete?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    update?: UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput | UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserDepartmentUpdateManyWithWhereWithoutDepartmentInput | UserDepartmentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput> | DocumentCreateWithoutDepartmentInput[] | DocumentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutDepartmentInput | DocumentCreateOrConnectWithoutDepartmentInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutDepartmentInput | DocumentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: DocumentCreateManyDepartmentInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutDepartmentInput | DocumentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutDepartmentInput | DocumentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FolderUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput> | FolderCreateWithoutDepartmentInput[] | FolderUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutDepartmentInput | FolderCreateOrConnectWithoutDepartmentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutDepartmentInput | FolderUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: FolderCreateManyDepartmentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutDepartmentInput | FolderUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutDepartmentInput | FolderUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type UserDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput> | UserDepartmentCreateWithoutDepartmentInput[] | UserDepartmentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserDepartmentCreateOrConnectWithoutDepartmentInput | UserDepartmentCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput | UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserDepartmentCreateManyDepartmentInputEnvelope
    set?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    disconnect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    delete?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    connect?: UserDepartmentWhereUniqueInput | UserDepartmentWhereUniqueInput[]
    update?: UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput | UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserDepartmentUpdateManyWithWhereWithoutDepartmentInput | UserDepartmentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput> | DocumentCreateWithoutDepartmentInput[] | DocumentUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutDepartmentInput | DocumentCreateOrConnectWithoutDepartmentInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutDepartmentInput | DocumentUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: DocumentCreateManyDepartmentInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutDepartmentInput | DocumentUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutDepartmentInput | DocumentUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FolderUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput> | FolderCreateWithoutDepartmentInput[] | FolderUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutDepartmentInput | FolderCreateOrConnectWithoutDepartmentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutDepartmentInput | FolderUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: FolderCreateManyDepartmentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutDepartmentInput | FolderUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutDepartmentInput | FolderUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDepartmentsInput = {
    create?: XOR<UserCreateWithoutDepartmentsInput, UserUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentsInput
    connect?: UserWhereUniqueInput
  }

  export type DepartmentCreateNestedOneWithoutUsersInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    connect?: DepartmentWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDepartmentsNestedInput = {
    create?: XOR<UserCreateWithoutDepartmentsInput, UserUncheckedCreateWithoutDepartmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentsInput
    upsert?: UserUpsertWithoutDepartmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDepartmentsInput, UserUpdateWithoutDepartmentsInput>, UserUncheckedUpdateWithoutDepartmentsInput>
  }

  export type DepartmentUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    upsert?: DepartmentUpsertWithoutUsersInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutUsersInput, DepartmentUpdateWithoutUsersInput>, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type DepartmentCreateNestedOneWithoutFoldersInput = {
    create?: XOR<DepartmentCreateWithoutFoldersInput, DepartmentUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutFoldersInput
    connect?: DepartmentWhereUniqueInput
  }

  export type FolderCreateNestedOneWithoutChildrenInput = {
    create?: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: FolderCreateOrConnectWithoutChildrenInput
    connect?: FolderWhereUniqueInput
  }

  export type FolderCreateNestedManyWithoutParentInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutFolderInput = {
    create?: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput> | DocumentCreateWithoutFolderInput[] | DocumentUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFolderInput | DocumentCreateOrConnectWithoutFolderInput[]
    createMany?: DocumentCreateManyFolderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FolderPermissionCreateNestedManyWithoutFolderInput = {
    create?: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput> | FolderPermissionCreateWithoutFolderInput[] | FolderPermissionUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FolderPermissionCreateOrConnectWithoutFolderInput | FolderPermissionCreateOrConnectWithoutFolderInput[]
    createMany?: FolderPermissionCreateManyFolderInputEnvelope
    connect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
  }

  export type FolderUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput> | DocumentCreateWithoutFolderInput[] | DocumentUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFolderInput | DocumentCreateOrConnectWithoutFolderInput[]
    createMany?: DocumentCreateManyFolderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FolderPermissionUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput> | FolderPermissionCreateWithoutFolderInput[] | FolderPermissionUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FolderPermissionCreateOrConnectWithoutFolderInput | FolderPermissionCreateOrConnectWithoutFolderInput[]
    createMany?: FolderPermissionCreateManyFolderInputEnvelope
    connect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
  }

  export type DepartmentUpdateOneRequiredWithoutFoldersNestedInput = {
    create?: XOR<DepartmentCreateWithoutFoldersInput, DepartmentUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutFoldersInput
    upsert?: DepartmentUpsertWithoutFoldersInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutFoldersInput, DepartmentUpdateWithoutFoldersInput>, DepartmentUncheckedUpdateWithoutFoldersInput>
  }

  export type FolderUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: FolderCreateOrConnectWithoutChildrenInput
    upsert?: FolderUpsertWithoutChildrenInput
    disconnect?: FolderWhereInput | boolean
    delete?: FolderWhereInput | boolean
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutChildrenInput, FolderUpdateWithoutChildrenInput>, FolderUncheckedUpdateWithoutChildrenInput>
  }

  export type FolderUpdateManyWithoutParentNestedInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutParentInput | FolderUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutParentInput | FolderUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutParentInput | FolderUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutFolderNestedInput = {
    create?: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput> | DocumentCreateWithoutFolderInput[] | DocumentUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFolderInput | DocumentCreateOrConnectWithoutFolderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutFolderInput | DocumentUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: DocumentCreateManyFolderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutFolderInput | DocumentUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutFolderInput | DocumentUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FolderPermissionUpdateManyWithoutFolderNestedInput = {
    create?: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput> | FolderPermissionCreateWithoutFolderInput[] | FolderPermissionUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FolderPermissionCreateOrConnectWithoutFolderInput | FolderPermissionCreateOrConnectWithoutFolderInput[]
    upsert?: FolderPermissionUpsertWithWhereUniqueWithoutFolderInput | FolderPermissionUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: FolderPermissionCreateManyFolderInputEnvelope
    set?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    disconnect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    delete?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    connect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    update?: FolderPermissionUpdateWithWhereUniqueWithoutFolderInput | FolderPermissionUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: FolderPermissionUpdateManyWithWhereWithoutFolderInput | FolderPermissionUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: FolderPermissionScalarWhereInput | FolderPermissionScalarWhereInput[]
  }

  export type FolderUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutParentInput | FolderUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutParentInput | FolderUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutParentInput | FolderUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput> | DocumentCreateWithoutFolderInput[] | DocumentUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutFolderInput | DocumentCreateOrConnectWithoutFolderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutFolderInput | DocumentUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: DocumentCreateManyFolderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutFolderInput | DocumentUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutFolderInput | DocumentUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput> | FolderPermissionCreateWithoutFolderInput[] | FolderPermissionUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FolderPermissionCreateOrConnectWithoutFolderInput | FolderPermissionCreateOrConnectWithoutFolderInput[]
    upsert?: FolderPermissionUpsertWithWhereUniqueWithoutFolderInput | FolderPermissionUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: FolderPermissionCreateManyFolderInputEnvelope
    set?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    disconnect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    delete?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    connect?: FolderPermissionWhereUniqueInput | FolderPermissionWhereUniqueInput[]
    update?: FolderPermissionUpdateWithWhereUniqueWithoutFolderInput | FolderPermissionUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: FolderPermissionUpdateManyWithWhereWithoutFolderInput | FolderPermissionUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: FolderPermissionScalarWhereInput | FolderPermissionScalarWhereInput[]
  }

  export type FolderCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<FolderCreateWithoutPermissionsInput, FolderUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: FolderCreateOrConnectWithoutPermissionsInput
    connect?: FolderWhereUniqueInput
  }

  export type FolderUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<FolderCreateWithoutPermissionsInput, FolderUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: FolderCreateOrConnectWithoutPermissionsInput
    upsert?: FolderUpsertWithoutPermissionsInput
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutPermissionsInput, FolderUpdateWithoutPermissionsInput>, FolderUncheckedUpdateWithoutPermissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DepartmentCreateWithoutDocumentsInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentCreateNestedManyWithoutDepartmentInput
    folders?: FolderCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentUncheckedCreateNestedManyWithoutDepartmentInput
    folders?: FolderUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutDocumentsInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutDocumentsInput, DepartmentUncheckedCreateWithoutDocumentsInput>
  }

  export type FolderCreateWithoutDocumentsInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    department: DepartmentCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    permissions?: FolderPermissionCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    permissions?: FolderPermissionUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutDocumentsInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutDocumentsInput, FolderUncheckedCreateWithoutDocumentsInput>
  }

  export type LabelCreateWithoutDocumentsInput = {
    id?: string
    name: string
    userId: string
  }

  export type LabelUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    userId: string
  }

  export type LabelCreateOrConnectWithoutDocumentsInput = {
    where: LabelWhereUniqueInput
    create: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentPermissionCreateWithoutDocumentInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentPermissionUncheckedCreateWithoutDocumentInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentPermissionCreateOrConnectWithoutDocumentInput = {
    where: DocumentPermissionWhereUniqueInput
    create: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentPermissionCreateManyDocumentInputEnvelope = {
    data: DocumentPermissionCreateManyDocumentInput | DocumentPermissionCreateManyDocumentInput[]
  }

  export type DepartmentUpsertWithoutDocumentsInput = {
    update: XOR<DepartmentUpdateWithoutDocumentsInput, DepartmentUncheckedUpdateWithoutDocumentsInput>
    create: XOR<DepartmentCreateWithoutDocumentsInput, DepartmentUncheckedCreateWithoutDocumentsInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutDocumentsInput, DepartmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type DepartmentUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type FolderUpsertWithoutDocumentsInput = {
    update: XOR<FolderUpdateWithoutDocumentsInput, FolderUncheckedUpdateWithoutDocumentsInput>
    create: XOR<FolderCreateWithoutDocumentsInput, FolderUncheckedCreateWithoutDocumentsInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutDocumentsInput, FolderUncheckedUpdateWithoutDocumentsInput>
  }

  export type FolderUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    permissions?: FolderPermissionUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    permissions?: FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type LabelUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: LabelWhereUniqueInput
    update: XOR<LabelUpdateWithoutDocumentsInput, LabelUncheckedUpdateWithoutDocumentsInput>
    create: XOR<LabelCreateWithoutDocumentsInput, LabelUncheckedCreateWithoutDocumentsInput>
  }

  export type LabelUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: LabelWhereUniqueInput
    data: XOR<LabelUpdateWithoutDocumentsInput, LabelUncheckedUpdateWithoutDocumentsInput>
  }

  export type LabelUpdateManyWithWhereWithoutDocumentsInput = {
    where: LabelScalarWhereInput
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type LabelScalarWhereInput = {
    AND?: LabelScalarWhereInput | LabelScalarWhereInput[]
    OR?: LabelScalarWhereInput[]
    NOT?: LabelScalarWhereInput | LabelScalarWhereInput[]
    id?: StringFilter<"Label"> | string
    name?: StringFilter<"Label"> | string
    userId?: StringFilter<"Label"> | string
  }

  export type DocumentPermissionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentPermissionWhereUniqueInput
    update: XOR<DocumentPermissionUpdateWithoutDocumentInput, DocumentPermissionUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentPermissionCreateWithoutDocumentInput, DocumentPermissionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentPermissionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentPermissionWhereUniqueInput
    data: XOR<DocumentPermissionUpdateWithoutDocumentInput, DocumentPermissionUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentPermissionUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentPermissionScalarWhereInput
    data: XOR<DocumentPermissionUpdateManyMutationInput, DocumentPermissionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentPermissionScalarWhereInput = {
    AND?: DocumentPermissionScalarWhereInput | DocumentPermissionScalarWhereInput[]
    OR?: DocumentPermissionScalarWhereInput[]
    NOT?: DocumentPermissionScalarWhereInput | DocumentPermissionScalarWhereInput[]
    id?: StringFilter<"DocumentPermission"> | string
    documentId?: StringFilter<"DocumentPermission"> | string
    sharedWithUserId?: StringFilter<"DocumentPermission"> | string
    permissionLevel?: StringFilter<"DocumentPermission"> | string
    sharedAt?: DateTimeFilter<"DocumentPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"DocumentPermission"> | Date | string | null
  }

  export type DocumentCreateWithoutLabelsInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    department?: DepartmentCreateNestedOneWithoutDocumentsInput
    folder?: FolderCreateNestedOneWithoutDocumentsInput
    permissions?: DocumentPermissionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutLabelsInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    permissions?: DocumentPermissionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutLabelsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutLabelsInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutLabelsInput, DocumentUncheckedUpdateWithoutLabelsInput>
    create: XOR<DocumentCreateWithoutLabelsInput, DocumentUncheckedCreateWithoutLabelsInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutLabelsInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutLabelsInput, DocumentUncheckedUpdateWithoutLabelsInput>
  }

  export type DocumentUpdateManyWithWhereWithoutLabelsInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutLabelsInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    name?: StringFilter<"Document"> | string
    displayName?: StringNullableFilter<"Document"> | string | null
    path?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    userId?: StringFilter<"Document"> | string
    departmentId?: StringNullableFilter<"Document"> | string | null
    folderId?: StringNullableFilter<"Document"> | string | null
    status?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Document"> | string | null
    searchTokens?: StringNullableFilter<"Document"> | string | null
    indexedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
  }

  export type DocumentCreateWithoutPermissionsInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    department?: DepartmentCreateNestedOneWithoutDocumentsInput
    folder?: FolderCreateNestedOneWithoutDocumentsInput
    labels?: LabelCreateNestedManyWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    labels?: LabelUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type DocumentCreateOrConnectWithoutPermissionsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutPermissionsInput, DocumentUncheckedCreateWithoutPermissionsInput>
  }

  export type DocumentUpsertWithoutPermissionsInput = {
    update: XOR<DocumentUpdateWithoutPermissionsInput, DocumentUncheckedUpdateWithoutPermissionsInput>
    create: XOR<DocumentCreateWithoutPermissionsInput, DocumentUncheckedCreateWithoutPermissionsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutPermissionsInput, DocumentUncheckedUpdateWithoutPermissionsInput>
  }

  export type DocumentUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: DepartmentUpdateOneWithoutDocumentsNestedInput
    folder?: FolderUpdateOneWithoutDocumentsNestedInput
    labels?: LabelUpdateManyWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labels?: LabelUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type UserDepartmentCreateWithoutUserInput = {
    role?: string
    isPrimary?: boolean
    permissions?: string
    department: DepartmentCreateNestedOneWithoutUsersInput
  }

  export type UserDepartmentUncheckedCreateWithoutUserInput = {
    departmentId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type UserDepartmentCreateOrConnectWithoutUserInput = {
    where: UserDepartmentWhereUniqueInput
    create: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput>
  }

  export type UserDepartmentCreateManyUserInputEnvelope = {
    data: UserDepartmentCreateManyUserInput | UserDepartmentCreateManyUserInput[]
  }

  export type ActiveSessionCreateWithoutUserInput = {
    id?: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
  }

  export type ActiveSessionUncheckedCreateWithoutUserInput = {
    id?: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
  }

  export type ActiveSessionCreateOrConnectWithoutUserInput = {
    where: ActiveSessionWhereUniqueInput
    create: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput>
  }

  export type ActiveSessionCreateManyUserInputEnvelope = {
    data: ActiveSessionCreateManyUserInput | ActiveSessionCreateManyUserInput[]
  }

  export type UserDepartmentUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDepartmentWhereUniqueInput
    update: XOR<UserDepartmentUpdateWithoutUserInput, UserDepartmentUncheckedUpdateWithoutUserInput>
    create: XOR<UserDepartmentCreateWithoutUserInput, UserDepartmentUncheckedCreateWithoutUserInput>
  }

  export type UserDepartmentUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDepartmentWhereUniqueInput
    data: XOR<UserDepartmentUpdateWithoutUserInput, UserDepartmentUncheckedUpdateWithoutUserInput>
  }

  export type UserDepartmentUpdateManyWithWhereWithoutUserInput = {
    where: UserDepartmentScalarWhereInput
    data: XOR<UserDepartmentUpdateManyMutationInput, UserDepartmentUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDepartmentScalarWhereInput = {
    AND?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
    OR?: UserDepartmentScalarWhereInput[]
    NOT?: UserDepartmentScalarWhereInput | UserDepartmentScalarWhereInput[]
    userId?: StringFilter<"UserDepartment"> | string
    departmentId?: StringFilter<"UserDepartment"> | string
    role?: StringFilter<"UserDepartment"> | string
    isPrimary?: BoolFilter<"UserDepartment"> | boolean
    permissions?: StringFilter<"UserDepartment"> | string
  }

  export type ActiveSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: ActiveSessionWhereUniqueInput
    update: XOR<ActiveSessionUpdateWithoutUserInput, ActiveSessionUncheckedUpdateWithoutUserInput>
    create: XOR<ActiveSessionCreateWithoutUserInput, ActiveSessionUncheckedCreateWithoutUserInput>
  }

  export type ActiveSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: ActiveSessionWhereUniqueInput
    data: XOR<ActiveSessionUpdateWithoutUserInput, ActiveSessionUncheckedUpdateWithoutUserInput>
  }

  export type ActiveSessionUpdateManyWithWhereWithoutUserInput = {
    where: ActiveSessionScalarWhereInput
    data: XOR<ActiveSessionUpdateManyMutationInput, ActiveSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type ActiveSessionScalarWhereInput = {
    AND?: ActiveSessionScalarWhereInput | ActiveSessionScalarWhereInput[]
    OR?: ActiveSessionScalarWhereInput[]
    NOT?: ActiveSessionScalarWhereInput | ActiveSessionScalarWhereInput[]
    id?: StringFilter<"ActiveSession"> | string
    user_id?: StringFilter<"ActiveSession"> | string
    token_hash?: StringFilter<"ActiveSession"> | string
    ip_address?: StringNullableFilter<"ActiveSession"> | string | null
    user_agent?: StringNullableFilter<"ActiveSession"> | string | null
    created_at?: DateTimeFilter<"ActiveSession"> | Date | string
    expires_at?: DateTimeFilter<"ActiveSession"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    departments?: UserDepartmentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    departments?: UserDepartmentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: UserDepartmentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    departments?: UserDepartmentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDepartmentCreateWithoutDepartmentInput = {
    role?: string
    isPrimary?: boolean
    permissions?: string
    user: UserCreateNestedOneWithoutDepartmentsInput
  }

  export type UserDepartmentUncheckedCreateWithoutDepartmentInput = {
    userId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type UserDepartmentCreateOrConnectWithoutDepartmentInput = {
    where: UserDepartmentWhereUniqueInput
    create: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput>
  }

  export type UserDepartmentCreateManyDepartmentInputEnvelope = {
    data: UserDepartmentCreateManyDepartmentInput | UserDepartmentCreateManyDepartmentInput[]
  }

  export type DocumentCreateWithoutDepartmentInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    folder?: FolderCreateNestedOneWithoutDocumentsInput
    labels?: LabelCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutDepartmentInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    labels?: LabelUncheckedCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutDepartmentInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput>
  }

  export type DocumentCreateManyDepartmentInputEnvelope = {
    data: DocumentCreateManyDepartmentInput | DocumentCreateManyDepartmentInput[]
  }

  export type FolderCreateWithoutDepartmentInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    documents?: DocumentCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutDepartmentInput = {
    id?: string
    name: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutDepartmentInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput>
  }

  export type FolderCreateManyDepartmentInputEnvelope = {
    data: FolderCreateManyDepartmentInput | FolderCreateManyDepartmentInput[]
  }

  export type UserDepartmentUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: UserDepartmentWhereUniqueInput
    update: XOR<UserDepartmentUpdateWithoutDepartmentInput, UserDepartmentUncheckedUpdateWithoutDepartmentInput>
    create: XOR<UserDepartmentCreateWithoutDepartmentInput, UserDepartmentUncheckedCreateWithoutDepartmentInput>
  }

  export type UserDepartmentUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: UserDepartmentWhereUniqueInput
    data: XOR<UserDepartmentUpdateWithoutDepartmentInput, UserDepartmentUncheckedUpdateWithoutDepartmentInput>
  }

  export type UserDepartmentUpdateManyWithWhereWithoutDepartmentInput = {
    where: UserDepartmentScalarWhereInput
    data: XOR<UserDepartmentUpdateManyMutationInput, UserDepartmentUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutDepartmentInput, DocumentUncheckedUpdateWithoutDepartmentInput>
    create: XOR<DocumentCreateWithoutDepartmentInput, DocumentUncheckedCreateWithoutDepartmentInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutDepartmentInput, DocumentUncheckedUpdateWithoutDepartmentInput>
  }

  export type DocumentUpdateManyWithWhereWithoutDepartmentInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type FolderUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: FolderWhereUniqueInput
    update: XOR<FolderUpdateWithoutDepartmentInput, FolderUncheckedUpdateWithoutDepartmentInput>
    create: XOR<FolderCreateWithoutDepartmentInput, FolderUncheckedCreateWithoutDepartmentInput>
  }

  export type FolderUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: FolderWhereUniqueInput
    data: XOR<FolderUpdateWithoutDepartmentInput, FolderUncheckedUpdateWithoutDepartmentInput>
  }

  export type FolderUpdateManyWithWhereWithoutDepartmentInput = {
    where: FolderScalarWhereInput
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type FolderScalarWhereInput = {
    AND?: FolderScalarWhereInput | FolderScalarWhereInput[]
    OR?: FolderScalarWhereInput[]
    NOT?: FolderScalarWhereInput | FolderScalarWhereInput[]
    id?: StringFilter<"Folder"> | string
    name?: StringFilter<"Folder"> | string
    departmentId?: StringFilter<"Folder"> | string
    userId?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
    deletedByUserId?: StringNullableFilter<"Folder"> | string | null
  }

  export type UserCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    sessions?: ActiveSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    email: string
    role?: string
    password_hash: string
    last_login_at?: Date | string | null
    last_login_ip?: string | null
    sessions?: ActiveSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDepartmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDepartmentsInput, UserUncheckedCreateWithoutDepartmentsInput>
  }

  export type DepartmentCreateWithoutUsersInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    documents?: DocumentCreateNestedManyWithoutDepartmentInput
    folders?: FolderCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    documents?: DocumentUncheckedCreateNestedManyWithoutDepartmentInput
    folders?: FolderUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutUsersInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutDepartmentsInput = {
    update: XOR<UserUpdateWithoutDepartmentsInput, UserUncheckedUpdateWithoutDepartmentsInput>
    create: XOR<UserCreateWithoutDepartmentsInput, UserUncheckedCreateWithoutDepartmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDepartmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDepartmentsInput, UserUncheckedUpdateWithoutDepartmentsInput>
  }

  export type UserUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: ActiveSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    last_login_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login_ip?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: ActiveSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DepartmentUpsertWithoutUsersInput = {
    update: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutUsersInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type DepartmentUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUncheckedUpdateManyWithoutDepartmentNestedInput
    folders?: FolderUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateWithoutFoldersInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentCreateNestedManyWithoutDepartmentInput
    documents?: DocumentCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutFoldersInput = {
    id?: string
    name: string
    tenantId?: string
    defaultPermissionPreset?: string | null
    users?: UserDepartmentUncheckedCreateNestedManyWithoutDepartmentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutFoldersInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutFoldersInput, DepartmentUncheckedCreateWithoutFoldersInput>
  }

  export type FolderCreateWithoutChildrenInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    department: DepartmentCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    documents?: DocumentCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    documents?: DocumentUncheckedCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutChildrenInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
  }

  export type FolderCreateWithoutParentInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    department: DepartmentCreateNestedOneWithoutFoldersInput
    children?: FolderCreateNestedManyWithoutParentInput
    documents?: DocumentCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFolderInput
    permissions?: FolderPermissionUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutParentInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput>
  }

  export type FolderCreateManyParentInputEnvelope = {
    data: FolderCreateManyParentInput | FolderCreateManyParentInput[]
  }

  export type DocumentCreateWithoutFolderInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    department?: DepartmentCreateNestedOneWithoutDocumentsInput
    labels?: LabelCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutFolderInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
    labels?: LabelUncheckedCreateNestedManyWithoutDocumentsInput
    permissions?: DocumentPermissionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutFolderInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput>
  }

  export type DocumentCreateManyFolderInputEnvelope = {
    data: DocumentCreateManyFolderInput | DocumentCreateManyFolderInput[]
  }

  export type FolderPermissionCreateWithoutFolderInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
  }

  export type FolderPermissionUncheckedCreateWithoutFolderInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
  }

  export type FolderPermissionCreateOrConnectWithoutFolderInput = {
    where: FolderPermissionWhereUniqueInput
    create: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput>
  }

  export type FolderPermissionCreateManyFolderInputEnvelope = {
    data: FolderPermissionCreateManyFolderInput | FolderPermissionCreateManyFolderInput[]
  }

  export type DepartmentUpsertWithoutFoldersInput = {
    update: XOR<DepartmentUpdateWithoutFoldersInput, DepartmentUncheckedUpdateWithoutFoldersInput>
    create: XOR<DepartmentCreateWithoutFoldersInput, DepartmentUncheckedCreateWithoutFoldersInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutFoldersInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutFoldersInput, DepartmentUncheckedUpdateWithoutFoldersInput>
  }

  export type DepartmentUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUpdateManyWithoutDepartmentNestedInput
    documents?: DocumentUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    defaultPermissionPreset?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserDepartmentUncheckedUpdateManyWithoutDepartmentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type FolderUpsertWithoutChildrenInput = {
    update: XOR<FolderUpdateWithoutChildrenInput, FolderUncheckedUpdateWithoutChildrenInput>
    create: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutChildrenInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutChildrenInput, FolderUncheckedUpdateWithoutChildrenInput>
  }

  export type FolderUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    documents?: DocumentUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUncheckedUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUpsertWithWhereUniqueWithoutParentInput = {
    where: FolderWhereUniqueInput
    update: XOR<FolderUpdateWithoutParentInput, FolderUncheckedUpdateWithoutParentInput>
    create: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput>
  }

  export type FolderUpdateWithWhereUniqueWithoutParentInput = {
    where: FolderWhereUniqueInput
    data: XOR<FolderUpdateWithoutParentInput, FolderUncheckedUpdateWithoutParentInput>
  }

  export type FolderUpdateManyWithWhereWithoutParentInput = {
    where: FolderScalarWhereInput
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyWithoutParentInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutFolderInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutFolderInput, DocumentUncheckedUpdateWithoutFolderInput>
    create: XOR<DocumentCreateWithoutFolderInput, DocumentUncheckedCreateWithoutFolderInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutFolderInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutFolderInput, DocumentUncheckedUpdateWithoutFolderInput>
  }

  export type DocumentUpdateManyWithWhereWithoutFolderInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutFolderInput>
  }

  export type FolderPermissionUpsertWithWhereUniqueWithoutFolderInput = {
    where: FolderPermissionWhereUniqueInput
    update: XOR<FolderPermissionUpdateWithoutFolderInput, FolderPermissionUncheckedUpdateWithoutFolderInput>
    create: XOR<FolderPermissionCreateWithoutFolderInput, FolderPermissionUncheckedCreateWithoutFolderInput>
  }

  export type FolderPermissionUpdateWithWhereUniqueWithoutFolderInput = {
    where: FolderPermissionWhereUniqueInput
    data: XOR<FolderPermissionUpdateWithoutFolderInput, FolderPermissionUncheckedUpdateWithoutFolderInput>
  }

  export type FolderPermissionUpdateManyWithWhereWithoutFolderInput = {
    where: FolderPermissionScalarWhereInput
    data: XOR<FolderPermissionUpdateManyMutationInput, FolderPermissionUncheckedUpdateManyWithoutFolderInput>
  }

  export type FolderPermissionScalarWhereInput = {
    AND?: FolderPermissionScalarWhereInput | FolderPermissionScalarWhereInput[]
    OR?: FolderPermissionScalarWhereInput[]
    NOT?: FolderPermissionScalarWhereInput | FolderPermissionScalarWhereInput[]
    id?: StringFilter<"FolderPermission"> | string
    folderId?: StringFilter<"FolderPermission"> | string
    sharedWithUserId?: StringFilter<"FolderPermission"> | string
    permissionLevel?: StringFilter<"FolderPermission"> | string
    sharedAt?: DateTimeFilter<"FolderPermission"> | Date | string
    expiresAt?: DateTimeNullableFilter<"FolderPermission"> | Date | string | null
    grantedByUserId?: StringNullableFilter<"FolderPermission"> | string | null
  }

  export type FolderCreateWithoutPermissionsInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    department: DepartmentCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    documents?: DocumentCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    documents?: DocumentUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutPermissionsInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutPermissionsInput, FolderUncheckedCreateWithoutPermissionsInput>
  }

  export type FolderUpsertWithoutPermissionsInput = {
    update: XOR<FolderUpdateWithoutPermissionsInput, FolderUncheckedUpdateWithoutPermissionsInput>
    create: XOR<FolderCreateWithoutPermissionsInput, FolderUncheckedCreateWithoutPermissionsInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutPermissionsInput, FolderUncheckedUpdateWithoutPermissionsInput>
  }

  export type FolderUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    documents?: DocumentUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type DocumentPermissionCreateManyDocumentInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type LabelUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LabelUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LabelUncheckedUpdateManyWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentPermissionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentPermissionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentPermissionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: DepartmentUpdateOneWithoutDocumentsNestedInput
    folder?: FolderUpdateOneWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: DocumentPermissionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserDepartmentCreateManyUserInput = {
    departmentId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type ActiveSessionCreateManyUserInput = {
    id?: string
    token_hash: string
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string
    expires_at: Date | string
  }

  export type UserDepartmentUpdateWithoutUserInput = {
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
    department?: DepartmentUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserDepartmentUncheckedUpdateWithoutUserInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type UserDepartmentUncheckedUpdateManyWithoutUserInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type ActiveSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token_hash?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDepartmentCreateManyDepartmentInput = {
    userId: string
    role?: string
    isPrimary?: boolean
    permissions?: string
  }

  export type DocumentCreateManyDepartmentInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    folderId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
  }

  export type FolderCreateManyDepartmentInput = {
    id?: string
    name: string
    userId: string
    parentId?: string | null
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
  }

  export type UserDepartmentUpdateWithoutDepartmentInput = {
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutDepartmentsNestedInput
  }

  export type UserDepartmentUncheckedUpdateWithoutDepartmentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type UserDepartmentUncheckedUpdateManyWithoutDepartmentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    permissions?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folder?: FolderUpdateOneWithoutDocumentsNestedInput
    labels?: LabelUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labels?: LabelUncheckedUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FolderUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    documents?: DocumentUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderCreateManyParentInput = {
    id?: string
    name: string
    departmentId: string
    userId: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
  }

  export type DocumentCreateManyFolderInput = {
    id?: string
    name: string
    displayName?: string | null
    path: string
    mimeType: string
    userId?: string
    departmentId?: string | null
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    deletedByUserId?: string | null
    searchTokens?: string | null
    indexedAt?: Date | string | null
  }

  export type FolderPermissionCreateManyFolderInput = {
    id?: string
    sharedWithUserId: string
    permissionLevel: string
    sharedAt?: Date | string
    expiresAt?: Date | string | null
    grantedByUserId?: string | null
  }

  export type FolderUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: DepartmentUpdateOneRequiredWithoutFoldersNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    documents?: DocumentUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutFolderNestedInput
    permissions?: FolderPermissionUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: DepartmentUpdateOneWithoutDocumentsNestedInput
    labels?: LabelUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    labels?: LabelUncheckedUpdateManyWithoutDocumentsNestedInput
    permissions?: DocumentPermissionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    searchTokens?: NullableStringFieldUpdateOperationsInput | string | null
    indexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FolderPermissionUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderPermissionUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FolderPermissionUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: StringFieldUpdateOperationsInput | string
    permissionLevel?: StringFieldUpdateOperationsInput | string
    sharedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    grantedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}