const Baller = artifacts.require("./Baller.sol");

contract("Baller", accounts => {
  it("...should mint 5 ballers", async () => {
    const ballerInstance = await Baller.deployed();
    await ballerInstance.mintNewBallers(5);
    const ballersCount = await ballerInstance.getBallersCount();
    assert.equal(ballersCount, 5, "5 new ballers were minted");
  });

  it("...should allow Alice to claim a baller", async () => {
    const [alice] = accounts;
    const ballerInstance = await Baller.deployed();
    await ballerInstance.claimBaller(0, { from: alice });
    const ownerOf0 = await ballerInstance.ownerOf(0);
    assert.equal(ownerOf0, alice, "Alice claimed baller 0");
  });
});
