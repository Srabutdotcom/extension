import { Constrained, Struct, Uint16 } from "../src/dep.js";

/**
 * Represents extension data in a TLS context.
 * The data is a constrained opaque value with a length between 0 and 2^16 - 1.
 */
export class ExtensionData extends Constrained {
   /** The raw opaque extension data. */
   opaque: Uint8Array;
 
   /**
    * Creates a new `ExtensionData` instance from an opaque value.
    * 
    * @param opaque - The opaque value to initialize the `ExtensionData` instance.
    * @returns An instance of `ExtensionData`.
    */
   static fromOpaque(opaque: Uint8Array): ExtensionData;
 
   /**
    * Parses an `ExtensionData` instance from a serialized array.
    * 
    * @param array - The serialized array containing the `ExtensionData` data.
    * @returns An instance of `ExtensionData`.
    */
   static from(array: Uint8Array): ExtensionData;
 
   /**
    * Constructs a new `ExtensionData` instance.
    * 
    * @param opaque - The opaque value for the extension data.
    */
   constructor(opaque: Uint8Array);
 }
 
 /**
  * Represents an extension in a TLS context.
  * Consists of an extension type and associated extension data.
  */
 export class Extension extends Struct {
   /** The extension type. */
   extension_type: Uint16;
 
   /** The associated extension data. */
   extension_data: Uint8Array;
 
   /**
    * Constructs a new `Extension` instance.
    * 
    * @param extension_type - The type of the extension (as a `Uint16`).
    * @param extension_data - The associated extension data.
    */
   constructor(extension_type: Uint16, extension_data: Uint8Array);
 
   /**
    * Parses an `Extension` instance from a serialized array.
    * 
    * @param array - The serialized array containing the extension data.
    * @returns An instance of `Extension`.
    */
   static from(array: Uint8Array): Extension;
 }
 