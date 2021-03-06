const Baller = artifacts.require("./Baller.sol");

contract("Baller", accounts => {
  it("...should mint 20 ballers", async () => {
    const ballerInstance = await Baller.deployed();
    await ballerInstance.mintNewBallers(20);
    const ballersCount = await ballerInstance.getBallersCount();
    assert.equal(ballersCount, 20, "20 ballers were minted");
  });

  it("...should allow Alice to claim a baller", async () => {
    const alice = accounts[0];

    const ballerInstance = await Baller.deployed();
    await ballerInstance.claimBaller(0, { from: alice });
    const ownerOf0 = await ballerInstance.ownerOf(0);
    assert.equal(ownerOf0, alice, "Alice claimed baller 0");
  });

  it("...should allow Bob to claim up to 5 ballers", async () => {
    const bob = accounts[1];

    const ballerInstance = await Baller.deployed();

    for(let i=5;i<10;i++) {
      await ballerInstance.claimBaller(i, { from: bob });
    }

    const ownerOfBaller5 = await ballerInstance.ownerOf(5);
    assert.equal(ownerOfBaller5, bob, "Bob owns baller 5");

    try {
      await ballerInstance.claimBaller(10, { from: bob });
      assert.fail("The transaction should have thrown an error");
    } catch(err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
    
    const bobBallerCount = await ballerInstance.balanceOf(bob);
    assert.equal(bobBallerCount, 5, "Bob should have 5 ballers");
  });

  it("...should allow Bob to release a baller he owns", async () => {
    const bob = accounts[1];

    const ballerInstance = await Baller.deployed();

    let ownerOfBaller5 = await ballerInstance.ownerOf(5);
    assert.equal(ownerOfBaller5, bob, "Bob owns baller 5");

    await ballerInstance.releaseBaller(5, { from: bob });

    ownerOfBaller5 = await ballerInstance.ownerOf(5);
    assert.notEqual(ownerOfBaller5, bob, "Bob does not own baller 5");
  });

  it("...should not allow Alice to release a baller she doesn't own", async () => {
    const [alice, bob] = accounts;

    const ballerInstance = await Baller.deployed();

    let ownerOfBaller6 = await ballerInstance.ownerOf(6);
    assert.equal(ownerOfBaller6, bob, "Bob owns baller 6");

    try {
      await ballerInstance.releaseBaller(6, { from: alice });
      assert.fail("The transaction should have thrown an error");
    } catch(err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });
});
