import { Constrained, PskKeyExchangeMode } from "../src/dep.ts"; 

/**
 * Represents the PSK key exchange modes as a constrained array.
 */
export declare class PskKeyExchangeModes extends Constrained {
   /**
    * Parses a `PskKeyExchangeModes` instance from a `Uint8Array`.
    * @param array - The input array containing PSK key exchange mode data.
    * @returns A new instance of `PskKeyExchangeModes`.
    * @throws {Error} If the input array is invalid or incomplete.
    */
   static from(array: Uint8Array): PskKeyExchangeModes;
 
   /**
    * Constructs a `PskKeyExchangeModes` instance.
    * @param ke_modes - A list of PSK key exchange modes.
    * @throws {Error} If the constraints are not satisfied.
    */
   constructor(...ke_modes: PskKeyExchangeMode[]);
 
   /**
    * The list of PSK key exchange modes.
    */
   readonly ke_modes: PskKeyExchangeMode[];
 }
