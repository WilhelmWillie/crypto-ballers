// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Baller is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _ballerIds;

  struct CryptoBaller {
    uint id;

    /*
      1 = PG
      2 = SG
      3 = SF
      4 = PF
      5 = C
    */
    uint position;
    
    /*
      Random number from 1-99 that indicates the baller's ability to score points
    */
    uint offensiveRating;

    /*
      Random number from 1-99 that indicates the baller's ability to prevent points
    */
    uint defensiveRating;
  }

  CryptoBaller[] public ballers;

  constructor() ERC721("CryptoBaller", "BALLER") {}

  // State variable for generating random numbers
  // Acknowledging that based off my research, this isn't perfect or secure... but works for now since I'm just learning :)
  uint randNonce = 0;
  function _generateRandomNumber(uint upperRange) private returns (uint256) {
    randNonce++;

    uint256 randomNumber = uint256(
      keccak256(
        abi.encodePacked(
          block.timestamp,
          msg.sender,
          randNonce
        )
      )
    ) % (upperRange + 1);

    return randomNumber;
  }
  
  function _generateNewBaller() private returns (uint256) {
    uint randomPosition = _generateRandomNumber(5);
    uint randomOffensiveRating = _generateRandomNumber(99);
    uint randomDefensiveRating = _generateRandomNumber(99);
    uint newBallerId = _ballerIds.current();

    ballers.push(CryptoBaller(newBallerId, randomPosition, randomOffensiveRating, randomDefensiveRating));
    _ballerIds.increment();

    return newBallerId;
  }

  function mintNewBallers(uint amount) public onlyOwner {
    for(uint i=0;i<amount;i++) {
      uint256 newBallerId = _generateNewBaller();
      _mint(owner(), newBallerId);
    }
  }

  function getBallersCount() public view returns (uint) {
    return ballers.length;
  }
}