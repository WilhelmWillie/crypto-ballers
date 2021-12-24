import { useCallback } from 'react'; 

import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Baller from '../components/Baller';

import { useBallers } from '../hooks/useBallers';

const Home: NextPage = () => {
  const {
    ownedBallerIds,
    methods: {
      draft
    }
  } = useBallers();

  const handleDraftClick = useCallback(() => {
    draft(1);
  }, [draft])

  return (
    <div className={styles.container}>
      <h1>CryptoBallers</h1>

      <h2>Draft</h2>
      <button onClick={handleDraftClick}>Draft</button>

      <h2>Your Players</h2>
      <p>Below are your players...</p>
      <ul>
        {
          ownedBallerIds.map(ballerId => (
            <Baller key={ballerId} ballerId={ballerId} />
          ))
        }
      </ul>
    </div>
  )
}

export default Home
