import {evmAsm, CompiledProgram} from './evm'

export class Program {
    private ops: Array<any>

    constructor() {
        this.ops = []
    }

    public label(label: string): void {
        this.ops.push(evmAsm.label(label))
    }

    public eq():void {
        this.ops.push(evmAsm.eq())
    }

    public sub():void {
        this.ops.push(evmAsm.sub())
    }

    public jumpi():void {
        this.ops.push(evmAsm.jumpi())
    }

    public returndatasize():void {
        this.ops.push(evmAsm.returndatasize())
    }

    public returndatacopy():void {
        this.ops.push(evmAsm.returndatacopy())
    }

    public sha3():void {
        this.ops.push(evmAsm.sha3())
    }

    public revert():void {
        this.ops.push(evmAsm.revert())
    }

    public jumpdest(dest: string):void {
        this.ops.push(evmAsm.jumpdest(dest))
    }

    public calldataload():void {
        this.ops.push(evmAsm.calldataload())
    }

    public calldatasize():void {
        this.ops.push(evmAsm.calldatasize())
    }

    public calldatacopy():void {
        this.ops.push(evmAsm.calldatacopy())
    }

    public and():void {
        this.ops.push(evmAsm.and())
    }

    public or():void {
        this.ops.push(evmAsm.or())
    }

    public not():void {
        this.ops.push(evmAsm.not())
    }

    public stop():void {
        this.ops.push(evmAsm.stop())
    }

    public mstore():void {
        this.ops.push(evmAsm.mstore())
    }

    public mload():void {
        this.ops.push(evmAsm.mload())
    }

    public codecopy():void {
        this.ops.push(evmAsm.codecopy())
    }

    public return():void {
        this.ops.push(evmAsm.return())
    }

    public selfdestruct():void {
        this.ops.push(evmAsm.selfdestruct())
    }

    public div():void {
        this.ops.push(evmAsm.div())
    }

    public caller():void {
        this.ops.push(evmAsm.caller())
    }

    public address():void {
        this.ops.push(evmAsm.address())
    }

    public push(number: number, data: any):void {
        if (typeof number !== "number" || number < 1 || number > 32) {
            throw new Error("This is not a number for push")
        }
        this.ops.push((evmAsm as any)["push" + number](data))
    }

    public dup(number: number):void {
        if (typeof number !== "number" || number < 1 || number > 16) {
            throw new Error("This is not a number for dup")
        }
        this.ops.push((evmAsm as any)["dup" + number]())
    }

    public swap(number: number):void {
        if (typeof number !== "number" || number < 1 || number > 16) {
            throw new Error("This is not a number for swap")
        }
        this.ops.push((evmAsm as any)["swap" + number]())
    }

    public gas():void {
        this.ops.push(evmAsm.gas())
    }

    public call():void {
        this.ops.push(evmAsm.call())
    }

    public delegatecall():void {
        this.ops.push(evmAsm.delegatecall())
    }

    public shr():void {
        this.ops.push(evmAsm.shr())
    }

    public shl():void {
        this.ops.push(evmAsm.shl())
    }

    public sar():void {
        this.ops.push(evmAsm.sar())
    }

    public compile(addLoader: boolean = false): CompiledProgram {
        if(addLoader){
            return evmAsm.program([...loader.getOps(), evmAsm.label('codestart'),...this.ops, evmAsm.label('codeend')])
        }
        return evmAsm.program(this.ops)
    }

    public getOps(): Array<any> {
        return [...this.ops]
    }
}

const loader = new Program()

loader.returndatasize(),                                 // 0
loader.push(1,'codeend-codestart'),                      // codelen 0
loader.dup(1),                                           // codelen codelen 0
loader.push(1,'codestart'),                              // codeoff codelen codelen 0
loader.returndatasize(),                                 // 0 codeoff codelen codelen 0
loader.codecopy(),                                       // codelen 0
loader.dup(2),                                           // 0 codelen 0
loader.return()                                         // 0
