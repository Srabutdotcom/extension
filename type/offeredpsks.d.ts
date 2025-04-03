import { Byte } from "../src/dep.ts";

/**
 * Represents a Pre-Shared Key Binder Entry.
 * ```
 * opaque PskBinderEntry<32..255>;
 * ```
 */
export class PskBinderEntry extends Byte {
   
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
 * Represents a PSK Identity structure.
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
 * Represents a list of PSK identities.
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
 * Represents a list of PSK binder entries.
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
 * Represents the `OfferedPsks` structure, which contains PSK identities and binders.
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
