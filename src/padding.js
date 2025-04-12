//@ts-self-types="../type/padding.d.ts"

import { vector16, sanitize } from "./dep.ts";

/**
 * 00 15 00 06 00 00 00 00 00 00
   |---| |---| |---------------|
     |     |           |
     |     |           \- extension_data: 6 zero bytes
     |     |
     |     \------------- 16-bit, extension_data length
     |
     \------------------- extension_type for padding extension
 */
export class Padding extends Uint8Array {
   static fromLength(len){ 
      const padding = new Uint8Array(len)
      return new Padding(vector16(padding))
   }
   static from(array){
      return new Padding(array)
   }
   constructor(...args){
      sanitize(args, {max: 2**16-1})
      super(...args);
   }
}

