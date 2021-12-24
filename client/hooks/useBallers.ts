import { useContext } from 'react'; 

import { BallersContext } from '../contexts/BallersContext';

export const useBallers = () => {
  const ballersContext = useContext(BallersContext);

  if (!ballersContext) {
    throw new Error('Ballers context was not defined. Make sure you use this in a child of BallersProvider');
  }

  return ballersContext;
}