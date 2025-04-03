import { Byte } from "../src/dep.ts";
import { Uint16, parseItems } from "@tls/struct"

const ca1 = Byte.create([0x30, 0x82, 0x01, 0x0a]); // Example DN
const ca2 = Byte.create([0x30, 0x81, 0xfa]);       // Another example DN

class DistinguishedName extends Uint8Array {
   #lengthOf
   #DN
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         if (args[0].length < 1 || args[0].length > 2 ** 16 - 1) throw new RangeError(`Length must be between 1 and 65535 bytes.`);
         const lengthOf = Uint16.from(args[0]).value;
         args[0] = args[0].slice(0, 2 + lengthOf);
      }
   }
   static from(array) {
      return new DistinguishedName(array)
   }
   constructor(...args) {
      DistinguishedName.sanitize(args);
      super(...args)
   }
   get lengthOf() {
      if (this.#lengthOf) return this.#lengthOf
      this.#lengthOf ||= Uint16.from(this).value;
      return this.#lengthOf;
   }
   get DN() {
      if (this.#DN) return this.#DN;
      this.#DN ||= this.subarray(2, 2 + this.lengthOf);
      return this.#DN
   }
}

export class CertificateAuthoritiesExtension extends Uint8Array {
   #lengthOf
   #autorithies // list of DistinguishedName 
   static fromDNs(...DNs) {
      const authorities = DNs.reduce((previous, current) => {
         current.prepend(Uint16.fromValue(current.length))
         previous.append(current);
         return previous;
      }, Byte.create())
      authorities.prepend(Uint16.fromValue(authorities.length));
      return new CertificateAuthoritiesExtension(authorities)
   }
   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         if (args[0].length < 3 || args[0].length > 2 ** 16 - 1) throw new RangeError(`Length must be between 3 and 65535 bytes.`);
         const lengthOf = Uint16.from(args[0]).value;
         args[0] = args[0].slice(0, 2 + lengthOf);
      }
   }
   static from(array) {
      return new CertificateAuthoritiesExtension(array)
   }
   constructor(...args) {
      CertificateAuthoritiesExtension.sanitize(args)
      super(...args)
   }
   get lengthOf() {
      if (this.#lengthOf) return this.#lengthOf
      this.#lengthOf ||= Uint16.from(this).value;
      return this.#lengthOf;
   }
   get authorities() {
      if (this.#autorithies) return this.#autorithies;
      this.#autorithies ||= parseItems(this, 2, this.lengthOf, DistinguishedName);
      return this.#autorithies
   }
}

const test_0 = CertificateAuthoritiesExtension.fromDNs(ca1, ca2);
const test_1 = CertificateAuthoritiesExtension.from(test_0)
const test_2 = new CertificateAuthoritiesExtension(Uint8Array.of(0, 2, 1, 2, 3))


