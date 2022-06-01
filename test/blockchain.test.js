const { assert } = require("chai")
const chain = require("../src/chain")

const { DIFFICULTY } = require("../config")

const Block = require("../src/block")
const Chain = require("../src/chain")
const Transaction = require("../src/tx")

describe("Testes Block", () => {
    
    const txGenesis = new Transaction({
        sender: "Bloco Genêsis", 
        receiver: "------------",
        amount: 0
    })

    const block = new Block(0, 0, txGenesis)

    const mine = block.mine(DIFFICULTY)

    const hash = block.hash

    it("Testando a mineracao", () => {
        const valorEsperado = true
        assert.equal(mine, valorEsperado)
    })

    it("Testando se está gerando o hash", () => {
        const index = block.index
        const previousHash = block.previousHash
        const timestamp = block.timestamp
        const data = block.data
        const nonce = block.nonce
        const hashEsperado = block.hash
        const hashResultante = block.compute()

        assert.equal(hashResultante, hashEsperado)
    })

    it("Testando se o hash bate com a quantidade de 0 da dificuldade", () => {
        const zeros = Array(DIFFICULTY + 1).join("0")
        const startHash = hash.substring(0, DIFFICULTY)
        assert.equal(zeros, startHash)
    })

})

describe("Testes Chain", () => {
    const chain = new Chain()
    const chain2 = new Chain()

    const txData = new Transaction({
        sender: "Caio", 
        receiver: "JC",
        amount: 500
    })

    chain.addBlock(txData)

    it("Testando se está adicionando um bloco na chain", () => {
        let lastLength = chain.instance.length
        chain.addBlock(txData)
        let currentLength = chain.instance.length

        assert.equal(currentLength, lastLength + 1)
    })

    it("Testando se está mostrando a cadeia de blocos", () => {
        const valorEsperado = console.log(chain.instance)
        const resultado = chain.print()

        assert.equal(resultado, valorEsperado)
    })

    it("Testando se a blockchain é valida", () => {
        const valorEsperado = true
        const resultado = chain.isValid()
        assert.equal(resultado, valorEsperado)
    })

    it("Testando se a dificuldade está sendo diminuida", () => {

        const valorEsperado = chain2.difficulty - 1

        const lastBlock = chain2.instance[0]
        const timestamp = chain2.instance[0].timestamp + 6000

        const resultado = chain2.adjustDifficulty(lastBlock, timestamp)

        assert.equal(resultado, valorEsperado)
    }) 

    it("Testando se a dificuldade está sendo aumentada", () => {

        const valorEsperado = chain2.difficulty + 1

        const lastBlock = chain2.instance[0]
        const timestamp = chain2.instance[0].timestamp

        const resultado = chain2.adjustDifficulty(lastBlock, timestamp)

        assert.equal(resultado, valorEsperado)
    }) 
})
