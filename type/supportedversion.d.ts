import { Version } from "@tls/enum";

/**
 * Represents a TLS protocol version as a `Uint8Array`.
 * @version 0.6.3
 */
export class ProtocolVersion extends Uint8Array {
   /**
    * Creates a `ProtocolVersion` instance from various version formats.
    * @param {Version | Uint8Array | number} version - The version to convert.
    * @returns {ProtocolVersion} The resulting `ProtocolVersion` instance.
    */
   static fromVersion(version: Version | Uint8Array | number): ProtocolVersion;

   /**
    * Creates a `ProtocolVersion` instance from an array.
    * @param {Uint8Array} array - The array representing the version.
    * @returns {ProtocolVersion} The resulting `ProtocolVersion` instance.
    */
   static from(array: Uint8Array): ProtocolVersion;

   /**
    * Validates and extracts the version from an array.
    * @param {Uint8Array} array - The input array.
    * @returns {[Uint8Array]} A tuple containing the sanitized version array.
    * @throws {Error} If the input is invalid.
    */
   static sanitize(array: Uint8Array): [Uint8Array];

   /**
    * Constructs a new `ProtocolVersion` instance.
    * @param {Uint8Array | any[]} args - The arguments for initialization.
    */
   constructor(...args: any[]);

   /**
    * Retrieves the `Version` object corresponding to this `ProtocolVersion`.
    * @returns {Version} The `Version` instance.
    */
   get version(): Version;
}

/**
 * Represents multiple TLS protocol versions as a `Uint8Array`.
 */
export class Versions extends Uint8Array {
   /**
    * Creates a `Versions` instance from multiple version values.
    * @param {...(Version | Uint8Array | number)[]} versions - The versions to include.
    * @returns {Versions} The resulting `Versions` instance.
    * @throws {Error} If any input is invalid.
    */
   static fromVersions(...versions: (Version | Uint8Array | number)[]): Versions;

   /**
    * Returns a `Versions` instance with two default versions.
    * @returns {Versions} The default instance with two versions.
    */
   static defaultTwo(): Versions;

   /**
    * Returns a `Versions` instance with one default version.
    * @returns {Versions} The default instance with one version.
    */
   static defaultOne(): Versions;

   /**
    * Validates and extracts multiple versions from an array.
    * @param {Uint8Array} array - The input array.
    * @returns {[Uint8Array]} A tuple containing the sanitized versions array.
    * @throws {Error} If the length is less than 2.
    */
   static sanitize(array: Uint8Array): [Uint8Array];

   /**
    * Creates a `Versions` instance from an array.
    * @param {Uint8Array} array - The array representing multiple versions.
    * @returns {Versions} The resulting `Versions` instance.
    */
   static from(array: Uint8Array): Versions;

   /**
    * Constructs a new `Versions` instance.
    * @param {Uint8Array | any[]} args - The arguments for initialization.
    */
   constructor(...args: any[]);

   /**
    * Retrieves an array of `ProtocolVersion` instances representing the contained versions.
    * @returns {ProtocolVersion[]} An array of protocol versions.
    */
   get versions(): ProtocolVersion[];
}

/**
 * Alias for `ProtocolVersion`, representing the selected version.
 */
export const Selected_version: typeof ProtocolVersion;

