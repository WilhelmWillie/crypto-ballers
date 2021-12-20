pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ballers is ERC721, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _ballerIds;

  struct Baller {
    uint256 dna;
  }

  uint256 public constant MAXIMUM_BALLERS_PER_WALLET = 5;
  uint256 public constant DRAFT_PRICE = 0.01 ether;
  
  event Draft(address _minter, uint _ballerId);

  Baller[] public ballers;

  constructor() ERC721("CryptoBaller", "BALLER") {}

  /*
    ==== Modifiers ====
  */

  modifier canDraftEnoughBallers(uint256 _numberOfBallersToDraft) {
    require(
      balanceOf(msg.sender) + _numberOfBallersToDraft <= MAXIMUM_BALLERS_PER_WALLET, 
      "Wallets can only own a maximum of 5 Ballers"
    );
    _;
  }

  modifier hasEnoughValueToDraft(uint256 _numberOfBallersToDraft) {
    require(
        DRAFT_PRICE * _numberOfBallersToDraft == msg.value,
        "Does not have enough ETH in transaction to draft"
    );
    _;
  }

  /*
    ==== Private helper methods ====
  */
  function _generateDNA(uint _ballerId) private view returns (uint256 dna) {
    return uint256(
      keccak256(
        abi.encodePacked(
          block.timestamp,
          block.difficulty,
          msg.sender,
          _ballerId
        )
      )
    ) % 10000000000000;
  }

  function _generateNewBaller() private returns (uint256 newBallerId) {
    uint ballerId = _ballerIds.current();
    uint dna = _generateDNA(ballerId);

    ballers.push(Baller(dna));
    _ballerIds.increment();

    return ballerId;
  }

  /*
    ==== Admin only methods ====
  */

  /*
    ==== Read-write public methods ====
  */
  function draftBaller(uint8 _numberOfBallersToDraft) 
    external 
    payable 
    canDraftEnoughBallers(_numberOfBallersToDraft) 
    hasEnoughValueToDraft(_numberOfBallersToDraft)
    returns (uint256[] memory newBallerIds) 
  {
    require(balanceOf(msg.sender) < 5);

    uint[] memory result = new uint[](_numberOfBallersToDraft);

    for(uint i=0;i<_numberOfBallersToDraft;i++) {
      uint ballerId = _generateNewBaller();
      _mint(address(msg.sender), ballerId);
      result[i] = ballerId;
    }
    
    return result;
  }

  /*
    ==== Read-only public methods ====
  */
  function getBallersCount() public view returns (uint ballersCount) {
    return ballers.length;
  }

  function getBallersByOwner(address _owner) public view returns(uint[] memory ballerIds) {
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

  function getBallerDNA(uint _ballerId) public view returns (uint dna) {
    return ballers[_ballerId].dna;
  }
}