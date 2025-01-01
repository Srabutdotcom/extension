// @ts-self-types="../type/edi.d.ts"
import { Uint32 } from "./dep.ts";

export class Empty extends Uint8Array {
   constructor(){super(0)}
}

/**
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.10
 */
export class EarlyDataIndication extends Uint8Array {
   static client_hello() { return new EarlyDataIndication(Empty.of())}
   static encrypted_extensions(){ return new EarlyDataIndication(Empty.of())}
   static new_session_ticket(max_early_data_size){ 
      const data = Uint32.fromValue(max_early_data_size) 
      return new EarlyDataIndication(data) 
   }
   static from(array) {
      let data 
      if(!array.length){
         data = Empty.of();
      } else {
         data = Uint32.from(array);
      }
      return new EarlyDataIndication(data)
   }
   constructor(data) {
      super(data);
      this.data = data;
   }
}