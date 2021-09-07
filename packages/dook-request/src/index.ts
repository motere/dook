import request from './request'
import { RequestHookOption } from './types'
import { isGraphQL, merge } from './util'

function createQueryHook<T extends RequestHookOption, N = any>(initOptions?: T, requestCore = request) {

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

    return requestCore<T, N>(reqOptions)
  }

  return function (queryKey: string, options?: RequestHookOption) {




  }
}

const useQuery = createQueryHook()

export { useQuery, createQueryHook }

export default useQuery
