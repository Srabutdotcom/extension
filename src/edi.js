// @ts-self-types="../type/edi.d.ts"
import { uint32, getUint32 } from "./dep.ts";

export class Empty extends Uint8Array {
   constructor() { super(0) }
}

/**
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.10
 * max_early_data_size:  The maximum amount of 0-RTT data that the
      client is allowed to send when using this ticket, in bytes.  Only
      Application Data payload (i.e., plaintext but not padding or the
      inner content type byte) is counted.  A server receiving more than
      max_early_data_size bytes of 0-RTT data SHOULD terminate the
      connection with an "unexpected_message" alert.  Note that servers
      that reject early data due to lack of cryptographic material will
      be unable to differentiate padding from content, so clients
      SHOULD NOT depend on being able to send large quantities of
      padding in early data records.
 */
export class EarlyDataIndication extends Uint8Array {
   static client_hello() { return new EarlyDataIndication(Empty.of()) }
   static encrypted_extensions() { return new EarlyDataIndication(Empty.of()) }
   static new_session_ticket(max_early_data_size) {
      const data = uint32(max_early_data_size)
      return new EarlyDataIndication(data)
   }
   static from(array) {
      let data
      if (!array.length) {
         data = Empty.of();
      } else {
         data = array.subarray(0, 4);
      }
      return new EarlyDataIndication(data)
   }
   constructor(...args) {
      super(...args);
   }
   get value() {
      if (this.length) return getUint32(this);
      return 0;
   }
}

