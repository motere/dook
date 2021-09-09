import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useQuery } from '@dooks/request'

function MyApp({ Component, pageProps }: AppProps) {

  const { data, error } = useQuery('https://webspiderr.herokuapp.com/crawl/api', {
    params: {
      user: 'xdoer',
      cid: '73b1430d-faa0-44eb-899e-36cf5cbfaec8'
    },
    responseType: 'json'
  })

  console.log('查看值', data, error)

  return <Component {...pageProps} />
}
export default MyApp
