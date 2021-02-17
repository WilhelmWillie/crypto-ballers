const Baller = artifacts.require("./Baller.sol");

contract("Baller", accounts => {
  it("...should mint 5 ballers", async () => {
    const ballerInstance = await Baller.deployed();
    await ballerInstance.mintNewBallers(5);
    const ballersCount = await ballerInstance.getBallersCount();
    assert.equal(ballersCount, 5, "5 new ballers were minted");
  });
});
