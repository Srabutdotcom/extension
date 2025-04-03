import { Byte, Uint16 } from "../src/dep.ts";

/**
 * LINK - https://www.rfc-editor.org/rfc/rfc8446#section-4.2.2
 * 
 * ```
 * struct {
          opaque cookie<1..2^16-1>;
      } Cookie;
   ```
 */
export class Cookie extends Uint8Array {
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         const lengthOf = Uint16.from(args[0]).value;
         if (lengthOf < 1 || lengthOf > 2 ** 16 - 1) throw new RangeError(`Length of Cookie should be between 1 and 2**16-1`);
         args[0] = args[0].slice(0, 1 + lengthOf);
      }
   }
   static fromCookie(cookie){
      cookie = Byte.create(cookie);
      cookie.prepend(Uint16.fromValue(cookie.length));
      return Cookie.from(cookie)
   }
   static from(array){ return new Cookie(array)}
   constructor(...args) {
      Cookie.sanitize(args);
      super(...args)
   }
   get cookie(){
      return this.subarray(2)
   }
}