const op = (name: string, pops: number, pushes: number, code: number) => {
  return () => ({
    name,
    code,
    pops,
    pushes,
    length: 1
  });
}

const push = (len:number) => (bytes: any) => {
  return ({
    name: 'PUSH' + len,
    pops: 0,
    pushes: 1,
    code: 0x60 + (len - 1),
    length: len + 1,
    arglen: len,
    bytes: bytes
  })
}

const label = (name: string) => ({
  name: 'label (' + name + ')',
  label: name
})

const jumpdest = (name: string) => ({
  name: 'JUMPDEST (' + name + ')',
  label: name,
  code: 0x5b,
  pops: 0,
  pushes: 0,
  length: 1
})

const hexify = (data: any, len = 1) => {
  if (data === undefined) {
    return '';
  } else {
    return ("00".repeat(len) + data.toString(16)).slice(-2 * len)
  }
}
export interface CompiledProgram {
  labels: any,
  code: string
}
const program: (ops: Array<any>)=>CompiledProgram = (ops: Array<any>): CompiledProgram => {

  var labels: any = {};
  var offset = 0;
  ops.forEach(op => {
    if (op.label) {
      labels[op.label] = offset;
    }
    offset += op.length || 0;
  })

  const validate = (label: string) => {
    if (labels[label] === undefined) {
      throw new Error("UNDEFINED LABEL: " + label);
    }
  }

  var code = "0x";
  ops.forEach(op => {
    code += hexify(op.code)
    if (op.arglen > 0) {
      var bytes = op.bytes;
      if (bytes === undefined) {
        throw new Error("Missing byte data: " + bytes);
      }
      if (typeof bytes === 'string') {
        if (bytes.startsWith('0x')) {
          code += ("00".repeat(op.arglen) + bytes.substring(2)).slice(-2 * op.arglen);
        } else {
          if (bytes.indexOf('-') < 0) {
            validate(bytes);
            bytes = labels[bytes];
          } else {
            var [to, from] = bytes.split('-');
            validate(from);
            validate(to);
            bytes = labels[to] - labels[from];
          }
          code += hexify(bytes, op.arglen);
        }
      } else {
        code += hexify(bytes, op.arglen);
      }
    }
  })

  return {
    labels,
    code
  }
}
const lib = {
  hexify,

  stop: op('STOP', 0, 0, 0x0),
  add: op('ADD', 2, 1, 0x1),
  mul: op('MUL', 2, 1, 0x2),
  sub: op('SUB', 2, 1, 0x3),
  div: op('DIV', 2, 1, 0x4),
  sdiv: op('SDIV', 2, 1, 0x5),
  mod: op('MOD', 2, 1, 0x6),
  smod: op('SMOD', 2, 1, 0x7),
  addmod: op('ADDMOD', 3, 1, 0x8),
  mulmod: op('MULMOD', 3, 1, 0x9),
  exp: op('EXP', 2, 1, 0xa),
  signextend: op('SIGNEXTEND', 2, 1, 0xb),

  lt: op('LT', 2, 1, 0x10),
  gt: op('GT', 2, 1, 0x11),
  slt: op('SLT', 2, 1, 0x12),
  sgt: op('SGT', 2, 1, 0x13),
  eq: op('EQ', 2, 1, 0x14),
  iszero: op('ISZERO', 2, 1, 0x15),
  and: op('AND', 2, 1, 0x16),
  or: op('OR', 2, 1, 0x17),
  xor: op('XOR', 2, 1, 0x18),
  not: op('NOT', 1, 1, 0x19),
  byte: op('BYTE', 2, 1, 0x1a),
  shl: op("SHL", 2, 1, 0x1b),
  shr: op("SHR", 2, 1, 0x1c),
  sar: op("SAR", 2, 1, 0x1d),

  sha3: op('SHA3', 2, 1, 0x20),

  address: op('ADDRESS', 0, 1, 0x30),
  balance: op('BALANCE', 1, 1, 0x31),
  origin: op('ORIGIN', 0, 1, 0x32),
  caller: op('CALLER', 0, 1, 0x33),
  callvalue: op('CALLVALUE', 0, 1, 0x34),
  calldataload: op('CALLDATALOAD', 1, 1, 0x35),
  calldatasize: op('CALLDATASIZE', 0, 1, 0x36),
  calldatacopy: op('CALLDATACOPY', 3, 0, 0x37),
  codesize: op('CODESIZE', 0, 1, 0x38),
  codecopy: op('CODECOPY', 3, 0, 0x39),
  gasprice: op('GASPRICE', 0, 1, 0x3a),
  extcodesize: op('EXTCODESIZE', 1, 1, 0x3b),
  extcodecopy: op('EXTCODECOPY', 4, 0, 0x3c),
  returndatasize: op('RETURNDATASIZE', 0, 1, 0x3d),
  returndatacopy: op('RETURNDATACOPY', 3, 0, 0x3e),

  blockhash: op('BLOCKHASH', 1, 1, 0x40),
  coinbase: op('COINBASE', 0, 1, 0x41),
  timestamp: op('TIMESTAMP', 0, 1, 0x42),
  number: op('NUMBER', 0, 1, 0x43),
  difficulty: op('DIFFICULTY', 0, 1, 0x44),
  gaslimit: op('GASLIMIT', 0, 1, 0x45),

  pop: op('POP', 1, 0, 0x50),
  mload: op('MLOAD', 1, 1, 0x51),
  mstore: op('MSTORE', 2, 0, 0x52),
  mstore8: op('MSTORE8', 2, 0, 0x53),
  sload: op('SLOAD', 1, 1, 0x54),
  sstore: op('SSTORE', 2, 0, 0x55),
  jump: op('JUMP', 1, 0, 0x56),
  jumpi: op('JUMPI', 2, 0, 0x57),
  pc: op('PC', 0, 1, 0x58),
  msize: op('MSIZE', 0, 1, 0x59),
  gas: op('GAS', 0, 1, 0x5a),
  jumpdest,

  label,
  program,

  create: op('CREATE', 3, 1, 0xf0),
  call: op('CALL', 7, 1, 0xf1),
  callcode: op('CALLCODE', 7, 1, 0xf2),
  return: op('RETURN', 2, 0, 0xf3),
  delegatecall: op('DELEGATECALL', 6, 1, 0xf4),
  staticcall: op('STATICCALL', 6, 1, 0xfa),
  revert: op('REVERT', 2, 0, 0xfd),
  invalid: op('INVALID', 0, 0, 0xfe),
  selfdestruct: op('SELFDESTRUCT', 1, 0, 0xff)
};

for (var i = 1; i <= 32; i++) {
  (lib as any)['push' + i] = push(i)
}

for (var i = 1; i <= 16; i++) {
  (lib as any)['dup' + i] = op('DUP' + i, i, i + 1, 0x80 + (i - 1))
}

for (var i = 1; i <= 16; i++) {
  (lib as any)['swap' + i] = op('SWAP' + i, i + 1, i + 1, 0x90 + (i - 1))
}

for (var i = 0; i <= 4; i++) {
  (lib as any)['log' + i] = op('LOG' + i, 2 + i, 0, 0xa0 + i)
}

export {lib as evmAsm}