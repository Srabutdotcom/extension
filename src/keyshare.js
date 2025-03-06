//@ts-self-types = "../type/keyshare.d.ts"
import { Constrained, Uint16, NamedGroup, KeyShareEntry } from "./dep.ts";
import { parseItems } from "./utils.js";

/**
 * Represents a KeyShare extension in the ClientHello message in TLS handshake.
 * This class holds multiple KeyShareEntry instances and manages their constraints.
 */
export class KeyShareClientHello extends Constrained {
   keyShareEntries = new Map
   static fromKeyShareEntries(...keyShareEntries) {
      return new KeyShareClientHello(...keyShareEntries)
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const keyShareEntries = parseItems(copy, 2, lengthOf, KeyShareEntry);
      return new KeyShareClientHello(...keyShareEntries);
   }

   constructor(...keyShareEntries) {
      super(0, 65535, ...keyShareEntries)
      for(const {group, key_exchange} of keyShareEntries){
         this.keyShareEntries.set(group, key_exchange);
      }
   }
}

/**
 * Represents a KeyShare extension in the HelloRetryRequest message.
 * This class manages the NamedGroup for key share negotiation.
 */
export class KeyShareHelloRetryRequest extends Uint16 {

   static fromGroup(group) { return new KeyShareHelloRetryRequest(group) }

   static from(array) {
      const group = NamedGroup.from(array)
      return new KeyShareHelloRetryRequest(group)
   }

   constructor(group) {
      super(group.byte)
      this.group = group
   }
}

/**
 * Represents a KeyShare extension in the ServerHello message in TLS handshake.
 * This class holds a single KeyShareEntry and manages its constraints.
 */
export class KeyShareServerHello extends Uint8Array {

   static fromKeyShareEntry(keyShareEntry) { return new KeyShareServerHello(keyShareEntry) }

   static from(array) {
      const copy = Uint8Array.from(array)
      const keyShareEntry = KeyShareEntry.from(copy);
      return new KeyShareServerHello(keyShareEntry)
   }

   constructor(keyShareEntry) {
      super(keyShareEntry)
      this.group = keyShareEntry.group;
      this.key_exchange = keyShareEntry.key_exchange
   }
}