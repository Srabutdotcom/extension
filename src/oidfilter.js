// @ts-self-types="../type/oidfilter.d.ts"
// LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.5

import { Uint16, Uint8, Struct, Constrained } from "./dep.ts";

export class OIDFilter extends Struct {
   certificate_extension_oid;
   certificate_extension_values;

   static from(array) {
      // Convert OIDFilter instance to Uint8Array
      const copy = Uint8Array.from(array)

      const oid = CertificateExtensionOid.from(copy);
      const values = CertificateExtensionValues.from(copy.subarray(oid.length));
      return new OIDFilter(oid, values);
   }

   constructor(certificate_extension_oid, certificate_extension_values) {
      super(certificate_extension_oid, certificate_extension_values);
      this.certificate_extension_oid = certificate_extension_oid;
      this.certificate_extension_values = certificate_extension_values;
   }
}

export class OIDFilterExtension extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array)
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const oidfilters = []
      for(let offset = 2; offset< lengthOf+2;){
         const oidFilter = OIDFilter.from(copy.subarray(offset));
         oidfilters.push(oidFilter);
         offset += oidFilter.length;
      }
      return new OIDFilterExtension(...oidfilters)
   }
   constructor(...oidfilters) {
      super(0, 65535, ...oidfilters)
      this.oidFilters = oidfilters
   }
}

// CertificateExtensionOid class represents opaque certificate_extension_oid<1..2^8-1>
export class CertificateExtensionOid extends Constrained {
   opaque

   static fromOpaque(opaque) {
      return new CertificateExtensionOid(opaque);
   }

   static from(array) {
      // Convert CertificateExtensionOid instance to Uint8Array
      const copy = Uint8Array.from(array)
      const lengthOf = Uint8.from(copy.subarray(0, 1)).value;
      const opaque = copy.subarray(1, 1 + lengthOf);
      return new CertificateExtensionOid(opaque);
   }

   constructor(opaque) {
      super(1, 255, opaque);
      this.opaque = opaque
   }
}

// CertificateExtensionValues class represents opaque certificate_extension_values<0..2^16-1>
export class CertificateExtensionValues extends Constrained {
   opaque

   static fromOpaque(opaque) {
      return new CertificateExtensionValues(opaque);
   }

   static from(array) {
      // Convert CertificateExtensionValues instance to Uint8Array
      const copy =  Uint8Array.from(array) 

      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const opaque = copy.subarray(2, 2 + lengthOf);
      return new CertificateExtensionValues(opaque);
   }
   constructor(opaque) {
      super(0, 65535, opaque);
      this.opaque = opaque
   }
}

export class PostHandshakeAuth extends Uint8Array {
   constructor(){super(0)}
}