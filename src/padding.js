//@ts-self-types="../type/padding.d.ts"

import { Uint16 } from "./dep.ts";

export class Padding extends Uint8Array {
   static fromLength(len){ return new Padding(len)}
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      return new Padding(lengthOf)
   }
   constructor(len){
      super(len);
   }
}
