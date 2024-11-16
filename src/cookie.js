//@ts-self-types="../type/cookie.d.ts"
import { Constrained, Uint16 } from "./dep.ts"
//LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.2
export class Cookie extends Constrained {
   opaque
   static fromOpaque(opaque){ return new Cookie(opaque)}
   static from(array) {
      // Convert Cookie instance to Uint8Array
      const copy = Uint8Array.from(array)
      const length = Uint16.from(copy.subarray(0, 2)).value
      const opaque = copy.subarray(2, 2 + length)
      return new Cookie(opaque)
   }

   constructor(opaque) {
      super(1, 2 ** 16 - 1, opaque)
      this.opaque = opaque
   }
}
/* const cookie = new Cookie(new Uint8Array([1,3,4]))
const back = Cookie.from(cookie); debugger; */