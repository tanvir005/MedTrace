function add (a,b)
{
    return a+b;
}

console.log(add(5,5))




class BlockChain{
    constractor(){
      this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
      return new Block(0,"1/1/2021","Genesis block","0");
    }
  
    getLatestBlock(){
      return this.chain[(this.chain.length) - 1];
    }
  
    addBlock(newBlock){
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
  
    }
  }
  
  let medtrace = new BlockChain();
  
  medtrace.addBlock(new Block(1,"10/1/2021",{amount:4}));
  medtrace.addBlock(new Block(2,"20/1/2021",{amount:14}));
  
  console.log(JSON.stringify(medtrace,null,4));
  