import type { NextPage } from 'next'

import Baller from '../components/Baller';
import { useBallers } from '../hooks/useBallers';

const Roster: NextPage = () => {
  const {
    ownedBallerIds,
  } = useBallers();

  return (
    <div>
      <h1>Your Roster</h1>

      <div>
        {
          ownedBallerIds.map(ballerId => (
            <Baller key={ballerId} ballerId={ballerId} />
          ))
        }
      </div>
    </div>
  )
}

export default Roster;