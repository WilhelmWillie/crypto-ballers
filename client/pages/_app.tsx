import type { AppProps } from 'next/app'

import '../styles/globals.css'

import { Web3Provider } from '../contexts/Web3Context'
import { BallersProvider } from '../contexts/BallersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <BallersProvider>
        <Component {...pageProps} />
      </BallersProvider>
    </Web3Provider>
  )
}

export default MyApp
