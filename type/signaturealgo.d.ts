import { SignatureScheme } from "@tls/enum"; // Update import path as needed
import { Constrained, Uint16 } from "../src/dep.ts"; // Update import path as needed
import { Struct } from "../src/dep.ts";

/**
 * Represents the supported signature algorithms in a TLS handshake.
 */
export declare class Supported_signature_algorithms extends Constrained {
  /**
   * Creates a default `Supported_signature_algorithms` instance with common signature schemes.
   * @returns {Supported_signature_algorithms} A default instance.
   */
  static default(): Supported_signature_algorithms;

  /**
   * Creates a `Supported_signature_algorithms` instance from the given signature schemes.
   * @param {...Uint16[]} signatureSchemes - The signature schemes to include.
   * @returns {Supported_signature_algorithms} A new instance.
   */
  static fromSignatureSchemes(
    ...signatureSchemes: Uint16[]
  ): Supported_signature_algorithms;

  /**
   * Creates a `Supported_signature_algorithms` instance from a binary array.
   * @param {Uint8Array | number[]} array - The binary data representing the signature schemes.
   * @returns {Supported_signature_algorithms} A new instance.
   */
  static from(array: Uint8Array | number[]): Supported_signature_algorithms;

  /**
   * Constructs a `Supported_signature_algorithms` instance.
   * @param {...Uint16[]} signatureSchemes - The signature schemes to include.
   */
  constructor(...signatureSchemes: Uint16[]);

  /**
   * List of parsed signature schemes.
   * @type {SignatureScheme[]}
   */
  signatureSchemes: SignatureScheme[];
}

/**
 * Represents a list of signature schemes in the TLS handshake.
 */
export declare class SignatureSchemeList extends Constrained {
  /**
   * Parses a `SignatureSchemeList` from a `Uint8Array`.
   * @param array - The input array containing signature schemes data.
   * @returns A new instance of `SignatureSchemeList`.
   * @throws {Error} If the input array is invalid or incomplete.
   */
  static from(array: Uint8Array): SignatureSchemeList;

  /**
   * Constructs a `SignatureSchemeList`.
   * @param supported_signature_algorithms - A list of supported signature schemes.
   * @throws {Error} If the constraints are not satisfied.
   */
  constructor(...supported_signature_algorithms: SignatureScheme[]);

  /**
   * The list of supported signature schemes.
   */
  readonly supported_signature_algorithms: SignatureScheme[];
}
