//SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0;

contract wallet{

    event transactions(address indexed from,address to,uint amount,string symbol );
    event recepients(address indexed recepientOf, address recepient, string recepientName);

    function _transfer(address payable _to, string memory symbol) public payable{
        _to.transfer(msg.value);
        emit transactions(msg.sender,_to,msg.value,symbol);
    }

    function saveTx(address from, address to, uint amount, string memory symbol)public{
        emit transactions(from,to,amount,symbol);
    }

    function addRecepient(address recepient,string memory name) public{
        emit recepients(msg.sender,recepient,name);
    }


}

//0xb60b9a34533B9AdB574F580cDaD0715dCCe3290a -Sepolia
//0x34A90C0b649bBc66C4758C46AdA275bD237D50cC -Polygon
