//@ts-self-types = "../type/signaturealgo.d.ts"
import { Constrained, Uint16 } from "./dep.ts";
import { SignatureScheme } from "./dep.ts";
import { parseItems } from "./utils.js";

export class Supported_signature_algorithms extends Constrained {
   static default(){
      return new Supported_signature_algorithms(
         SignatureScheme.RSA_PSS_RSAE_SHA512.Uint16,
         SignatureScheme.RSA_PSS_RSAE_SHA384.Uint16,
         SignatureScheme.RSA_PSS_RSAE_SHA256.Uint16,
         SignatureScheme.ED25519.Uint16,
         SignatureScheme.ED448.Uint16,
         SignatureScheme.ECDSA_SECP521R1_SHA512.Uint16,
         SignatureScheme.ECDSA_SECP384R1_SHA384.Uint16,
         SignatureScheme.ECDSA_SECP256R1_SHA256.Uint16
      )
   }
   static fromSignatureSchemes(...signatureSchemes){ return new Supported_signature_algorithms(...signatureSchemes)}
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const signatureSchemes = [];
      for(let offset = 2; offset <lengthOf+2;){
         const signatureScheme = SignatureScheme.from(copy.subarray(offset));
         signatureSchemes.push(signatureScheme);
         offset+=2
      }
      const signatureAlgorithms = new Supported_signature_algorithms(...signatureSchemes.map(e=>e.Uint16))
      signatureAlgorithms.signatureSchemes = signatureSchemes
      return signatureAlgorithms
   }
   constructor(...signatureSchemes){
      super(2, 2**16-2, ...signatureSchemes)
   }
}

export class SignatureSchemeList extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const algorithms = parseItems(copy, 2, lengthOf, SignatureScheme);
      return new SignatureSchemeList(...algorithms)
   }
   constructor(...supported_signature_algorithms) {
      super(2, 2 ** 16 - 2, ...supported_signature_algorithms.map(e => e.Uint16))
      this.supported_signature_algorithms = supported_signature_algorithms;
   }
}

