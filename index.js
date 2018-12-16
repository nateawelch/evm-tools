const evmAsm = require('@optionality-io/evm-asm')

class Program {
  var ops = []

  constructor(){
    this.ops=[]
    for(var count = 1; count<=32; count++){
      this["push"+count] = function(data){
	this.ops.push(evmAsm["push"+count](data))
      }
    }
    for(var count = 1; count<=16; count++){
      this["dup"+count] = function(){
        this.ops.push(evmAsm["dup"+count]())
      }
      this["swap"+count] = function(){
        this.ops.push(evmAsm["swap"+count]())
      }
    }
    //TODO add log ops
  }

  function label(label){
    this.ops.push(evmAsm.label(label))
  }

  function caller(){
    this.ops.push(evmAsm.caller())
  }

  function push(number, data){
    this.ops.push(evmAsm["push"+number](data))
  }

  function eq(){
    this.ops.push(evmAsm.eq())
  }

  function jumpi(){
    this.ops.push(evmAsm.jumpi())
  }

  function returndatasize(){
    this.ops.push(evmAsm.returndatasize())
  }

  function revert(){
    this.ops.push(evmAsm.revert())
  }

  function jumpdest(dest){
    this.ops.push(evmAsm.jumpdest(dest))
  }

  function calldataload(){
    this.ops.push(evmAsm.calldataload())
  }

  function and(){
    this.ops.push(evmAsm.and())
  }

  function stop(){
    this.ops.push(evmAsm.stop())
  }

  function compile(){
    return evm.program(this.ops).generate()
  }
}


module.exports = {
  Program: Program
}
