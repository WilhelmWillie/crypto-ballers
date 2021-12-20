const Ballers = artifacts.require("./Ballers.sol");

const { toBN } = web3.utils;

const MINT_PRICE = 10000000000000000;

contract("Ballers", accounts => {
  it("...should allow user to draft a Baller if they have enough ETH and are under the limit", async () => {
    const NUM_TO_MINT = 3;

    const minter = accounts[0];
    const ballersInstance = await Ballers.deployed();
    await ballersInstance.draftBaller(NUM_TO_MINT, { from: minter, value: toBN(MINT_PRICE*NUM_TO_MINT) });
    const ballersOwnedByMinter = await ballersInstance.getBallersByOwner(minter);
    assert.equal(ballersOwnedByMinter.length, 3, "Successfully minted 3 Ballers")
  });

  it("...should deny user to draft a Baller if they have don't have enough ETH", async () => {
    const minter = accounts[1];
    const ballersInstance = await Ballers.deployed();

    try {
      await ballersInstance.draftBaller(3, { from: minter, value: toBN(0) });
    } catch(err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });

  it("...should deny user to draft a Baller if they try to draft over the limit", async () => {
    const NUM_TO_MINT = 6;

    const minter = accounts[2];
    const ballersInstance = await Ballers.deployed();

    try {
      await ballersInstance.draftBaller(NUM_TO_MINT, { from: minter, value: toBN(MINT_PRICE*NUM_TO_MINT) });
    } catch(err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });
});
