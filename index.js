const evmAsm = require('@optionality-io/evm-asm')

class Program {
  var ops = []

  constructor(){
    for(var count = 1; count<=32; count++){
      this["push"+count] = function(data){
	ops.push(evmAsm["push"+count](data))
      }
    }
    for(var count = 1; count<=16; count++){
      this["dup"+count] = function(){
        ops.push(evmAsm["dup"+count]())
      }
      this["swap"+count] = function(){
        ops.push(evmAsm["swap"+count]())
      }
    }
    //TODO add log ops
  }

  function label(label){
    ops.push(evmAsm.label(label))
  }

  function caller(){
    ops.push(evmAsm.caller())
  }

  function push(number, data){
    ops.push(evmAsm["push"+number](data))
  }

  function eq(){
    ops.push(evmAsm.eq())
  }

  function jumpi(){
    ops.push(evmAsm.jumpi())
  }

  function returndatasize(){
    ops.push(evmAsm.returndatasize())
  }

  function revert(){
    ops.push(evmAsm.revert())
  }

  function jumpdest(dest){
    ops.push(evmAsm.jumpdest(dest))
  }

  function calldataload(){
    ops.push(evmAsm.calldataload())
  }

  function and(){
    ops.push(evmAsm.and())
  }

  function stop(){
    ops.push(evmAsm.stop())
  }

  function compile(){
    return evm.program(evmAsm).generate()
  }
}


module.exports = {
  Program: Program
}
