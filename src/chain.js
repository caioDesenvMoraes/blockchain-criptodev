const Block = require('./block')
const utils = require('./utils')
const Transaction = require('./tx')

const txGenesis = new Transaction({
    sender: "Bloco Genêsis", 
    receiver: "------------",
    amount: 0
})

class Chain {

    constructor() {

        const genesis = new Block({index: 0, previousHash: 0, data: txGenesis})
        genesis.mine(0)

        this.instance = [ genesis ]
        this.index = 1
    }

    addBlock(data) {
        const index = this.index
        const previousHash = this.instance[this.index - 1].hash

        const block = new Block(index, previousHash, data)
        const mined = block.mine(6)

        if(mined) {
            this.index++
            this.instance.push(block)
        }
    }

    print() {
        console.log(this.instance)
    }
    
    isValid() {
        for(let i = 1; i < this.instance.length; i++) {
            const currentBlock = this.instance[i]
            const previousBlock = this.instance[i - 1]

            const reGeneratedHash = utils.hashGenerator(
                currentBlock.index, 
                currentBlock.previousHash,
                currentBlock.timestamp,
                currentBlock.data,
                currentBlock.nonce
            )

            if(currentBlock.hash !== reGeneratedHash) return false
            if(currentBlock.previousHash !== previousBlock.hash) return false
            if(currentBlock.index !== previousBlock.index + 1) return false
        }

        return true

    }
}

module.exports = Chain