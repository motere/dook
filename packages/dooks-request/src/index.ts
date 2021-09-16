import { useEffect, useRef, useState, useContext, createContext } from 'react'
import request from './request'
import { RequestHookOption } from './types'
import { isGraphQL } from './util'

interface ContextTypes<T, N> {
  httpAgent?: (options: T) => Promise<N>
}
class QueryHook {

  context = createContext<ContextTypes<any, any>>({ httpAgent: request })

  getOptions(queryKey: string, options?: any) {
    const { variables, ...rest } = options || {}
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

    return reqOptions
  }

  useQuery(queryKey: string, options?: RequestHookOption) {
    const { httpAgent } = useContext(this.context)
    const [state, setState] = useState({ data: null, error: null })
    const unmountRef = useRef(false)

    useEffect(() => {
      httpAgent!(this.getOptions(queryKey, options))
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

const queryHook = new QueryHook()

export const Provider = queryHook.context.Provider
export const useQuery = queryHook.useQuery.bind(queryHook)
