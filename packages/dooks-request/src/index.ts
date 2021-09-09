import { useEffect, useRef, useState } from 'react'
import request from './request'
import { RequestHookOption } from './types'
import { isGraphQL, merge } from './util'

function createQueryHook<T extends RequestHookOption, N = any>(initOptions?: T, httpAgent = request) {
  function makeFetch(queryKey: string, options?: T) {
    const { variables, ...rest } = merge<T>(initOptions, options)
    const reqOptions: any = rest

    if (isGraphQL(queryKey)) {
      reqOptions.method = 'POST'
      reqOptions.data = {
        query: queryKey,
        variables: typeof variables === 'object' ? variables : variables?.()
      }
    } else {
      reqOptions.path = queryKey
    }

    return httpAgent<T, N>(reqOptions)
  }

  return function (queryKey: string, options?: RequestHookOption) {
    const [state, setState] = useState({ data: null, error: null })
    const unmountRef = useRef(false)

    useEffect(() => {
      makeFetch(queryKey, options as any)
        .then(res => {
          if (unmountRef.current) return
          setState((prev) => Object.assign({}, prev, { data: res }))
        })
        .catch(e => {
          if (unmountRef.current) return
          setState((prev) => Object.assign({}, prev, { error: e }))
        })

      return () => {
        unmountRef.current = true
      }
    }, [])

    return state
  }
}

const useQuery = createQueryHook()

export { useQuery, createQueryHook }

export default useQuery
