import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>CryptoBallers</h1>

      <Link href='/mint'>Mint</Link>
      <Link href='/roster'>Roster</Link>
    </div>
  )
}

export default Home
