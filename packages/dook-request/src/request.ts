import crossFetch from 'cross-fetch'
import { RequestCoreOptions, ResponseType } from './types'
import { createRequestUrl, } from './util'

async function getErrorMsg(error: any): Promise<any> {
  if (!error) throw 'network error!'
  if (typeof error !== 'object') throw error
  if ('json' in error) {
    const msg = await error.json()
    if (msg) return msg
  }

  if ('blob' in error) {
    const msg = await error.blob()
    if (msg) return msg
  }
  return error
}

function timeoutThrow(timeout: number): Promise<Error> {
  return new Promise((_, reject) =>
    setTimeout(() => {
      reject('timeout')
    }, timeout)
  )
}

function parseResBody(responseType: ResponseType, res: globalThis.Response) {
  switch (responseType) {
    case 'json':
      return res.json()
    case 'blob':
      return res.blob()
    case 'arraybuffer':
      return res.arrayBuffer()
    case 'text':
      return res.text()
    default:
      return res
  }
}

async function _fetch<T extends RequestCoreOptions, N = any>(options: T): Promise<N> {
  const { responseType, baseURL, params, path, ...rest } = options
  const url = createRequestUrl({ baseURL, params, path })

  try {
    const response = await crossFetch(url, rest)
    if (response.status >= 200 && response.status < 300) {
      return responseType ? Promise.resolve(response).then(res => parseResBody(responseType, res)) : response
    }
    throw response
  } catch (e) {
    throw await getErrorMsg(e)
  }
}

export default function <T extends RequestCoreOptions, N = any>(options: T): Promise<N> {
  const { timeout, ...rest } = options
  return timeout ? Promise.race([_fetch<Omit<T, 'timeout'>>(rest), timeoutThrow(timeout)]) : _fetch<Omit<T, 'timeout'>>(rest)
}
