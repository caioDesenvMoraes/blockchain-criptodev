const Block = require('./block')
const utils = require('./utils')
const Transaction = require('./tx')

const { DIFFICULTY, MINE_RATE } = require("../config")

const txGenesis = new Transaction({
    sender: "Bloco Genêsis", 
    receiver: "------------",
    amount: 0
})

class Chain {

    constructor() {
        this.difficulty = DIFFICULTY

        const genesis = new Block(0, 0, txGenesis)
        genesis.mine(this.difficulty)


        this.instance = [ genesis ]
        this.index = 1
    }

    addBlock(data) {
        const index = this.index
        const lastBlock = this.instance[index - 1]
        const previousHash = lastBlock.hash

        const block = new Block(index, previousHash, data)

        const timestamp = block.timestamp

        this.difficulty = this.adjustDifficulty(lastBlock, timestamp)

        const mined = block.mine(this.difficulty)

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

    adjustDifficulty(lastBlock, currentTimestamp) {
        const difficulty = lastBlock.timestamp + MINE_RATE > currentTimestamp ? this.difficulty + 1 : this.difficulty - 1
        return difficulty   
    }
}

module.exports = Chain