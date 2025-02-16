import { Version } from "@tls/enum";

/**
 * Represents a specific protocol version.
 */
export class ProtocolVersion {
   /** @type {Uint8Array} Private field storing the protocol version */
   #version: Uint8Array;

   /**
    * Creates a new `ProtocolVersion` instance from a `Uint8Array`.
    * @param {Uint8Array} array - The array containing the protocol version.
    * @returns {ProtocolVersion} - A new instance of `ProtocolVersion`.
    */
   static from(array: Uint8Array): ProtocolVersion;

   /**
    * Validates and extracts the protocol version from an array.
    * @param {Uint8Array} array - The array containing the version data.
    * @returns {Uint8Array} - Sanitized version data.
    * @throws {Error} If the input array does not contain a valid version.
    */
   static sanitize(array: Uint8Array): Uint8Array;

   /**
    * Constructs a `ProtocolVersion` instance.
    * @param {Uint8Array} array - The array containing the protocol version.
    */
   constructor(array: Uint8Array);

   /**
    * Gets the protocol version.
    * @returns {Version} - The `Version` object representing the protocol version.
    */
   get version(): Version;

   /**
    * Gets the length of the protocol version.
    * @returns {number} - Always returns `2`.
    */
   get length(): number;
}

/**
 * Represents multiple protocol versions.
 * ProtocolVersion versions<2..254>;
 */
export class Versions {
   /** @type {Uint8Array} Private field storing the raw version data */
   #_array: Uint8Array;

   /** @type {ProtocolVersion[]} Private field storing the parsed versions */
   #versions: ProtocolVersion[];

   /**
    * @returns { Versions } default value
    */
   static default(): Versions
   /**
    * Validates and extracts protocol versions from an array.
    * @param {Uint8Array} array - The array containing protocol versions.
    * @returns {Uint8Array} - Sanitized array containing only valid protocol versions.
    * @throws {Error} If the length of the array is less than 2.
    */
   static sanitize(array: Uint8Array): Uint8Array;

   /**
    * Creates a new `Versions` instance from a `Uint8Array`.
    * @param {Uint8Array} array - The array containing protocol versions.
    * @returns {Versions} - A new instance of `Versions`.
    */
   static from(array: Uint8Array): Versions;

   /**
    * Constructs a `Versions` instance.
    * @param {Uint8Array} array - The array containing protocol versions.
    */
   constructor(array: Uint8Array);

   /**
    * Gets the parsed protocol versions.
    * @returns {ProtocolVersion[]} - An array of `ProtocolVersion` instances.
    */
   get versions(): ProtocolVersion[];
   get length(): number;
}

/**
 * Alias for `ProtocolVersion`, representing the selected version.
 */
export const Selected_version: typeof ProtocolVersion;

