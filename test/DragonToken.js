var Token = artifacts.require('DragonToken.sol');

const tests = require("@daonomic/tests-common");
const awaitEvent = tests.awaitEvent;
const expectThrow = tests.expectThrow;
const randomAddress = tests.randomAddress;

contract("DragonToken", accounts => {
  let token;

  beforeEach(async function() {
    token = await Token.new(1000, 3, "Dragon1", "DGN1");
  });

  function bn(value) {
    return new web3.BigNumber(value);
  }

  it("should sell dragons", async () => {
    await token.sendTransaction({from: accounts[1], value: 1000});
    assert.equal(await token.totalSupply(), 1);
    assert.equal(await web3.eth.getBalance(token.address), 1000);
    assert.equal(await token.ownerOf(1), accounts[1]);
    assert.equal(await token.balanceOf(accounts[1]), 1);

    await token.sendTransaction({from: accounts[1], value: 1000});
    assert.equal(await token.totalSupply(), 2);
    assert.equal(await token.balanceOf(accounts[1]), 2);
    assert.equal(await token.ownerOf(2), accounts[1]);

    await token.sendTransaction({from: accounts[2], value: 1000});
    assert.equal(await token.totalSupply(), 3);
    assert.equal(await token.balanceOf(accounts[1]), 2);
    assert.equal(await token.balanceOf(accounts[2]), 1);
    assert.equal(await token.balanceOf(accounts[1]), 2);
    assert.equal(await token.ownerOf(3), accounts[2]);
  });

  it("should return change", async () => {
    var current = web3.eth.getBalance(accounts[1]);
    await token.sendTransaction({from: accounts[1], value: 3000});
    assert.equal(await web3.eth.getBalance(token.address), 1000);
  });

  it("should let withdraw", async () => {
    await token.sendTransaction({from: accounts[1], value: 3000});

	var address = randomAddress();
	await token.withdraw(address, 800);
	assert.equal(await web3.eth.getBalance(address), 800);
	assert.equal(await web3.eth.getBalance(token.address), 200);
  });

  it("should not let withdraw if not owner", async () => {
    await token.sendTransaction({from: accounts[1], value: 3000});

	var address = randomAddress();
	await expectThrow(
		token.withdraw(address, 800, {from: accounts[1]})
	);
  });

  it("should not sell more than cap", async () => {
    await token.sendTransaction({from: accounts[1], value: 3000});
    await token.sendTransaction({from: accounts[1], value: 3000});
    await token.sendTransaction({from: accounts[1], value: 3000});
    await expectThrow(
        token.sendTransaction({from: accounts[1], value: 3000})
    );
  });

});
