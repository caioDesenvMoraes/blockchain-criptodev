const Block = require('./block')

class Chain {

    constructor() {
        this.chain = [ new Block({ index: 0, previuousHash: 0, data: "Genesis Block" }) ]
        this.index = 1
    }

    addBlock(data) {
        const index = this.index
        const previousHash = this.instance[this.index - 1]

        const block = new Block({ index, previousHash, data})

        this.index++
        this.instance.push(block)
    }

    print() {
        console.log(this.instance)
    }
}

module.exports = Chain