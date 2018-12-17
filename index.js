const evmAsm = require('@optionality.io/evm-asm')

class Program {
  constructor() {
    this.ops = []
    for (var a = 1; a <= 32; a++) {
      this["push" + a] = function(input) {
        return function(data){
          this.ops.push(evmAsm["push" + input](data))
        }
      }(a)
    }
    for (var b = 1; b <= 16; b++) {
      this["dup" + b] = function(input) {
        return function(){
          this.ops.push(evmAsm["dup" + input]())
        }
      }(b)
      this["swap" + b] = function(input) {
        return function(){
          this.ops.push(evmAsm["swap" + input]())
        }
      }(b)
    }
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

  and() {
    this.ops.push(evmAsm.and())
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
  compile() {
    console.log(this.ops)
    return evmAsm.program(this.ops).generate()
  }
}

module.exports = {
  Program: Program
}
