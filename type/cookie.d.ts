/**
 * LINK - https://www.rfc-editor.org/rfc/rfc8446#section-4.2.2
 * 
 * ```
 * struct {
 *    opaque cookie<1..2^16-1>;
 * } Cookie;
 * ```
 * @version 0.5.8
 */
export class Cookie extends Uint8Array {
   /**
    * Validates and sanitizes the input arguments for Cookie construction.
    * Ensures the length is within the valid range (1 to 2^16-1).
    * @param {any[]} args - Arguments to be sanitized.
    * @throws {RangeError} If the length is out of range.
    */
   static sanitize(args: any[]): void;

   /**
    * Creates a new Cookie instance from a given cookie data.
    * @param {Uint8Array | number[]} cookie - The cookie data.
    * @returns {Cookie} A new Cookie instance.
    */
   static fromCookie(cookie: Uint8Array | number[]): Cookie;

   /**
    * Creates a Cookie instance from an array.
    * @param {Uint8Array} array - The array to convert into a Cookie.
    * @returns {Cookie} A new Cookie instance.
    */
   static from(array: Uint8Array): Cookie;

   /**
    * Constructs a new Cookie instance.
    * @param {...any} args - Arguments for constructing the Cookie.
    */
   constructor(...args: any[]);

   /**
    * Retrieves the cookie data excluding the length prefix.
    * @returns {Uint8Array} The raw cookie data.
    */
   get cookie(): Uint8Array;
}
