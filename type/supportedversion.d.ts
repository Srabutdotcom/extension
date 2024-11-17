import { Struct, Constrained } from "../src/dep.ts"; // Update the import paths as necessary
import { ProtocolVersion } from "../src/dep.ts"; // Assuming `ProtocolVersion` and `Version` are defined elsewhere

/**
 * Represents the supported protocol versions in a TLS handshake.
 */
export declare class SupportedVersions extends Struct {
   /**
    * Creates a `SupportedVersions` instance for a client hello message.
    * @returns {SupportedVersions} A new instance for client hello.
    */
   static forClient_hello(): SupportedVersions;

   /**
    * Creates a `SupportedVersions` instance for a server hello message.
    * @returns {SupportedVersions} A new instance for server hello.
    */
   static forServer_hello(): SupportedVersions;

   /**
    * Creates a `SupportedVersions` instance from a client hello array.
    * @param {Uint8Array | number[]} array - The array representing client hello versions.
    * @returns {SupportedVersions} A new instance from client hello data.
    */
   static fromClient_hello(array: Uint8Array | number[]): SupportedVersions;

   /**
    * Creates a `SupportedVersions` instance from a server hello array.
    * @param {Uint8Array | number[]} array - The array representing server hello version.
    * @returns {SupportedVersions} A new instance from server hello data.
    */
   static fromServer_hello(array: Uint8Array | number[]): SupportedVersions;

   /**
    * Constructs a `SupportedVersions` instance.
    * @param {Versions | Selected_version} version - The supported versions or selected version.
    */
   constructor(version: Versions | Selected_version);
}

/**
 * Represents the supported protocol versions as a constrained array.
 */
export declare class Versions extends Constrained {
   /**
    * Returns a `Versions` instance with the default protocol version (TLS 1.3).
    * @returns {Versions} A `Versions` instance with TLS 1.3.
    */
   static default(): Versions;

   /**
    * Creates a `Versions` instance from an array.
    * @param {Uint8Array | number[]} array - The array representing protocol versions.
    * @returns {Versions} A new `Versions` instance.
    */
   static from(array: Uint8Array | number[]): Versions;

   /**
    * Constructs a `Versions` instance.
    * @param {...ProtocolVersion[]} versions - The protocol versions.
    */
   constructor(...versions: ProtocolVersion[]);

   /**
    * The list of protocol versions.
    * @type {ProtocolVersion[]}
    */
   versions: ProtocolVersion[];
}

/**
 * Represents a single selected protocol version.
 */
export declare class Selected_version {
   /**
    * Returns the default selected protocol version (TLS 1.3).
    * @returns {ProtocolVersion} The default protocol version.
    */
   static default(): ProtocolVersion;

   /**
    * Creates a `Selected_version` instance from an array.
    * @param {Uint8Array | number[]} array - The array representing the selected protocol version.
    * @returns {ProtocolVersion} The selected protocol version.
    */
   static from(array: Uint8Array | number[]): ProtocolVersion;
}
