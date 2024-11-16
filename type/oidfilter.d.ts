import { Constrained, Struct } from "../src/dep.js";

/**
 * Represents an OIDFilter containing a certificate extension OID and its associated values.
 */
export class OIDFilter extends Struct {
  /**
   * The certificate extension OID.
   */
  certificate_extension_oid: CertificateExtensionOid;

  /**
   * The certificate extension values.
   */
  certificate_extension_values: CertificateExtensionValues;

  /**
   * Parses an `OIDFilter` instance from a `Uint8Array`.
   *
   * @param array - The serialized array containing the OIDFilter data.
   * @returns A new `OIDFilter` instance.
   */
  static from(array: Uint8Array): OIDFilter;

  /**
   * Constructs a new `OIDFilter` instance.
   *
   * @param certificate_extension_oid - The `CertificateExtensionOid` object.
   * @param certificate_extension_values - The `CertificateExtensionValues` object.
   */
  constructor(
    certificate_extension_oid: CertificateExtensionOid,
    certificate_extension_values: CertificateExtensionValues,
  );
}

/**
 * Represents an extension that contains a list of `OIDFilter` objects.
 */
export class OIDFilterExtension extends Constrained {
  /**
   * The array of `OIDFilter` instances.
   */
  oidFilters: OIDFilter[];

  /**
   * Parses an `OIDFilterExtension` instance from a `Uint8Array`.
   *
   * @param array - The serialized array containing the OIDFilterExtension data.
   * @returns A new `OIDFilterExtension` instance.
   */
  static from(array: Uint8Array): OIDFilterExtension;

  /**
   * Constructs a new `OIDFilterExtension` instance.
   *
   * @param oidfilters - The list of `OIDFilter` objects.
   */
  constructor(...oidfilters: OIDFilter[]);
}

/**
 * Represents an opaque certificate extension OID of length 1 to 255.
 */
export class CertificateExtensionOid extends Constrained {
  /**
   * The raw byte representation of the OID.
   */
  opaque: Uint8Array;

  /**
   * Creates a `CertificateExtensionOid` from its raw byte array.
   *
   * @param opaque - The raw OID data.
   * @returns A new `CertificateExtensionOid` instance.
   */
  static fromOpaque(opaque: Uint8Array): CertificateExtensionOid;

  /**
   * Parses a `CertificateExtensionOid` instance from a `Uint8Array`.
   *
   * @param array - The serialized array containing the OID data.
   * @returns A new `CertificateExtensionOid` instance.
   */
  static from(array: Uint8Array): CertificateExtensionOid;

  /**
   * Constructs a new `CertificateExtensionOid` instance.
   *
   * @param opaque - The raw OID data as a `Uint8Array`.
   */
  constructor(opaque: Uint8Array);
}

/**
 * Represents opaque certificate extension values of length 0 to 65535.
 */
export class CertificateExtensionValues extends Constrained {
  /**
   * The raw byte representation of the values.
   */
  opaque: Uint8Array;

  /**
   * Creates a `CertificateExtensionValues` from its raw byte array.
   *
   * @param opaque - The raw values data.
   * @returns A new `CertificateExtensionValues` instance.
   */
  static fromOpaque(opaque: Uint8Array): CertificateExtensionValues;

  /**
   * Parses a `CertificateExtensionValues` instance from a `Uint8Array`.
   *
   * @param array - The serialized array containing the values data.
   * @returns A new `CertificateExtensionValues` instance.
   */
  static from(array: Uint8Array): CertificateExtensionValues;

  /**
   * Constructs a new `CertificateExtensionValues` instance.
   *
   * @param opaque - The raw values data as a `Uint8Array`.
   */
  constructor(opaque: Uint8Array);
}

/**
 * Represents an empty array, extending `Uint8Array`.
 */
export class PostHandshakeAuth extends Uint8Array {
  /**
   * Creates a new `PostHandshakeAuth` instance with a length of 0.
   */
  constructor();
}
