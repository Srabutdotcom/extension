//@ts-self-types="../type/offeredpsks.d.ts"
import { Byte, parseItems, Uint16, Uint32 } from "./dep.ts";

/**
 * ```
 * opaque PskBinderEntry<32..255>;
 * ```
 * binders:  A series of HMAC values, one for each value in the
      identities list and in the same order, computed as described
      below.
      computed as an HMAC
   over a transcript hash (see Section 4.4.1) containing a partial
   ClientHello up to and including the PreSharedKeyExtension.identities
   field.  That is, it includes all of the ClientHello but not the
   binders list itself.  The length fields for the message (including
   the overall length, the length of the extensions block, and the
   length of the "pre_shared_key" extension) are all set as if binders
   of the correct lengths were present.
   The PskBinderEntry is computed in the same way as the Finished
   message (Section 4.4.4) but with the BaseKey being the binder_key
   derived via the key schedule from the corresponding PSK which is
   being offered (see Section 7.1).
 */
export class PskBinderEntry extends Byte {
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         const lengthOf = args[0][0];
         if (lengthOf < 32 || lengthOf > 255) throw new RangeError(`Length of PskBinderEntry should be between 32 and 255`);
         args[0] = args[0].slice(0, 1 + lengthOf)
      }
   }
   static fromBinder(binder) {
      binder = Byte.create(binder);
      binder.prepend([binder.length]);
      return new PskBinderEntry(binder)
   }
   static from(array) { return new PskBinderEntry(array) }
   constructor(...args) {
      PskBinderEntry.sanitize(args)
      super(...args)
   }
   get binder() {
      return this.subarray(1)
   }
}

/**
 * ```
 * struct {
          opaque identity<1..2^16-1>;
          uint32 obfuscated_ticket_age;
      } PskIdentity;
   ```
   identity:  A label for a key.  For instance, a ticket (as defined in
      Appendix B.3.4) or a label for a pre-shared key established
      externally. Ticket in newSessionTicket send after finished handshake
      by server.
   obfuscated_ticket_age:  An obfuscated version of the age of the key.
      Section 4.2.11.1 describes how to form this value for identities
      established via the NewSessionTicket message.  For identities
      established externally, an obfuscated_ticket_age of 0 SHOULD be
      used, and servers MUST ignore the value.  
 */
export class PskIdentity extends Uint8Array {
   #lengthOf
   #identity
   #ticketAge
   static fromIdentityAndTicketAge(identity, ticketAge) {
      const array = Byte.create(identity);
      array.prepend(Uint16.from(identity.length));
      array.append(Uint32.from(ticketAge));
      return PskIdentity.from(array)
   }
   static from(array) { return new PskIdentity(array) }
   constructor(...args) {
      super(...args)
   }

   get identity() {
      this.#lengthOf ||= Uint16.from(this).value;
      this.#identity ||= this.subarray(2, 2 + this.#lengthOf);
      return this.#identity;
   }
   get ticketAge() {
      this.#ticketAge ||= this.subarray(this.identity.length + 2);
      return this.#ticketAge
   }
}

/**
 * ```
 * PskIdentity identities<7..2^16-1>;
 * ```
 * identities:  A list of the identities that the client is willing to
      negotiate with the server.  If sent alongside the "early_data"
      extension (see Section 4.2.10), the first identity is the one used
      for 0-RTT data.
 */
export class Identities extends Uint8Array {
   #identities
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         const lengthOf = Uint16.from(args[0]).value;
         if (lengthOf < 7 || lengthOf > 2 ** 16 - 1) throw new RangeError(`Length should be between 7 and 2**16-1`);
         args[0] = args[0].slice(0, 2 + lengthOf)
      }
   }
   static fromIdentities(...identities) {
      const array = identities.reduce((previous, current) => {
         previous.append(current);
         return previous
      }, Byte.create())
      array.prepend(Uint16.fromValue(array.length));
      return Identities.from(array)
   }
   static from(array) { return new Identities(array) }
   constructor(...args) {
      Identities.sanitize(args)
      super(...args)
   }
   get identities() {
      this.#identities ||= parseItems(this, 2, this.length - 2, PskIdentity);
      return this.#identities
   }
}

/**
 * ```
 * PskBinderEntry binders<33..2^16-1>;
 * ```
 * binders:  A series of HMAC values, one for each value in the
      identities list and in the same order, computed as described
      below.
 */
export class Binders extends Uint8Array {
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         const lengthOf = Uint16.from(args[0]).value;
         if (lengthOf < 33 || lengthOf > 2 ** 16 - 1) throw new RangeError(`Length of PskBinderEntry should be between 33 and 2**16-1`);
         args[0] = args[0].slice(0, 2 + lengthOf)
      }
   }
   static fromBinders(...binders) {
      const joined = binders.reduce((previous, current) => {
         current = PskBinderEntry.fromBinder(current);
         previous.append(current);
         return previous
      }, Byte.create())
      joined.prepend(Uint16.fromValue(joined.length));
      return new Binders(joined)
   }
   static from(array) { return new Binders(array) }
   constructor(...args) {
      Binders.sanitize(args)
      super(...args)
   }
   get binders() {
      return parseItems(this, 2, this.length - 2, PskBinderEntry);
   }
}

/**
 * ```
 * struct {
          PskIdentity identities<7..2^16-1>;
          PskBinderEntry binders<33..2^16-1>;
      } OfferedPsks;
   ```
   identities:  A list of the identities that the client is willing to
      negotiate with the server.  If sent alongside the "early_data"
      extension (see Section 4.2.10), the first identity is the one used
      for 0-RTT data.

   binders:  A series of HMAC values, one for each value in the
      identities list and in the same order, computed as described
      below.
 */
export class OfferedPsks extends Uint8Array {
   #identities
   #binders
   static fromIdentitiesAndBinders(identities, binders){
      const joined = Byte.create(identities);
      joined.append(binders);
      return OfferedPsks.from(joined)
   }
   static from(array) { return new OfferedPsks(array) }
   constructor(...args) {
      super(...args)
   }
   get identities() {
      if (this.#identities) return this.#identities
      /* const lengthOf = Uint16.from(this).value;
      if (lengthOf < 7 || lengthOf > 2 ** 16 - 1) throw new RangeError(`Length should be between 7 and 2**16-1`); */
      this.#identities ||= Identities.from(this.subarray());
      return this.#identities.identities
   }
   get binders() {
      if (this.#binders) return this.#binders;
      const start = this.#identities.length;
      if (start == this.length) return undefined; // binders may have no initial data
      this.#binders ||= Binders.from(this.subarray(start));
      return this.#binders.binders
   }
}