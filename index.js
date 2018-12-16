const evmAsm = require('@optionality.io/evm-asm')

class Program {
  constructor() {
    this.ops = []
    for (var count = 1; count <= 32; count++) {
      this["push" + count] = function(data) {
        this.ops.push(evmAsm["push" + count](data))
      }
    }
    for (var count = 1; count <= 16; count++) {
      this["dup" + count] = function() {
        this.ops.push(evmAsm["dup" + count]())
      }
      this["swap" + count] = function() {
        this.ops.push(evmAsm["swap" + count]())
      }
    }
    //TODO add log ops
  }

  label(label) {
    this.ops.push(evmAsm.label(label))
  }

  caller() {
    this.ops.push(evmAsm.caller())
  }

  push(number, data) {
    this.ops.push(evmAsm["push" + number](data))
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

  and() {
    this.ops.push(evmAsm.and())
  }

  stop() {
    this.ops.push(evmAsm.stop())
  }

  mstore() {
    this.ops.push(evmAsm.mstore())
  }

  compile() {
    return evm.program(this.ops).generate()
  }
}

module.exports = {
  Program: Program
}
