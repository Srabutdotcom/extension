import { Uint16 } from "@tls/struct"
/**
 * Represents a Distinguished Name as a `Uint8Array`.
 */
export declare class DistinguishedName extends Uint8Array {
  #lengthOf: Uint8Array;
  #DN: Uint8Array;

  /**
   * Sanitizes the input arguments by ensuring valid length constraints.
   * @param {any[]} args The arguments to sanitize.
   * @throws {RangeError} If the length is not within the valid range.
   */
  static sanitize(args: any[]): void;

  /**
   * Creates a `DistinguishedName` instance from a `Uint8Array`.
   * @param {Uint8Array} array The byte array containing the distinguished name.
   * @returns {DistinguishedName}
   */
  static from(array: Uint8Array): DistinguishedName;

  /**
   * Constructs a `DistinguishedName` instance.
   * @param {...any} args Arguments passed to `Uint8Array`.
   */
  constructor(...args: any[]);

  /**
   * Gets the length of the distinguished name.
   * @returns {Uint16}
   */
  get lengthOf(): Uint16;

  /**
   * Gets the distinguished name data.
   * @returns {Uint8Array}
   */
  get DN(): Uint8Array;
}

/**
 * Represents a Certificate Authorities Extension as a `Uint8Array`.
 */
export declare class CertificateAuthoritiesExtension extends Uint8Array {
  #lengthOf: Uint16;
  #autorithies: DistinguishedName[];

  /**
   * Creates a `CertificateAuthoritiesExtension` instance from multiple distinguished names.
   * @param {...DistinguishedName} DNs The distinguished names.
   * @returns {CertificateAuthoritiesExtension}
   */
  static fromDNs(...DNs: DistinguishedName[]): CertificateAuthoritiesExtension;

  /**
   * Sanitizes the input arguments by ensuring valid length constraints.
   * @param {any[]} args The arguments to sanitize.
   * @throws {RangeError} If the length is not within the valid range.
   */
  static sanitize(args: any[]): void;

  /**
   * Creates a `CertificateAuthoritiesExtension` instance from a `Uint8Array`.
   * @param {Uint8Array} array The byte array containing the extension data.
   * @returns {CertificateAuthoritiesExtension}
   */
  static from(array: Uint8Array): CertificateAuthoritiesExtension;

  /**
   * Constructs a `CertificateAuthoritiesExtension` instance.
   * @param {...any} args Arguments passed to `Uint8Array`.
   */
  constructor(...args: any[]);

  /**
   * Gets the length of the certificate authorities extension.
   * @returns {Uint16}
   */
  get lengthOf(): Uint16;

  /**
   * Gets the list of distinguished names.
   * @returns {DistinguishedName[]}
   */
  get authorities(): DistinguishedName[];
}
