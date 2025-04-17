/**
 * ```
 * struct {
 * opaque certificate_extension_oid<1..2^8-1>;
 * opaque certificate_extension_values<0..2^16-1>;
 * } OIDFilter;
 * ```
 * @version 0.5.7
 */
export declare class OIDFilter extends Uint8Array {
  certificate_extension_oid: CertificateExtensionOID;
  certificate_extension_values: CertificateExtensionValues;

  /**
   * Sanitizes arguments before constructing the OIDFilter.
   * @param {any[]} args - The arguments array.
   */
  static sanitize(args: any[]): void;

  /**
   * Creates an OIDFilter instance from a Uint8Array.
   * @param {Uint8Array} array - The Uint8Array to create the instance from.
   * @returns {OIDFilter} - A new OIDFilter instance.
   */
  static from(array: Uint8Array): OIDFilter;

  /**
   * Constructs an OIDFilter instance.
   * @param {...any} args - Arguments to pass to the Uint8Array constructor.
   */
  constructor(...args: any[]);
}

/**
 * ```
 * struct {
 * OIDFilter filters<0..2^16-1>;
 * } OIDFilterExtension;
 * ```
 * @version 0.5.7
 */
export declare class OIDFilterExtension extends Uint8Array {
  #oidFilters: OIDFilter[] | undefined;

  /**
   * Creates an OIDFilterExtension instance from a variable number of OIDFilter arrays.
   * @param {...Uint8Array[]} oidFilters - The OIDFilter arrays.
   * @returns {OIDFilterExtension} - A new OIDFilterExtension instance.
   */
  static fromOidFilters(...oidFilters: Uint8Array[]): OIDFilterExtension;

  /**
   * Creates an OIDFilterExtension instance from a Uint8Array.
   * @param {Uint8Array} array - The Uint8Array to create the instance from.
   * @returns {OIDFilterExtension} - A new OIDFilterExtension instance.
   */
  static from(array: Uint8Array): OIDFilterExtension;

  /**
   * Constructs an OIDFilterExtension instance.
   * @param {...any} args - Arguments to pass to the Uint8Array constructor.
   */
  constructor(...args: any[]);

  /**
   * Gets the OIDFilter array from the OIDFilterExtension.
   * @returns {OIDFilter[]} - The OIDFilter array.
   */
  get oidFilters(): OIDFilter[];
}

/**
 * Represents an opaque certificate_extension_oid<1..2^8-1>;
 * @version 0.5.7
 */
export declare class CertificateExtensionOID extends Uint8Array {
  /**
   * Creates a CertificateExtensionOID instance from a Uint8Array value.
   * @param {Uint8Array} value - The Uint8Array value.
   * @returns {CertificateExtensionOID} - A new CertificateExtensionOID instance.
   */
  static fromValue(value: Uint8Array): CertificateExtensionOID;

  /**
   * Creates a CertificateExtensionOID instance from a Uint8Array.
   * @param {Uint8Array} array - The Uint8Array to create the instance from.
   * @returns {CertificateExtensionOID} - A new CertificateExtensionOID instance.
   */
  static from(array: Uint8Array): CertificateExtensionOID;

  /**
   * Constructs a CertificateExtensionOID instance.
   * @param {...any} args - Arguments to pass to the Uint8Array constructor.
   */
  constructor(...args: any[]);

  /**
   * Get the actual OID value without the length prefix.
   * @returns {Uint8Array} - The OID value.
   */
  get value(): Uint8Array;
}

/**
 * Represents an opaque certificate_extension_values<0..2^16-1>;
 * @version 0.5.7
 */
export declare class CertificateExtensionValues extends Uint8Array {
  /**
   * Creates a CertificateExtensionValues instance from a Uint8Array value.
   * @param {Uint8Array} value - The Uint8Array value.
   * @returns {CertificateExtensionValues} - A new CertificateExtensionValues instance.
   */
  static fromValue(value: Uint8Array): CertificateExtensionValues;

  /**
   * Creates a CertificateExtensionValues instance from a Uint8Array.
   * @param {Uint8Array} array - The Uint8Array to create the instance from.
   * @returns {CertificateExtensionValues} - A new CertificateExtensionValues instance.
   */
  static from(array: Uint8Array): CertificateExtensionValues;

  /**
   * Constructs a CertificateExtensionValues instance.
   * @param {...any} args - Arguments to pass to the Uint8Array constructor.
   */
  constructor(...args: any[]);

  /**
   * Get the actual values without the length prefix.
   * @returns {Uint8Array} - The values.
   */
  get value(): Uint8Array;
}

/**
 * @version 0.5.7
 */
export declare class PostHandshakeAuth extends Uint8Array {
  constructor();
}