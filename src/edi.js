// @ts-self-types="../type/edi.d.ts"
import { Uint32 } from "./dep.ts";

export class Empty extends Uint8Array {
   constructor(){super(0)}
}

/**
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.10
 */
export class EarlyDataIndication extends Uint32 {
   static client_hello() { return Empty.of()}
   static encrypted_extensions(){ return Empty.of()}
   static new_session_ticket(max_early_data_size){ return Uint32.fromValue(max_early_data_size) }
   static fromValue(value) { return new EarlyDataIndication(value) }
   static from(array) {
      const copy = Uint32.from(array);
      return new EarlyDataIndication(copy.value)
   }
   constructor(max_early_data_size) {
      super(max_early_data_size)
   }
}