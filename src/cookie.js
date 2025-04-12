//@ts-self-types="../type/cookie.d.ts"
import { sanitize, vector } from "./dep.ts"

const MAX16_1 = 2**16-1
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
   
   static fromCookie(cookie) {
      return Cookie.from(vector(cookie,{min:1, max: MAX16_1}))
   }
   static from(array) { return new Cookie(array) }
   constructor(...args) {
      sanitize(args, { min: 1, max: MAX16_1 });
      super(...args)
   }
   get cookie() {
      return this.subarray(2)
   }
}
