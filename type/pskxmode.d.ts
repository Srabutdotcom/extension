import { Constrained, PskKeyExchangeMode } from "../src/dep.ts"; 

/**
 * Represents the PSK Key Exchange Modes in TLS.
 * This class extends `Constrained` and is used to parse and store key exchange modes.
 * 
 * ## PSK Key Exchange Modes:
 * - **psk_ke**: PSK-only key establishment. In this mode, the server **MUST NOT** supply a `key_share` value.
 * - **psk_dhe_ke**: PSK with (EC)DHE key establishment. In this mode, both client and server **MUST** supply `key_share` values.
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
