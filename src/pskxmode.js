//@ts-self-types="../type/pskxmode.d.ts"
import { Constrained, PskKeyExchangeMode } from "./dep.ts";

export class PskKeyExchangeModes extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      if(lengthOf==0)throw RangeError(`Expected lenght of PskKeyExchangeModes = 1`)
      return new PskKeyExchangeModes(PskKeyExchangeMode.from(copy.subarray(1)))
   }
   static default(){ return new PskKeyExchangeModes(PskKeyExchangeMode.PSK_DHE_KE)}
   constructor(...modes){
      super(1, 255, ...modes.map(e=>e.Uint8))
      this.modes = modes
   }
}

