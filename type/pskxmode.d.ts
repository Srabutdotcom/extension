import { Constrained } from "../src/dep.ts"; 

/**
 * Represents the PSK key exchange modes as a constrained array.
 */
export declare class PskKeyExchangeModes extends Constrained {
   /**
    * Constructs a `PskKeyExchangeModes` instance with the provided modes.
    * @param {...Uint8Array[]} modes - The key exchange modes as `Uint8Array` instances.
    */
   constructor(...modes: Uint8Array[]);

   /**
    * Creates a `PskKeyExchangeModes` instance from a Uint8Array.
    * @param {Uint8Array | number[]} array - The source array.
    * @returns {PskKeyExchangeModes} A new `PskKeyExchangeModes` instance.
    * @throws {RangeError} If the first byte indicates a length of 0.
    */
   static from(array: Uint8Array | number[]): PskKeyExchangeModes;

   /**
    * Returns a default `PskKeyExchangeModes` instance with the `PSK_DHE_KE` mode.
    * @returns {PskKeyExchangeModes} A default `PskKeyExchangeModes` instance.
    */
   static default(): PskKeyExchangeModes;

   /**
    * The modes included in the `PskKeyExchangeModes` instance.
    * @type {Uint8Array[]}
    */
   modes: Uint8Array[];
}
