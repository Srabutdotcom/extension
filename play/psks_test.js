import { Byte, parseItems, Uint16, Uint32 } from "../src/dep.ts";

const offeredPsks = Uint8Array.of(0, 184, 0, 178, 44, 3, 93, 130, 147, 89, 238, 95, 247, 175, 78, 201, 0, 0, 0, 0, 38, 42, 100, 148, 220, 72, 109, 44, 138, 52, 203, 51, 250, 144, 191, 27, 0, 112, 173, 60, 73, 136, 131, 201, 54, 124, 9, 162, 190, 120, 90, 188, 85, 205, 34, 96, 151, 163, 169, 130, 17, 114, 131, 248, 42, 3, 161, 67, 239, 211, 255, 93, 211, 109, 100, 232, 97, 190, 127, 214, 29, 40, 39, 219, 39, 156, 206, 20, 80, 119, 212, 84, 163, 102, 77, 78, 109, 164, 210, 158, 224, 55, 37, 166, 164, 218, 252, 208, 252, 103, 210, 174, 167, 5, 41, 81, 62, 61, 162, 103, 127, 165, 144, 108, 91, 63, 125, 143, 146, 242, 40, 189, 164, 13, 218, 114, 20, 112, 249, 251, 242, 151, 181, 174, 166, 23, 100, 111, 172, 92, 3, 39, 46, 151, 7, 39, 198, 33, 167, 145, 65, 239, 95, 125, 230, 80, 94, 91, 251, 195, 136, 233, 51, 67, 105, 64, 147, 147, 74, 228, 211, 87, 250, 214, 170, 203);

const binder = Byte.create(`3a dd 4f b2 d8 fd f8 22 a0 ca 3c f7 67 8e f5 e8 8d
         ae 99 01 41 c5 92 4d 57 bb 6f a3 1b 9e 5f 9d`);
const binder_0 = crypto.getRandomValues(new Uint8Array(32))

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
class PskBinderEntry extends Byte {
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

const pskBinderEntry_0 = PskBinderEntry.fromBinder(binder);

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
class PskIdentity extends Uint8Array {
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

const pskIdentity_0 = Uint8Array.of(0, 178, 44, 3, 93, 130, 147, 89, 238, 95, 247, 175, 78, 201, 0, 0, 0, 0, 38, 42, 100, 148, 220, 72, 109, 44, 138, 52, 203, 51, 250, 144, 191, 27, 0, 112, 173, 60, 73, 136, 131, 201, 54, 124, 9, 162, 190, 120, 90, 188, 85, 205, 34, 96, 151, 163, 169, 130, 17, 114, 131, 248, 42, 3, 161, 67, 239, 211, 255, 93, 211, 109, 100, 232, 97, 190, 127, 214, 29, 40, 39, 219, 39, 156, 206, 20, 80, 119, 212, 84, 163, 102, 77, 78, 109, 164, 210, 158, 224, 55, 37, 166, 164, 218, 252, 208, 252, 103, 210, 174, 167, 5, 41, 81, 62, 61, 162, 103, 127, 165, 144, 108, 91, 63, 125, 143, 146, 242, 40, 189, 164, 13, 218, 114, 20, 112, 249, 251, 242, 151, 181, 174, 166, 23, 100, 111, 172, 92, 3, 39, 46, 151, 7, 39, 198, 33, 167, 145, 65, 239, 95, 125, 230, 80, 94, 91, 251, 195, 136, 233, 51, 67, 105, 64, 147, 147, 74, 228, 211, 87, 250, 214, 170, 203)
const pskIdentity_1 = PskIdentity.from(pskIdentity_0);
debugger;

/**
 * ```
 * PskIdentity identities<7..2^16-1>;
 * ```
 * identities:  A list of the identities that the client is willing to
      negotiate with the server.  If sent alongside the "early_data"
      extension (see Section 4.2.10), the first identity is the one used
      for 0-RTT data.
 */
class Identities extends Uint8Array {
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
class Binders extends Uint8Array {
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

const binders_0 = Binders.fromBinders(binder, binder_0);


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
      if (start == this.length) return; // binders may have no initial data
      this.#binders ||= Binders.from(this.subarray(start));
      return this.#binders.binders
   }
}

const test_0 = OfferedPsks.from(offeredPsks);
test_0.identities
test_0.binders;

const offeredPsksWithBinders = Byte.create(`
   00 b8 00 b2 2c 03 5d 82 93 59 ee 5f f7 af 4e c9 00
   00 00 00 26 2a 64 94 dc 48 6d 2c 8a 34 cb 33 fa 90 bf 1b 00 70
   ad 3c 49 88 83 c9 36 7c 09 a2 be 78 5a bc 55 cd 22 60 97 a3 a9
   82 11 72 83 f8 2a 03 a1 43 ef d3 ff 5d d3 6d 64 e8 61 be 7f d6
   1d 28 27 db 27 9c ce 14 50 77 d4 54 a3 66 4d 4e 6d a4 d2 9e e0
   37 25 a6 a4 da fc d0 fc 67 d2 ae a7 05 29 51 3e 3d a2 67 7f a5
   90 6c 5b 3f 7d 8f 92 f2 28 bd a4 0d da 72 14 70 f9 fb f2 97 b5
   ae a6 17 64 6f ac 5c 03 27 2e 97 07 27 c6 21 a7 91 41 ef 5f 7d
   e6 50 5e 5b fb c3 88 e9 33 43 69 40 93 93 4a e4 d3 57 fa d6 aa
   cb 00 21 20 3a dd 4f b2 d8 fd f8 22 a0 ca 3c f7 67 8e f5 e8 8d
   ae 99 01 41 c5 92 4d 57 bb 6f a3 1b 9e 5f 9d
   `)

const test_1 = OfferedPsks.from(offeredPsksWithBinders);
test_1.identities
test_1.binders;

const test_2 = OfferedPsks.fromIdentitiesAndBinders(
   Identities.fromIdentities(pskIdentity_0),
   Binders.fromBinders(binder)
)

const _null = null;