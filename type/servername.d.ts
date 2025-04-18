import { Byte } from "@aicone/byte"

/**
 * ```
 * opaque HostName<1..2^16-1>;
 * ```
 * @version 0.6.0
 */
export class HostName extends Byte {
  /**
   * @private
   */
  #opaque: Byte;

  /**
   * Sanitizes the input array for HostName.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {Uint8Array} - The sanitized array.
   * @throws {TypeError} - If the input is not a Uint8Array, Array, or Byte.
   * @throws {RangeError} - If the length of HostName is not between 1 and 65535.
   */
  static sanitize(array: Uint8Array | number[] | Byte): Uint8Array;

  /**
   * Creates a HostName instance from a hostname string.
   *
   * @param {string} hostName - The hostname string.
   * @returns {HostName} - A new HostName instance.
   */
  static fromName(hostName: string): HostName;

  /**
   * Creates a HostName instance from an array.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {HostName} - A new HostName instance.
   */
  static from(array: Uint8Array | number[] | Byte): HostName;

  /**
   * Creates a HostName instance.
   *
   * @param {Uint8Array | number[]} array - The input array.
   */
  constructor(array: Uint8Array | number[]);

  /**
   * Gets the opaque part of the HostName.
   *
   * @returns {Uint8Array} - The opaque part.
   */
  get opaque(): Uint8Array;

  /**
   * Gets the hostname string.
   *
   * @returns {string} - The hostname string.
   */
  get name(): string;
}

/**
 * ```
 * struct {
 * NameType name_type;
 * select (name_type) {
 * case host_name: HostName;
 * } name;
 * } ServerName;
 *
 * enum {
 * host_name(0), (255)
 * } NameType;
 * ```
 * @version 0.6.0
 */
export class ServerName extends Byte {
  /**
   * @private
   */
  #hostName: HostName;

  /**
   * Sanitizes the input array for ServerName.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {Uint8Array} - The sanitized array.
   * @throws {TypeError} - If the input is not a Uint8Array, Array, or Byte.
   * @throws {TypeError} - If the name_type is not host_name(0).
   */
  static sanitize(array: Uint8Array | number[] | Byte): Uint8Array;

  /**
   * Creates a ServerName instance from a hostname string.
   *
   * @param {string} hostName - The hostname string.
   * @returns {ServerName} - A new ServerName instance.
   */
  static fromName(hostName: string): ServerName;

  /**
   * Creates a ServerName instance from an array.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {ServerName} - A new ServerName instance.
   */
  static from(array: Uint8Array | number[] | Byte): ServerName;

  /**
   * Creates a ServerName instance.
   *
   * @param {Uint8Array | number[]} array - The input array.
   */
  constructor(array: Uint8Array | number[]);

  /**
   * Gets the hostname string.
   *
   * @returns {string} - The hostname string.
   */
  get name(): string;
}

/**
 * ```
 * struct {
 * ServerName server_name_list<1..2^16-1>
 * } ServerNameList;
 * ```
 * @version 0.6.0
 */
export class ServerNameList extends Byte {
  /**
   * @private
   */
  #serverNames: ServerName[];

  /**
   * Sanitizes the input array for ServerNameList.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {Uint8Array} - The sanitized array.
   * @throws {TypeError} - If the input is not a Uint8Array, Array, or Byte.
   * @throws {RangeError} - If the length of ServerNameList is not between 1 and 2**16-1.
   */
  static sanitize(array: Uint8Array | number[] | Byte): Uint8Array;

  /**
   * Creates a ServerNameList instance from an array of hostname strings.
   *
   * @param {...string} names - The hostname strings.
   * @returns {ServerNameList} - A new ServerNameList instance.
   */
  static fromNames(...names: string[]): ServerNameList;

  /**
   * Creates a ServerNameList instance from an array.
   *
   * @param {Uint8Array | number[] | Byte} array - The input array.
   * @returns {ServerNameList} - A new ServerNameList instance.
   */
  static from(array: Uint8Array | number[] | Byte): ServerNameList;

  /**
   * Creates a ServerNameList instance.
   *
   * @param {Uint8Array | number[]} array - The input array.
   */
  constructor(array: Uint8Array | number[]);

  /**
   * Gets the array of ServerName instances.
   *
   * @returns {ServerName[]} - The array of ServerName instances.
   */
  get serverNames(): ServerName[];
}