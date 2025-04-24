import { PskKeyExchangeMode } from "../src/dep.ts"; 

/**
 * LINK - https://www.rfc-editor.org/rfc/rfc8446#section-4.2.9
 *
 * ```
 * struct {
 *     PskKeyExchangeMode ke_modes<1..255>;
 * } PskKeyExchangeModes;
 * ```
 * 
 * Represents a list of PSK key exchange modes.
 * ## PSK Key Exchange Modes:
 * - **psk_ke**: PSK-only key establishment. In this mode, the server **MUST NOT** supply a `key_share` value.
 * - **psk_dhe_ke**: PSK with (EC)DHE key establishment. In this mode, both client and server **MUST** supply `key_share` values.
 * @version 0.6.1
 */
declare class PskKeyExchangeModes extends Uint8Array {
  /**
   * Stores parsed key exchange modes.
   */
  #ke_modes: PskKeyExchangeMode[];

  /**
   * Validates and sanitizes input arguments.
   * @param {any[]} args - The arguments to sanitize.
   * @throws {RangeError} If the length is out of bounds (1-255).
   */
  static sanitize(args: any[]): void;

  /**
   * Creates an instance from multiple key exchange modes.
   * @param {...(number | PskKeyExchangeMode)[]} ke_modes - Key exchange modes.
   * @returns {PskKeyExchangeModes} A new instance.
   */
  static fromModes(...ke_modes: (number | PskKeyExchangeMode)[]): PskKeyExchangeModes;

  /**
   * Creates an instance from a Uint8Array.
   * @param {Uint8Array} array - The input array.
   * @returns {PskKeyExchangeModes} A new instance.
   */
  static from(array: Uint8Array): PskKeyExchangeModes;

  /**
   * Constructs a new PskKeyExchangeModes instance.
   * @param {...any[]} args - Input arguments.
   */
  constructor(...args: any[]);

  /**
   * Retrieves the parsed key exchange modes.
   * @returns {PskKeyExchangeMode[]} The list of key exchange modes.
   */
  get ke_modes(): PskKeyExchangeMode[];
}