/**
 * Represents a padding sequence used in cryptographic protocols.
 * -  Optionally adding, removing, or changing the length of the
      "padding" extension [RFC7685].
 * @version 0.5.7
 */
export class Padding extends Uint8Array {
   /**
    * Creates a `Padding` instance of the specified length.
    * 
    * @param {number} len - The length of the padding in bytes.
    * @returns {Padding} A new `Padding` instance.
    */
   static fromLength(len: number): Padding;
 
   /**
    * Creates a `Padding` instance from a given array.
    * The length of the padding is determined by the first two bytes of the array.
    * 
    * @param {Uint8Array} array - The array containing the padding data.
    * @returns {Padding} A new `Padding` instance.
    */
   static from(array: Uint8Array): Padding;
 
   /**
    * Constructs a `Padding` instance of the specified length.
    * 
    * @param {...any} args - The length of the padding in bytes.
    */
   constructor(...args: any[]);
 }
 