import { Constrained, PskKeyExchangeMode } from "./dep.ts";

export class PskKeyExchangeModes extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      if(lengthOf==0)throw RangeError(`Expected lenght of PskKeyExchangeModes = 1`)
      return new PskKeyExchangeModes(copy.subarray(1))
   }
   static default(){ return new PskKeyExchangeModes(PskKeyExchangeMode.PSK_DHE_KE.Uint8)}
   constructor(...modes){
      super(1, 255, ...modes)
      this.modes = modes
   }
}

