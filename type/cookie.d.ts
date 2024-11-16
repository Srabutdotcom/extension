import { Constrained } from "../src/dep.js";
/**
 * Represents the `Cookie` structure, which is defined as `opaque cookie<1..2^16-1>` in TLS specifications.
 */
export class Cookie extends Constrained {
   /**
    * The `opaque` field representing the raw cookie data.
    */
   opaque: Uint8Array;

   /**
    * Creates a `Cookie` instance from the provided `opaque` data.
    * @param opaque - The opaque cookie data as a `Uint8Array`.
    * @returns A new `Cookie` instance.
    */
   static fromOpaque(opaque: Uint8Array): Cookie;

   /**
    * Creates a `Cookie` instance from a serialized `Uint8Array`.
    * The first two bytes of the array define the length of the `opaque` field,
    * followed by the actual `opaque` data.
    *
    * @param array - The serialized array containing the cookie data.
    * @returns A new `Cookie` instance.
    */
   static from(array: Uint8Array): Cookie;

   /**
    * Constructs a new `Cookie` instance.
    *
    * @param opaque - The opaque cookie data as a `Uint8Array`.
    */
   constructor(opaque: Uint8Array);
}
