import { CommonObject } from './types'
import { stringify } from 'qs'

export async function getErrorMsg(error: any): Promise<any> {
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

export function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function createRequestUrl<T extends { baseURL?: string; path?: string; url?: string; params?: CommonObject }>(req: T): string {
  const { baseURL, path = '', params } = req

  let url = req.url || ''

  if (isAbsoluteURL(path)) {
    url += path
  } else {
    if (baseURL) url += baseURL
    if (path) url += path
  }

  if (params && !isEmpty(params)) url += `?${stringify(params)}`

  return url
}

export function isEmpty(value: any) {
  const type = elementType(value)
  switch (type) {
    case 'object':
      return !Reflect.ownKeys(value).length && value.constructor === Object
    case 'array':
      return !value.length
    default:
      return !value
  }
}

export const elementType = (ele: any) => {
  const typeStr = Object.prototype.toString.call(ele)
  const reg = /^\[object\s([A-Za-z]+)\]$/
  reg.test(typeStr)
  return RegExp.$1.toLowerCase()
}

export function isGraphQL(key: string) {
  return /^\b(query|mutation|subscriptions)\b\s+/.test(key)
}

// deep merge common object
export const merge = <T>(...args: (CommonObject | undefined)[]): T => {
  return args.reduce((t, c) => {
    if (!c) return t

    const data = Object.entries(c)
    const length = data.length

    for (let i = 0; i < length; i++) {
      const [key, value] = data[i]

      if (elementType(value) === 'object') {
        t[key] = merge(t[key], value)
      } else {
        Object.assign(t, { [key]: value })
      }
    }

    return t
  }, {} as any)
}
