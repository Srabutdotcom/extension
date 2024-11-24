//@ts-self-types = "../type/keyshare.d.ts"
import { Constrained, Uint16, NamedGroup, Struct } from "./dep.ts";
/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {

   static fromKey(octet) { return new KeyExchange(octet); }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const octet = copy.subarray(2, 2 + lengthOf);
      return new KeyExchange(octet);
   }

   constructor(octet) {
      super(1, 65535, octet);
      this.key_exchange = octet;
   }
}

/**
 * Represents a key share entry.
 */
export class KeyShareEntry extends Struct {
   
   static from(array) {
      const copy = Uint8Array.from(array);
      const group = NamedGroup.from(copy.subarray(0, 2));
      const key_exchange = KeyExchange.from(copy.subarray(2));
      return new KeyShareEntry(group, key_exchange);
   }

   constructor(group, key_exchange) {
      super(group.Uint16, key_exchange);
      this.group = group;
      this.key_exchange = key_exchange.key_exchange;
   }
}

/**
 * Represents a KeyShare extension in the ClientHello message in TLS handshake.
 * This class holds multiple KeyShareEntry instances and manages their constraints.
 */
export class KeyShareClientHello extends Constrained {
   
   static fromKeyShareEntries(...keyShareEntries) {
      return new KeyShareClientHello(...keyShareEntries)
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const l = Uint16.from(copy.subarray(0, 2)).value;
      const keyShareEntries = []
      for (let offset = 2; offset < l;) {
         const keyShareEntry = KeyShareEntry.from(copy.subarray(offset));
         keyShareEntries.push(keyShareEntry);
         offset += keyShareEntry.length
      }
      return new KeyShareClientHello(...keyShareEntries);
   }

   constructor(...keyShareEntries) {
      super(0, 65535, ...keyShareEntries)
      this.keyShareEntries = keyShareEntries
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
      super(+group)
      this.group = group
   }
}

/**
 * Represents a KeyShare extension in the ServerHello message in TLS handshake.
 * This class holds a single KeyShareEntry and manages its constraints.
 */
export class KeyShareServerHello extends Uint16 {

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