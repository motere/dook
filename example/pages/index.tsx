import type { NextPage } from 'next'
import { Provider } from 'dooks-request'

const Home: NextPage = () => {
  return (
    <Provider value={{}}>
      <div>哈哈哈</div>
    </Provider>
  )
}

export default Home
