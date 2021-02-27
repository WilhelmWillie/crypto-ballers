// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./BallerManager.sol";

contract Baller is BallerManager {
  function getBallersCount() public view returns (uint) {
    return ballers.length;
  }

  function getTokensByOwner(address _owner) public view returns(uint[] memory tokenIds) {
    uint[] memory result = new uint[](balanceOf(_owner));

    uint counter = 0;
    for(uint i=0;i<ballers.length;i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = i;
        counter++;
      }
    }

    return result;
  }

  function getUnclaimedTokens() public view returns(uint[] memory tokenIds) {
    uint[] memory result = new uint[](balanceOf(address(this)));

    uint counter = 0;
    for(uint i=0;i<ballers.length;i++) {
      if (ownerOf(i) == address(this)) {
        result[counter] = i;
        counter++;
      }
    }

    return result;
  }
}