const crypto = require("crypto-js")
const { DIFFICULTY } = require("../config")
const utils = require("./utils")
class Block {

    constructor(index, previousHash, data) {
        this.index = index
        this.previousHash = previousHash
        this.data = JSON.stringify(data)
        this.timestamp = new Date().getTime()
        this.nonce = 0
        this.hash = ""
    }

    compute() {
        return utils.hashGenerator(
            this.index, 
            this.previousHash,
            this.timestamp,
            this.data,
            this.nonce
        )
    }

    mine(difficulty) {
        const zeros = Array(difficulty + 1).join("0")
        
        while(this.hash.substring(0, difficulty) !== zeros) {
            this.nonce++
            this.hash = this.compute()
        }

        console.log(`Block mined, nonce: ${this.nonce}, hash: ${this.hash}, difficulty: ${difficulty}`);
        return true
    }

    
}

module.exports = Block