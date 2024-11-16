// @ts-self-types="../type/certauth.d.ts"
import { Constrained, Uint16 } from "./dep.ts";

export class DistinguishedName extends Constrained {
   opaque
   static fromOpaque(opaque) {
      return new DistinguishedName(opaque)
   }
   static from(array) {
      // Convert DistinguishedName instance to Uint8Array
      const copy =  Uint8Array.from(array)
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      return new DistinguishedName(copy.subarray(2, 2 + lengthOf))
   }
   constructor(opaque) {
      super(1, 65535, opaque);
      this.opaque = opaque
   }
}
/* const distinguishedName = new DistinguishedName(new Uint8Array([1,3,4]))
const back = DistinguishedName.from(distinguishedName); debugger; */

export class CertificateAuthoritiesExtension extends Constrained {
   authorities
   static fromDistinguishedName(...distinguishedName) {
      return new CertificateAuthoritiesExtension(...distinguishedName)
   }
   static from(array) {
      // Convert CertificateAuthoritiesExtension instance to Uint8Array
      const copy =  Uint8Array.from(array)
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const distinguishedNames = []
      for(let offset = 2; offset < lengthOf +2;){
         const distinguishedName = DistinguishedName.from(copy.subarray(offset));
         distinguishedNames.push(distinguishedName);
         offset += distinguishedName.length;
      }
      return CertificateAuthoritiesExtension.from(...distinguishedNames)
   }
   constructor(...distinguishedName) {
      super(1, 65535, ...distinguishedName)
      this.authorities = distinguishedName
   }
}