// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BallerFactory is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _ballerIds;

  struct CryptoBaller {
    /*
      Unique Crypto Baller ID
    */
    uint id;

    /*
      We can represent a baller's information using a very large integer that follows this format:
      PAABBCCDDEEFF

      P = Position
      AA = Outside Scoring
      BB = Inside Scoring
      CC = Defense
      DD = Rebounding
      EE = Playmaking
      FF = Athleticism
    */
    uint data;

    /*
      When claimed, an owner can give this Baller a number
    */
    uint8 ownerAssignedNumber;

    /*
      When claimed, an owner can give this Baller a name
    */
    string ownerAssignedName;
  }

  // Events
  event Mint(uint _ballerId);

  // Public ballers array (critical to the entire system!)
  CryptoBaller[] public ballers;

  constructor() ERC721("CryptoBaller", "BALLER") {}

  // State variable for generating random numbers
  // Acknowledging that based off my research, this isn't perfect or secure... but works for now since I'm just learning :)
  uint randNonce = 0;
  function _generateRandomData() private returns (uint256) {
    randNonce++;

    uint256 randomNumber = uint256(
      keccak256(
        abi.encodePacked(
          block.timestamp,
          msg.sender,
          randNonce
        )
      )
    ) % 10000000000000;

    return randomNumber;
  }

  function _generateNewBaller() private returns (uint256) {
    uint data = _generateRandomData();
    uint newBallerId = _ballerIds.current();

    ballers.push(CryptoBaller(newBallerId, data, 0, ''));
    emit Mint(newBallerId);

    _ballerIds.increment();
    return newBallerId;
  }

  function mintNewBallers(uint amount) public onlyOwner {
    for(uint i=0;i<amount;i++) {
      uint256 newBallerId = _generateNewBaller();
      _mint(address(this), newBallerId);
    }
  }
}