//@ts-self-types = "../type/keyshare.d.ts"
import { Uint16, NamedGroup, sanitize, unity, vector, getUint16 } from "./dep.ts";
import { parseItems } from "./utils.js";

const MAX16_1 = 2 ** 16 - 1

/**
 * 
 * ```
 * struct {
          NamedGroup group;
          opaque key_exchange<1..2^16-1>;
      } KeyShareEntry;
   ```
 */
export class KeyShareEntry extends Uint8Array {
   #group
   #key_exchange
   static fromGroup(group) {
      const keyShare = group.publicKey;
      return new KeyShareEntry(
         unity(
            group.byte,
            vector(keyShare, { min: 1, max: MAX16_1 })
         )
      )
   }
   static from(array) { return new KeyShareEntry(array) }
   constructor(...args) {
      sanitize(args, { start: 2, min: 1, max: MAX16_1 })
      super(...args)
   }
   get group() {
      if (this.#group) return this.#group;
      this.#group ||= NamedGroup.from(this.subarray(0));
      return this.#group;
   }
   get key_exchange() {
      if (this.#key_exchange) return this.#key_exchange;
      this.#key_exchange ||= this.subarray(4);
      return this.#key_exchange;
   }
}
/**
 * FIXME
 * Represents a KeyShare extension in the ClientHello message in TLS handshake.
 * This class holds multiple KeyShareEntry instances and manages their constraints.
 * ```
 * struct {
 *    KeyShareEntry client_shares<0..2^16-1>;
   } KeyShareClientHello;
   ```
 */
export class KeyShareClientHello extends Uint8Array {
   #client_shares //= new Map
   static fromKeyShareEntries(...keyShareEntries) {
      keyShareEntries = unity(...keyShareEntries)
      return new KeyShareClientHello(vector(keyShareEntries, { min: 0, max: MAX16_1 }))
   }

   static fromGroups(...groups){
      const keyShareEntries = unity(...groups.map(group=>KeyShareEntry.fromGroup(group)));
      return new KeyShareClientHello(vector(keyShareEntries, { min: 0, max: MAX16_1 }))
   }

   static from(array) {
      return new KeyShareClientHello(array);
   }

   constructor(...args) {
      //super(0, 65535, ...keyShareEntries)
      sanitize(args, {min: 0, max: MAX16_1})
      super(...args)
   }
   get client_shares(){
      if(this.#client_shares)return this.#client_shares;
      this.#client_shares||= parseItems(this, 2, getUint16(this), KeyShareEntry, 
      {store: new Map, storeset:(store,data)=>store.set(data.group, data.key_exchange)});
      return this.#client_shares
   }
}

/**
 * Represents a KeyShare extension in the HelloRetryRequest message.
 * This class manages the NamedGroup for key share negotiation.
 */
export class KeyShareHelloRetryRequest extends Uint16 {

   static fromGroup(group) { return new KeyShareHelloRetryRequest(group.byte) }

   static from(array) {
      const group = NamedGroup.from(array)
      return KeyShareHelloRetryRequest.fromGroup(group)
   }
   get group() { return NamedGroup.from(this) }
}

/**
 * Represents a KeyShare extension in the ServerHello message in TLS handshake.
 * This class holds a single KeyShareEntry and manages its constraints.
 */
export class KeyShareServerHello extends KeyShareEntry {
   constructor(...args) {
      super(...args)
   }
}