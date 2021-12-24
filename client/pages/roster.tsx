import type { NextPage } from 'next'
import styled from 'styled-components';

import Baller from '../components/Baller';
import { useBallers } from '../hooks/useBallers';

const BallersContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Roster: NextPage = () => {
  const {
    ownedBallerIds,
  } = useBallers();

  return (
    <div>
      <h1>Your Roster</h1>

      <BallersContainer>
        {
          ownedBallerIds.map(ballerId => (
            <Baller key={ballerId} ballerId={ballerId} />
          ))
        }
      </BallersContainer>
    </div>
  )
}

export default Roster;