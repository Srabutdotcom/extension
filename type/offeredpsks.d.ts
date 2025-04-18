import { Uint32 } from "../src/dep.ts"

/**
 * Represents a 32-bit unsigned integer value, extended from Uint32.
 * @version 0.5.9
 */
export class TicketAge extends Uint32 {}


/**
 * Represents an opaque identity<1..2^16-1>;
 * @version 0.5.9
 */
export class Identity extends Uint8Array {

   /**
    * Create a new Identity instance from raw value(s)
    * @param value - A Uint8Array or array of Uint8Array to encode
    */
   static fromValue(value: Uint8Array | Uint8Array[]): Identity;

   /**
    * Create a new Identity instance from a pre-encoded Uint8Array
    * @param array - Pre-encoded data
    */
   static from(array: Uint8Array): Identity;

   /**
    * Constructs a new Identity
    * @param args - Arguments passed to the base Uint8Array constructor
    */
   constructor(...args: ConstructorParameters<typeof Uint8Array>);

   /**
    * The value of the identity, excluding the 2-byte length prefix
    */
   get value(): Uint8Array;
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
   @version 0.5.9
 */
export class PskBinderEntry extends Uint8Array {
   
   /**
    * Creates a `PskBinderEntry` from a given binder.
    * @param {Uint8Array} binder - The binder data.
    * @returns {PskBinderEntry}
    */
   static fromBinder(binder: Uint8Array): PskBinderEntry;

   /**
    * Creates an instance from an array.
    * @param {Uint8Array} array - The array data.
    * @returns {PskBinderEntry}
    */
   static from(array: Uint8Array): PskBinderEntry;
   
   /**
    * The actual binder data without the length prefix.
    * @returns {Uint8Array}
    */
   get binder(): Uint8Array;
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
   @version 0.5.9 
 */
export class PskIdentity extends Uint8Array {
   /**
    * Creates a `PskIdentity` from an identity and an obfuscated ticket age.
    * @param {Uint8Array} identity - The identity value.
    * @param {number} ticketAge - The obfuscated ticket age.
    * @returns {PskIdentity}
    */
   static fromIdentityAndTicketAge(identity: Uint8Array, ticketAge: number): PskIdentity;
   
   /**
    * Creates an instance from an array.
    * @param {Uint8Array} array - The array data.
    * @returns {PskIdentity}
    */
   static from(array: Uint8Array): PskIdentity;
   
   /**
    * The identity data.
    * @returns {Uint8Array}
    */
   get identity(): Uint8Array;
   
   /**
    * The obfuscated ticket age.
    * @returns {Uint8Array}
    */
   get ticketAge(): Uint8Array;
}

/**
 * ```
 * PskIdentity identities<7..2^16-1>;
 * ```
 * identities:  A list of the identities that the client is willing to
      negotiate with the server.  If sent alongside the "early_data"
      extension (see Section 4.2.10), the first identity is the one used
      for 0-RTT data.
   @version 0.5.9
 */
export class Identities extends Uint8Array {
   /**
    * Ensures that the identities structure follows the correct format.
    * @param {any[]} args - Arguments passed to the constructor.
    */
   static sanitize(args: any[]): void;
   
   /**
    * Creates `Identities` from multiple `PskIdentity` instances.
    * @param {...PskIdentity} identities - The PSK identities.
    * @returns {Identities}
    */
   static fromIdentities(...identities: PskIdentity[]): Identities;
   
   /**
    * Creates an instance from an array.
    * @param {Uint8Array} array - The array data.
    * @returns {Identities}
    */
   static from(array: Uint8Array): Identities;
   
   /**
    * A list of parsed identities.
    * @returns {PskIdentity[]}
    */
   get identities(): PskIdentity[];
}

/**
 * ```
 * PskBinderEntry binders<33..2^16-1>;
 * ```
 * binders:  A series of HMAC values, one for each value in the
      identities list and in the same order, computed as described
      below.
   @version 0.5.9
 */
export class Binders extends Uint8Array {
   /**
    * Ensures that the binders structure follows the correct format.
    * @param {any[]} args - Arguments passed to the constructor.
    */
   static sanitize(args: any[]): void;
   
   /**
    * Creates `Binders` from multiple `PskBinderEntry` instances.
    * @param {...Uint8Array} binders - The binder entries.
    * @returns {Binders}
    */
   static fromBinders(...binders: Uint8Array[]): Binders;
   
   /**
    * Creates an instance from an array.
    * @param {Uint8Array} array - The array data.
    * @returns {Binders}
    */
   static from(array: Uint8Array): Binders;
   
   /**
    * A list of parsed binders.
    * @returns {PskBinderEntry[]}
    */
   get binders(): PskBinderEntry[];
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
   @version 0.5.9
 */
export class OfferedPsks extends Uint8Array {
   /**
    * Creates an instance from identities and binders.
    * @param {Identities} identities - The PSK identities.
    * @param {Binders} binders - The PSK binders.
    * @returns {OfferedPsks}
    */
   static fromIdentitiesAndBinders(identities: Identities, binders: Binders): OfferedPsks;
   
   /**
    * Creates an instance from an array.
    * @param {Uint8Array} array - The array data.
    * @returns {OfferedPsks}
    */
   static from(array: Uint8Array): OfferedPsks;
   
   /**
    * The list of identities.
    * @returns {PskIdentity[]}
    */
   get identities(): PskIdentity[];
   
   /**
    * The list of binders.
    * @returns {PskBinderEntry[] | undefined}
    */
   get binders(): PskBinderEntry[] | undefined;
}
