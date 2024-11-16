//@ts-self-types="../type/recordsizelimit.d.ts"
import { Uint16 } from "./dep.ts";

/**
 * Represents the Record Size Limit in a TLS context, extending Uint16.
 */
export class RecordSizeLimit extends Uint16 {

   constructor(value) {
      super(value)
   }

   static from(array) {
      const copy = Uint8Array.from(array)
      const value = Uint16.from(copy).value;
      return new RecordSizeLimit(value)
   }

   static fromValue(value) { new RecordSizeLimit(value) }
}
