import { useEffect, useState} from 'react';
import styled from 'styled-components';

type Props = {
  ballerId: number;
}

const BallerWrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

function Baller({ ballerId } : Props) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/baller/${ballerId}`);
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, [ballerId]);

  return (
    data ? (<BallerWrapper>
        <h3>{data.name}</h3>
        <p><b>Position: </b> {data.attributes.position}</p>
        <p><b>Shooting: </b> {data.attributes.ratings.shooting}</p>
        <p><b>Finishing: </b> {data.attributes.ratings.finishing}</p>
        <p><b>Playmaking: </b> {data.attributes.ratings.playmaking}</p>
        <p><b>Defense: </b> {data.attributes.ratings.defense}</p>
        <p><b>Athleticism: </b> {data.attributes.ratings.athleticism}</p>
        </BallerWrapper>) : null
  )
}

export default Baller;