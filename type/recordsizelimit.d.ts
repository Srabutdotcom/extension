import { Uint16 } from "../src/dep.ts";

/**
 * Represents the Record Size Limit in a TLS context, extending `Uint16`.
 * @version 0.6.2
 */
export class RecordSizeLimit extends Uint16 {
  /**
   * Creates a new `RecordSizeLimit` instance from a given value.
   * 
   * @param value - The value to initialize the `RecordSizeLimit` instance with.
   */
  constructor(value: number);

  /**
   * Parses a `RecordSizeLimit` instance from a `Uint8Array`.
   * 
   * @param array - The serialized array containing the `RecordSizeLimit` data.
   * @returns A new `RecordSizeLimit` instance.
   */
  static from(array: Uint8Array): RecordSizeLimit;

  /**
   * Creates a `RecordSizeLimit` instance from a given value.
   * 
   * @param value - The value to initialize the `RecordSizeLimit` instance with.
   * @returns A new `RecordSizeLimit` instance.
   */
  static fromValue(value: number): RecordSizeLimit;
}
