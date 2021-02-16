// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract CryptoBaller {
  struct Baller {
    uint position;
    uint id;
    uint offensiveRating;
    uint defensiveRating;
  }

  Baller[] public ballers;

  mapping (uint => address) public ballerToOwner;
  mapping (address => uint) ownerBallerCount;

  uint BALLER_CLASS_SIZE = 100;

  /*
    TODO: Write a private method that will create a new Baller
  */

  /* 
    TODO: Expose a public function called "mintNewBallerClass" can only be called once a week.
  */

  /*
    TODO: Expose a public function called "burnUnwantedBallers" that will burn any Ballers that haven't been moved in a week.s
  */
}
