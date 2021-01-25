const SHA256 = require('crypto-js/sha256');

class Supply{
  constructor(fromAddress, toAddress, description, quantity){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.description = description;
    this.quantity = quantity;

  }
}

class Block{
  constructor( timestamp, supply, previousHash = ''){
    this.timestamp = timestamp;
    this.supply = supply;
    //this.location = location;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.noce = 0;

  }
  calculateHash(){
    return SHA256(this.previousHash + this.timestamp  + JSON.stringify(this.supply) + this.noce).toString();
  }

  mineBlock(difficuly){
    while(this.hash.substring(0,difficuly) !== Array(difficuly + 1).join("0")){
      this.noce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined:" + this.hash);

  }
}



class BlockChain{
  constructor(){
    this.chain=[this.createGenesisBlock()];
    this.difficuly = 3;
    this.pendingSupplyApprove = [];
    this.ApprovalRewords = 100;

  }

  createGenesisBlock(){
    return new Block(0,"1/1/2021","Genesis block","0");
  }

  getLatestBlock(){
    return this.chain[(this.chain.length) - 1];
  }

  minePendingSupplyApproval(miningRewardAddress){
    let block = new Block(Date.now(), this.pendingSupplyApprove);
    block.mineBlock(this.difficuly);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingSupplyApprove = [
      new Supply(null, miningRewardAddress, this.ApprovalRewords)
    ];

  }

  createSupply(supplys){
    this.pendingSupplyApprove.push(supplys);
  }

  getQuantityOfAddress(address){
    let quanti = 0;

    for (const block of this.chain){
      for( const sup of block.supply){
        if (sup.fromAddress === address){
          quanti -= sup.quantity;
        }

        if (sup.toAddress === address){
          quanti += sup.quantity;
        }
      }

      return quanti;
    }

  }

  isChainValid(){
    for(let i = 1; i< this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.hash !== previousBlock.hash){
        return false;
      }
    }

    return true; 
  }
}

let medtrace = new BlockChain();

medtrace.createSupply(new Supply('address1','address2','Napa 500mg ',100));
medtrace.createSupply(new Supply('address2','address1','Napa 500mg ',50));

console.log('\nMining Start...');
medtrace.minePendingSupplyApproval('administrator');

console.log('Balance of admin is :', medtrace.getQuantityOfAddress('administrator'));




console.log('\nMining Start again...');
medtrace.minePendingSupplyApproval('administrator');
 
console.log('Balance of admin is :', medtrace.getQuantityOfAddress('administrator'));



