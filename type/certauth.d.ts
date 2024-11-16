
import { Constrained } from "../src/dep.ts";

/**
 * Represents a Distinguished Name (DN) in a certificate.
 */
export class DistinguishedName extends Constrained {
  /**
   * The raw byte representation of the Distinguished Name.
   */
  opaque: Uint8Array;

  /**
   * Parses a `DistinguishedName` instance from its opaque representation.
   * 
   * @param opaque - The raw byte data of the Distinguished Name.
   * @returns A new `DistinguishedName` instance.
   */
  static fromOpaque(opaque: Uint8Array): DistinguishedName;

  /**
   * Parses a `DistinguishedName` instance from a `Uint8Array`.
   * 
   * @param array - The serialized array containing the Distinguished Name data.
   * @returns A new `DistinguishedName` instance.
   */
  static from(array: Uint8Array): DistinguishedName;

  /**
   * Constructs a new `DistinguishedName` instance.
   * 
   * @param opaque - The raw byte data of the Distinguished Name.
   */
  constructor(opaque: Uint8Array);
}

/**
 * Represents the Certificate Authorities Extension that holds a list of Distinguished Names.
 */
export class CertificateAuthoritiesExtension extends Constrained {
  /**
   * The list of Distinguished Name instances representing the certificate authorities.
   */
  authorities: DistinguishedName[];

  /**
   * Creates a `CertificateAuthoritiesExtension` from an array of Distinguished Name instances.
   * 
   * @param distinguishedName - The Distinguished Name instances to include in the extension.
   * @returns A new `CertificateAuthoritiesExtension` instance.
   */
  static fromDistinguishedName(...distinguishedName: DistinguishedName[]): CertificateAuthoritiesExtension;

  /**
   * Parses a `CertificateAuthoritiesExtension` instance from a `Uint8Array`.
   * 
   * @param array - The serialized array containing the Certificate Authorities Extension data.
   * @returns A new `CertificateAuthoritiesExtension` instance.
   */
  static from(array: Uint8Array): CertificateAuthoritiesExtension;

  /**
   * Constructs a new `CertificateAuthoritiesExtension` instance.
   * 
   * @param distinguishedName - The Distinguished Name instances representing the certificate authorities.
   */
  constructor(...distinguishedName: DistinguishedName[]);
}
