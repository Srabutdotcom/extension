//@ts-self-types="../type/offeredpsks.d.ts"
import { sanitize, Uint32, Uint16, unity, vector, vector16 } from "./dep.ts";
import { parseItems } from "./utils.js"

export class TicketAge extends Uint32 {}

/**
 * Represents an opaque identity<1..2^16-1>;
 */
export class Identity extends Uint8Array {

   static fromValue(value) {
      return new Identity(vector16(value));
   }

   static from(array) {
      return new Identity(array);
   }

   constructor(...args) {
      sanitize(args, { min: 1, max: 65535 });
      super(...args);
   }

   get value() {
      return this.subarray(2);
   }
}

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
export class PskBinderEntry extends Uint8Array {
   static fromBinder(binder) {
      return new PskBinderEntry(vector(binder, { min: 32, max: 255 }))
   }
   static from(array) { return new PskBinderEntry(array) }
   constructor(...args) {
      sanitize(args, { min: 32, max: 255 })
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
   static sanitize(args) {
      const a0 = args[0];
      if (a0 instanceof Uint8Array) {
         const lengthOf = Uint16.from(a0).value;
         args[0] = args[0].subarray(0, lengthOf + 6);
         return
      }
   }
   static fromIdentityAndTicketAge(identity, ticketAge) {
      identity = Identity.fromValue(identity);//vector(identity, { min: 1, max: 2 ** 16 - 1 })
      ticketAge = TicketAge.from(ticketAge);//ticketAge.subarray(0, 4)
      return PskIdentity.from(unity(identity, ticketAge))
   }
   static from(array) { return new PskIdentity(array) }
   constructor(...args) {
      PskIdentity.sanitize(args);
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
   static fromIdentities(...identities) {
      identities = unity(...identities)
      return Identities.from(vector(identities, { min: 7, max: 2 ** 16 - 1 }))
   }
   static from(array) { return new Identities(array) }
   constructor(...args) {
      sanitize(args, { min: 7, max: 2 ** 16 - 1 })
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
   static fromBinders(...binders) {
      binders = unity(...binders);
      return new Binders(vector(binders, { min: 33, max: 2 ** 16 - 1 }))
   }
   static from(array) { return new Binders(array) }
   constructor(...args) {
      sanitize(args, { min: 33, max: 2 ** 16 - 1 })
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
   static sanitize(args) {
      const a0 = args[0];
      if (a0 instanceof Uint8Array) {
         const identities = Identities.from(a0);
         if (a0.length >= identities.length) {
            const endIndex = a0.length > identities.length
               ? identities.length + Binders.from(a0.subarray(identities.length)).length
               : identities.length;
            args[0] = args[0].subarray(0, endIndex);
            return
         }
      }
   }
   static fromIdentitiesAndBinders(identities, binders) {
      identities = Identities.from(identities);
      binders = Binders.from(binders)
      return OfferedPsks.from(unity(identities, binders))
   }
   static from(array) { return new OfferedPsks(array) }
   constructor(...args) {
      OfferedPsks.sanitize(args)
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
      if (start == this.length) return undefined; // binders may have no data
      this.#binders ||= Binders.from(this.subarray(start));
      return this.#binders.binders
   }
}