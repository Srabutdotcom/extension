//@ts-self-types="../type/pskxmode.d.ts"
import { Constrained, PskKeyExchangeMode } from "./dep.ts";
import { parseItems } from "./utils.js";

export class PskKeyExchangeModes extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      const ke_modes = parseItems(copy, 1, lengthOf, PskKeyExchangeMode);
      return new PskKeyExchangeModes(...ke_modes)
   }
   constructor(...ke_modes) {
      super(1, 255, ...ke_modes.map(e => e.Uint8))
      this.ke_modes = ke_modes;
   }
}

