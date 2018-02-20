pragma solidity ^0.4.0;

import "./ERC721Token.sol";
import "@daonomic/util/contracts/OwnableImpl.sol";

contract DragonToken is OwnableImpl, ERC721Token {
	uint256 public price;
	uint256 public cap;
	string public name;
	string public symbol;

	function DragonToken(uint256 _price, uint256 _cap, string _name, string _symbol) public {
		price = _price;
		cap = _cap;
		name = _name;
		symbol = _symbol;
	}

	function () payable public {
		require(totalTokens < cap);
		require(msg.value >= price);
		_mint(msg.sender, totalTokens + 1);
		if (msg.value > price) {
			msg.sender.transfer(msg.value - price);
		}
	}

	function withdraw(address beneficiary, uint256 amount) onlyOwner public {
		beneficiary.transfer(amount);
	}

}
