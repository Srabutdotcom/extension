// @ts-self-types="../type/oidfilter.d.ts"
// LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.5

import { sanitize, vector16, vector8 } from "./dep.ts";
import { parseItems } from "./dep.ts"

/**
 * ```
 * struct {
          opaque certificate_extension_oid<1..2^8-1>;
          opaque certificate_extension_values<0..2^16-1>;
      } OIDFilter;
   ```
 */
export class OIDFilter extends Uint8Array {
   certificate_extension_oid;
   certificate_extension_values;

   static sanitize(args) {
      const a0 = args[0];
      if (a0 instanceof Uint8Array) {
         const oid = CertificateExtensionOID.from(a0);
         const values = CertificateExtensionValues.from(a0.subarray(oid.length));
         args[0] = a0.subarray(oid.length + values.length);
         return
      }
   }

   static from(array) {
      return new OIDFilter(array);
   }

   constructor(...args) {
      OIDFilter.sanitize(args)
      super(...args)
   }
}
/**
 * ```
 * struct {
          OIDFilter filters<0..2^16-1>;
      } OIDFilterExtension;
   ```
 */
export class OIDFilterExtension extends Uint8Array {
   #oidFilters
   static fromOidFilters(...oidFilters) {
      oidFilters = unity(...oidFilters);
      return new OIDFilterExtension(vector16(oidFilters))
   }
   static from(array) {
      return new OIDFilterExtension(array)
   }
   constructor(...args) {
      sanitize(args, { max: 65535 })
      super(...args)
   }
   get oidFilters(){
      if(this.#oidFilters)return this.#oidFilters;
      this.#oidFilters||= parseItems(this, 2, this.length-2, OIDFilter);
      return this.#oidFilters
   }
}

/**
 * Represents an opaque certificate_extension_oid<1..2^8-1>;
 */
export class CertificateExtensionOID extends Uint8Array {


   static fromValue(value) {
      return new CertificateExtensionOID(vector8(value));
   }

   static from(array) {
      return new CertificateExtensionOID(array);
   }

   constructor(...args) {
      sanitize(args, { min: 1, max: 255 }); // 1 byte length + at least 1 content byte
      super(...args);
   }

   /**
    * Get the actual OID value without the length prefix
    * @returns {Uint8Array}
    */
   get value() {
      return this.subarray(1);
   }
}

/**
 * Represents an opaque certificate_extension_values<0..2^16-1>;
 */
export class CertificateExtensionValues extends Uint8Array {

   static fromValue(value) {
      return new CertificateExtensionValues(vector16(value));
   }

   static from(array) {
      return new CertificateExtensionValues(array);
   }

   constructor(...args) {
      sanitize(args, { max: 65535 }); 
      super(...args);
   }

   get value() {
      return this.subarray(2);
   }
}

export class PostHandshakeAuth extends Uint8Array {
   constructor() { super(0) }
}