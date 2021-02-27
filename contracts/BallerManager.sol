// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./BallerFactory.sol";

contract BallerManager is BallerFactory {
  event Claim(address _claimer, uint _ballerId);
  event Release(address _releaser, uint _ballerId);

  function claimBaller(uint _ballerId) public {
    address ownerOfRequestedBaller = ownerOf(_ballerId);

    require(balanceOf(msg.sender) < 5);
    require(ownerOfRequestedBaller == address(this));

    _transfer(address(this), msg.sender, _ballerId);
    emit Claim(msg.sender, _ballerId);
  }

  function releaseBaller(uint _ballerId) public {
    address ownerOfRequestedBaller = ownerOf(_ballerId);
    require(ownerOfRequestedBaller == msg.sender);

    _transfer(msg.sender, address(this), _ballerId);
    emit Release(msg.sender, _ballerId);
  }
}