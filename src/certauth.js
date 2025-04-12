// @ts-self-types="../type/certauth.d.ts"

import { getUint16, sanitize, unity, vector } from "./dep.ts";

const MAX16_1 = 2 ** 16 - 1;

/**
 * ```
 * opaque DistinguishedName<1..2^16-1>;
 * ```
 * LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.4
 */
class DistinguishedName extends Uint8Array {
   #lengthOf
   #DN

   static from(array) {
      return new DistinguishedName(array)
   }
   constructor(...args) {
      //DistinguishedName.sanitize(args);
      sanitize(args, { min: 1, max: MAX16_1 })
      super(...args)
   }
   get lengthOf() {
      if (this.#lengthOf) return this.#lengthOf
      this.#lengthOf ||= getUint16(this);
      return this.#lengthOf;
   }
   get DN() {
      if (this.#DN) return this.#DN;
      this.#DN ||= this.subarray(2, 2 + this.lengthOf);
      return this.#DN
   }
}

/**
 * ```
 * struct {
          DistinguishedName authorities<3..2^16-1>;
      } CertificateAuthoritiesExtension;
   ```
 */
export class CertificateAuthoritiesExtension extends Uint8Array {
   #lengthOf
   #autorithies // list of DistinguishedName 
   static fromDNs(...DNs) {
      const authorities = unity(...DNs)
      return new CertificateAuthoritiesExtension(
         vector(
            authorities,
            { min: 3, max: MAX16_1 }
         )
      )
   }

   static from(array) {
      return new CertificateAuthoritiesExtension(array)
   }
   constructor(...args) {
      //CertificateAuthoritiesExtension.sanitize(args)
      sanitize(args, { min: 3, max: MAX16_1 })
      super(...args)
   }
   get lengthOf() {
      if (this.#lengthOf) return this.#lengthOf
      this.#lengthOf ||= getUint16(this);
      return this.#lengthOf;
   }
   get authorities() {
      if (this.#autorithies) return this.#autorithies;
      this.#autorithies ||= parseItems(this, 2, this.lengthOf, DistinguishedName);
      return this.#autorithies
   }
}
