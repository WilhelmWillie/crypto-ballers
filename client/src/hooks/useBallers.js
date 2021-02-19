import { useState, useEffect, useContext } from "react";

import Web3Context from "../context/Web3Context";

function useBallers(method) {
  const { contract } = useContext(Web3Context);

  const [ballers, setBallers] = useState(null);
  const [ballerIds, setBallerIds] = useState(null);

  useEffect(() => {
    const getBallerIds = async () => {
      const _ballerIds = await method.call(); 
      setBallerIds(_ballerIds);
    }

    getBallerIds();
  }, [contract]);

  useEffect(() => {
    const getBallers = async () => {
      if (ballerIds) {
        const _ballers = [];
        
        for (const ballerId of ballerIds) {
          const { id, position, offensiveRating, defensiveRating } = await contract.methods.ballers(ballerId).call();
          _ballers.push({
            id,
            position,
            offensiveRating,
            defensiveRating
          });
        }

        setBallers(_ballers);
      }
    }
    
    getBallers();
  }, [ballerIds]);

  return ballers;
}

export default useBallers;