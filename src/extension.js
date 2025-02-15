//@ts-self-types="../type/extension.d.ts"
import { ExtensionType, safeuint8array, Uint16 } from "./dep.ts";

export class Extension extends Uint8Array {
   static create(type, data) {
      const lengthOf = Uint16.fromValue(data.length);
      return new Extension(safeuint8array(type.byte, lengthOf, data))
   }
   static from(...args) { return new Extension(...args) }
   constructor(...args) {
      args = (args[0] instanceof Uint8Array) ? sanitize(args[0]) : args
      super(...args)
   }
   get type() {
      return ExtensionType.from(this.subarray(0, 2));
   }
   get data() {
      const lengthOf = Uint16.from(this.subarray(2)).value; // First 2 bytes represent the length
      return this.subarray(4, lengthOf + 4);
   }
}

function sanitize(array){
   const lengthOf = Uint16.from(array.subarray(2)).value;
   return array.slice(0, 4 + lengthOf);
}