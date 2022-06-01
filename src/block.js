const crypto = require("crypto-js")
const utils = require("./utils")
class Block {

    // Index (Height)
    // Previous Hash
    // Timestamp
    // Data
    // Hash

    constructor(index, previousHash, data) {
        this.index = index
        this.previousHash = previousHash
        this.data = data
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

    mine(difficult) {
        const zeros = Array(difficult + 1).join("0")
        while(this.hash.substring(0, difficult) !== zeros) {
            this.nonce++
            this.hash = this.compute()
        }

        console.log(`Block mined, nonce: ${this.nonce}, hash: ${this.hash}`);
        return true
    }
}

module.exports = Block