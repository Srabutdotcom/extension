import { Constrained, Struct } from "../src/dep.ts";

/**
 * Represents a `HostName` defined as an opaque structure with constraints.
 * Used to handle hostnames in the TLS ServerName extension.
 */
export class HostName extends Constrained {
  /**
   * The `opaque` field representing the raw hostname data.
   */
  opaque: Uint8Array;

  /**
   * Creates a `HostName` instance from a string hostname.
   *
   * @param hostName - The hostname as a string.
   * @returns A new `HostName` instance.
   */
  static fromName(hostName: string): HostName;

  /**
   * Creates a `HostName` instance from a serialized `Uint8Array`.
   * The first two bytes of the array define the length of the hostname,
   * followed by the encoded hostname.
   *
   * @param array - The serialized array containing the hostname data.
   * @returns A new `HostName` instance.
   */
  static from(array: Uint8Array): HostName;

  /**
   * Constructs a new `HostName` instance.
   *
   * @param opaque - The raw hostname data as a `Uint8Array`.
   */
  constructor(opaque: Uint8Array);

  /**
   * Decodes the hostname into a string.
   *
   * @returns The decoded hostname.
   */
  get name(): string;
}

/**
 * Represents a `ServerName` structure that includes a `HostName` and a name type.
 * This is typically used in TLS ServerName extensions.
 */
export class ServerName extends Struct {
  /**
   * The `HostName` associated with this `ServerName`.
   */
  hostname: HostName;

  /**
   * Creates a `ServerName` instance from a string hostname.
   *
   * @param name - The hostname as a string.
   * @returns A new `ServerName` instance.
   */
  static fromName(name: string): ServerName;

  /**
   * Creates a `ServerName` instance from a serialized `Uint8Array`.
   * The first byte of the array specifies the name type, which must be `0` (host_name).
   * The remaining bytes contain the `HostName`.
   *
   * @param array - The serialized array containing the server name data.
   * @returns A new `ServerName` instance.
   * @throws {TypeError} If the name type is not `0`.
   */
  static from(array: Uint8Array): ServerName;

  /**
   * Constructs a new `ServerName` instance.
   *
   * @param hostname - The `HostName` associated with this `ServerName`.
   */
  constructor(hostname: HostName);

  /**
   * Returns the hostname as a string.
   */
  get name(): string;
}

/**
 * Represents a list of server names with constraints on the size.
 * Extends the `Constrained` class to validate the size of the list.
 */
export declare class ServerNameList extends Constrained {
  /**
   * Creates a `ServerNameList` instance from a single server name.
   * @param name - The server name.
   * @returns A new instance of `ServerNameList` with the provided server name.
   */
  static fromName(name: string): ServerNameList;

  /**
   * Parses a `ServerNameList` instance from a `Uint8Array`.
   * @param array - The input array containing server name data.
   * @returns A new instance of `ServerNameList`.
   * @throws {Error} If the input array is invalid or incomplete.
   */
  static from(array: Uint8Array): ServerNameList;

  /**
   * Constructs a `ServerNameList` instance.
   * @param serverNames - A list of server names.
   * @throws {Error} If the constraints are not satisfied.
   */
  constructor(...serverNames: ServerName[]);

  /**
   * The list of server names in the `ServerNameList`.
   */
  readonly serverNames: ServerName[];
}
