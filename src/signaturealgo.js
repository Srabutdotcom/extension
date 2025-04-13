//@ts-self-types = "../type/signaturealgo.d.ts"
import { sanitize, unity, vector16 } from "./dep.ts";
import { SignatureScheme } from "./dep.ts";
import { parseItems } from "./utils.js";

/* export class Supported_signature_algorithms extends Constrained {
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
} */

/* export class SignatureSchemeList_0 extends Constrained {
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
} */

/**
 * ```  
 * struct {  
 *     SignatureScheme supported_signature_algorithms<2..2^16-2>;  
 * } SignatureSchemeList;  
 * ```  
 */
export class SignatureSchemeList extends Uint8Array {
   #supported_signature_algorithms;

   static fromSchemes(...supported_signature_algorithms) {
      const algos = unity(...supported_signature_algorithms.map(e=>e.byte))
      return new SignatureSchemeList(vector16(algos));
   }

   static from(array) {
      return new SignatureSchemeList(array);
   }

   constructor(...args) {
      sanitize(args, { min: 2, max: 2 ** 16 - 2 });
      super(...args);
   }

   get supported_signature_algorithms() {
      this.#supported_signature_algorithms ||= parseItems(this, 2, this.length - 2, SignatureScheme,
         { store: [] });
      return this.#supported_signature_algorithms;
   }
}


