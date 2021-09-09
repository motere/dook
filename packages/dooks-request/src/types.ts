export type CommonObject<T = any> = Record<string, T>

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | ({} & string)

type BodyObject = CommonObject

export type Body =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | string
  | BodyObject
  | any[]
  | null


export type Query = CommonObject
export type Params = CommonObject<string | number | boolean>
export type Headers = CommonObject<string>

export type ResponseType = 'text' | 'json' | 'blob' | 'arraybuffer' | 'formData' | ({} & string)

export interface RequestCoreOptions {
  path?: string
  method?: Method
  baseURL?: string
  timeout?: number
  params?: Params
  data?: CommonObject
  headers?: Headers
  responseType?: ResponseType
}

export interface RequestHookOption extends RequestCoreOptions {
  variables?: CommonObject | (() => CommonObject)
}
