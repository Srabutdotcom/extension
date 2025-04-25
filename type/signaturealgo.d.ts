import { SignatureScheme } from "../src/dep.ts";

/**
 * Represents a list of supported signature schemes.
 * 
 * Reference: RFC 8446 - TLS 1.3  
 * 
 * ```
 * struct {
 *     SignatureScheme supported_signature_algorithms<2..2^16-2>;
 * } SignatureSchemeList;
 * ```
 * @version 0.6.3
 */
export class SignatureSchemeList extends Uint8Array {
  /** @internal */
  #supported_signature_algorithms: SignatureScheme[];

  /**
   * Validates and sanitizes the input arguments.
   * Ensures the length is within the allowed range (2 to 2^16-2).
   * 
   * @param {any[]} args - The input arguments to sanitize.
   * @throws {RangeError} If the length is out of bounds.
   */
  static sanitize(args: any[]): void;

  /**
   * Creates a `SignatureSchemeList` from multiple `SignatureScheme` instances.
   * 
   * @param {...(SignatureScheme | Uint8Array)} supported_signature_algorithms - The signature schemes to include.
   * @returns {SignatureSchemeList} A new instance of `SignatureSchemeList`.
   */
  static fromSchemes(...supported_signature_algorithms: (SignatureScheme | Uint8Array)[]): SignatureSchemeList;

  /**
   * Creates a `SignatureSchemeList` instance from a given array.
   * 
   * @param {Uint8Array} array - The input array.
   * @returns {SignatureSchemeList} A new instance of `SignatureSchemeList`.
   */
  static from(array: Uint8Array): SignatureSchemeList;

  /**
   * Constructs a `SignatureSchemeList` instance.
   * 
   * @param {...any} args - The constructor arguments.
   */
  constructor(...args: any[]);

  /**
   * Gets the list of supported signature algorithms.
   * 
   * @returns {SignatureScheme[]} The parsed signature schemes.
   */
  get supported_signature_algorithms(): SignatureScheme[];
}
