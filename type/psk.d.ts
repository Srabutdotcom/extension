import { Constrained, Uint16, Struct } from "../src/dep.ts";
/**
 * Represents an Identity in the Pre-Shared Key Extension.
 */
export class Identity extends Constrained {
   /**
    * Creates an Identity instance from a Uint8Array.
    * @param array - The array containing the serialized identity.
    * @returns A new Identity instance.
    */
   static from(array: Uint8Array): Identity;
 
   /**
    * Creates an Identity instance from an identity value.
    * @param identity - The raw identity value.
    * @returns A new Identity instance.
    */
   static fromIdentity(identity: Uint8Array): Identity;
 
   /**
    * Constructs an Identity instance.
    * @param identity - The raw identity value.
    */
   constructor(identity: Uint8Array);
 
   /** The raw identity value. */
   identity: Uint8Array;
 }
 
 /**
  * Represents a PSK Binder Entry.
  */
 export class PskBinderEntry extends Constrained {
   /**
    * Creates a PskBinderEntry instance from a Uint8Array.
    * @param array - The array containing the serialized binder entry.
    * @returns A new PskBinderEntry instance.
    */
   static from(array: Uint8Array): PskBinderEntry;
 
   /**
    * Creates a PskBinderEntry instance from a binder entry value.
    * @param binderEntry - The raw binder entry value.
    * @returns A new PskBinderEntry instance.
    */
   static fromBinderEntry(binderEntry: Uint8Array): PskBinderEntry;
 
   /**
    * Constructs a PskBinderEntry instance.
    * @param binderEntry - The raw binder entry value.
    */
   constructor(binderEntry: Uint8Array);
 
   /** The raw binder entry value. */
   binderEntry: Uint8Array;
 }
 
 /**
  * Represents a PSK Identity.
  */
 export class PskIdentity extends Struct {
   /**
    * Creates a PskIdentity instance from a Uint8Array.
    * @param array - The array containing the serialized PSK identity.
    * @returns A new PskIdentity instance.
    */
   static from(array: Uint8Array): PskIdentity;
 
   /**
    * Constructs a PskIdentity instance.
    * @param identity - The raw identity value.
    * @param obfuscated_ticket_age - The obfuscated ticket age.
    */
   constructor(identity: Uint8Array, obfuscated_ticket_age: number);
 
   /** The raw identity value. */
   identity: Uint8Array;
 
   /** The obfuscated ticket age. */
   obfuscated_ticket_age: number;
 }
 
 /**
  * Represents a collection of PSK Identities.
  */
 export class Identities extends Constrained {
   /**
    * Creates an Identities instance from a Uint8Array.
    * @param array - The array containing the serialized identities.
    * @returns A new Identities instance.
    */
   static from(array: Uint8Array): Identities;
 
   /**
    * Creates an Identities instance from multiple PSKIdentity instances.
    * @param pskIdentity - The PSKIdentity instances.
    * @returns A new Identities instance.
    */
   static fromIdentities(...pskIdentity: Uint8Array[]): Identities;
 
   /**
    * Constructs an Identities instance.
    * @param pskIdentity - The PSKIdentity instances.
    */
   constructor(...pskIdentity: Uint8Array[]);
 
   /** The list of PSKIdentity instances. */
   pskIdentity: Uint8Array[];
 }
 
 /**
  * Represents a collection of PSK Binder Entries.
  */
 export class Binders extends Constrained {
   /**
    * Creates a Binders instance from a Uint8Array.
    * @param array - The array containing the serialized binder entries.
    * @returns A new Binders instance.
    */
   static from(array: Uint8Array): Binders;
 
   /**
    * Creates a Binders instance from multiple PskBinderEntry instances.
    * @param pskBinderEntry - The PskBinderEntry instances.
    * @returns A new Binders instance.
    */
   static fromBinders(...pskBinderEntry: Uint8Array[]): Binders;
 
   /**
    * Constructs a Binders instance.
    * @param pskBinderEntry - The PskBinderEntry instances.
    */
   constructor(...pskBinderEntry: Uint8Array[]);
 
   /** The list of PskBinderEntry instances. */
   pskBinderEntry: Uint8Array[];
 }
 
 /**
  * Represents offered PSKs.
  */
 export class OfferedPsks extends Struct {
   /**
    * Creates an OfferedPsks instance from a Uint8Array.
    * @param array - The array containing the serialized offered PSKs.
    * @returns A new OfferedPsks instance.
    */
   static from(array: Uint8Array): OfferedPsks;
 
   /**
    * Constructs an OfferedPsks instance.
    * @param identities - The PSK identities.
    * @param binders - The PSK binder entries.
    */
   constructor(identities: Identities, binders: Binders);
 }
 
 /**
  * Represents the Pre-Shared Key Extension.
  */
 export class PreSharedKeyExtension {
   /**
    * Creates a client hello Pre-Shared Key extension.
    * @param identities - The PSK identities.
    * @param binders - The PSK binder entries.
    * @returns A new OfferedPsks instance.
    */
   static clientHello(identities: Identities, binders: Binders): OfferedPsks;
 
   /**
    * Creates a server hello Pre-Shared Key extension.
    * @param index - The selected identity index.
    * @returns A Uint16 representation of the index.
    */
   static serverHello(index: number): Uint16;
 }
 