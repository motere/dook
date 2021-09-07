type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'

interface BodyObject {
  [key: string]: any
}

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

export type Query = Record<string, any>
export type Params = Record<string, string | number | boolean>
export type Headers = Record<string, string>

export type Type = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'

export interface Options extends Omit<RequestInit, 'body'> {
  query?: Query | (() => Query)
  body?: Body | (() => Body)
  params?: Params | (() => Params)
  method?: Method
  type?: Type
}
