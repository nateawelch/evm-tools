const evmAsm = require('@optionality.io/evm-asm')

class Program {
    constructor() {
        this.ops = []
        //TODO add log ops
    }

    label(label) {
        this.ops.push(evmAsm.label(label))
    }

    caller() {
        this.ops.push(evmAsm.caller())
    }

    eq() {
        this.ops.push(evmAsm.eq())
    }

    jumpi() {
        this.ops.push(evmAsm.jumpi())
    }

    returndatasize() {
        this.ops.push(evmAsm.returndatasize())
    }

    revert() {
        this.ops.push(evmAsm.revert())
    }

    jumpdest(dest) {
        this.ops.push(evmAsm.jumpdest(dest))
    }

    calldataload() {
        this.ops.push(evmAsm.calldataload())
    }

    calldatasize() {
        this.ops.push(evmAsm.calldatasize())
    }

    calldatacopy() {
        this.ops.push(evmAsm.calldatacopy())
    }

    and() {
        this.ops.push(evmAsm.and())
    }

    not() {
        this.ops.push(evmAsm.not())
    }

    stop() {
        this.ops.push(evmAsm.stop())
    }

    mstore() {
        this.ops.push(evmAsm.mstore())
    }

    codecopy() {
        this.ops.push(evmAsm.codecopy())
    }

    return() {
        this.ops.push(evmAsm.return())
    }

    selfdestruct() {
        this.ops.push(evmAsm.selfdestruct())
    }

    div() {
        this.ops.push(evmAsm.div())
    }

    sender() {
        this.ops.push(evmAsm.sender())
    }

    push(number, data) {
        if (typeof number !== "number" || number < 1 || number > 32) {
            throw new Error("This is not a number for push")
        }
        this.ops.push(evmAsm["push" + number](data))
    }

    dup(number) {
        if (typeof number !== "number" || number < 1 || number > 16) {
            throw new Error("This is not a number for dup")
        }
        this.ops.push(evmAsm["dup" + number]())
    }

    swap(number) {
        if (typeof number !== "number" || number < 1 || number > 16) {
            throw new Error("This is not a number for swap")
        }
        this.ops.push(evmAsm["swap" + number]())
    }

    gas() {
        this.ops.push(evmAsm.gas())
    }

    call() {
        this.ops.push(evmAsm.call())
    }

    shiftleft() {
        this.ops.push(evmAsm.shiftleft())
    }

    shiftright() {
        this.ops.push(evmAsm.shiftright())
    }

    sha3() {
        this.ops.push(evmAsm.sha3())
    }

    compile() {
        return evmAsm.program(this.ops).generate()
    }
}

module.exports = {
    Program: Program
}
