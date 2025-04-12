//@ts-self-types="../type/extension.d.ts"
import { ExtensionType, unity, getUint16, vector, sanitize } from "./dep.ts";

const MAX16_1 = 2 ** 16 - 1

/**
 * ```
 *     struct {
        ExtensionType extension_type;
        opaque extension_data<0..2^16-1>;
    } Extension;
   ```
 */
export class Extension extends Uint8Array {
   #pos;
   #parser;
   static create(type, data) {
      return new Extension(unity(type.byte, vector(data, { min: 0, max: MAX16_1 })))
   }
   static from(...args) { return new Extension(...args) }
   constructor(...args) {
      sanitize(args, { start: 2, max: MAX16_1 }) // FIXME
      super(...args)
   }
   get type() {
      return ExtensionType.from(this.subarray(0, 2));
   }
   get data() {
      const lengthOf = getUint16(this.subarray(2)); // First 2 bytes represent the length
      const output = this.subarray(4, lengthOf + 4)
      return this.#parser ? this.#parser.from(output) : output;
   }
   set pos(pos) {
      this.#pos = pos;
   }
   get pos() {
      return this.#pos;
   }
   set parser(parser) {
      this.#parser = parser
   }
}

/* function sanitize_0(array) {
   const lengthOf = Uint16.from(array.subarray(2)).value;
   return [array.slice(0, 4 + lengthOf)];
} */

/* function sanitize(args) {
   // Don't sanitize if multiple arguments are passed — assume user knows what they're doing
   if (args.length > 1) return;

   const a_0 = args[0];

   // If it's a number or undefined/null/false — don't sanitize, it's a basic constructor
   if (
      typeof a_0 === 'number' ||
      a_0 === undefined ||
      a_0 === null ||
      a_0 === false
   ) {
      return;
   }

   // If it's an instance of Byte, extract the internal view
   const input = a_0 instanceof Byte ? a_0.view : a_0;

   if (!(input instanceof Uint8Array)) {
      // Not something we can sanitize properly
      throw new TypeError('sanitize: input must be a Byte or Uint8Array');
   }

   // Validate min/max length
   if (input.length < 3 || input.length > 2 ** 16 - 1) {
      throw new RangeError('Length must be between 3 and 65535 bytes');
   }

   const lengthOf = Uint16.from(input.subarray(2)).value;

   // Slice to the length, but safely
   args[0] = input.slice(0, 4 + lengthOf);
} */

