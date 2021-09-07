import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from 'dook'
import { configure } from 'dook-request'

config({
  baseURL: 'https://cloudfutures.binanceqa.com/bapi/asset',
})

configure({
  baseURL: 'https://cloudfutures.binanceqa.com/bapi/asset',
})


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
