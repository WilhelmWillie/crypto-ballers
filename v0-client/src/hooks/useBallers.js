import { useState, useEffect, useContext, useCallback } from "react";

import Web3Context from "context/Web3Context";

function useBallers(method) {
  const { contract } = useContext(Web3Context);

  const [ballers, setBallers] = useState([]);
  const [ballerIds, setBallerIds] = useState([]);

  const addBallerId = useCallback((id) => {
    setBallerIds((prevBallerIds) => (
      [
        ...prevBallerIds,
        id,
      ]
    ));
  }, [ballerIds]);

  const removeBallerId = useCallback((id) => {
    setBallerIds((prevBallerIds) => (
      prevBallerIds.filter(_id => _id !== id)
    ));
  }, [ballerIds]);

  // Get all of the baller IDs using the provided method
  useEffect(() => {
    const getBallerIds = async () => {
      const _ballerIds = await method.call(); 
      setBallerIds(_ballerIds);
    }

    if (contract) {
      getBallerIds();
    }
  }, [contract]);

  // Get data for each baller once they come in
  useEffect(() => {
    console.log({
      message: 'Change detected',
      ballerIds,
    })
    const getBallers = async () => {
      if (ballerIds) {
        const _ballers = [];
        
        for (const ballerId of ballerIds) {
          const { id, data, ownerAssignedNumber, ownerAssignedName } = await contract.methods.ballers(ballerId).call();
          _ballers.push({
            id,
            data,
            ownerAssignedNumber,
            ownerAssignedName
          });
        }

        setBallers(_ballers);
      }
    }
    
    getBallers();
  }, [ballerIds]);

  return [ballers, addBallerId, removeBallerId];
}

export default useBallers;