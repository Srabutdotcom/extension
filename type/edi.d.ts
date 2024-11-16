import { Uint32 } from "../src/dep.ts";
/**
 * Represents an empty array, extending `Uint8Array`.
 */
export class Empty extends Uint8Array {
   /**
    * Creates a new `Empty` instance with a length of 0.
    */
   constructor();
}

/**
 * Represents the Early Data Indication in a TLS context.
 * Refer to [RFC 8446, Section 4.2.10](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.10).
 */
export class EarlyDataIndication extends Uint32 {
   /**
    * Creates an empty Early Data Indication for `client_hello`.
    *
    * @returns An instance of `Empty`.
    */
   static client_hello(): Empty;

   /**
    * Creates an empty Early Data Indication for `encrypted_extensions`.
    *
    * @returns An instance of `Empty`.
    */
   static encrypted_extensions(): Empty;

   /**
    * Creates a new Early Data Indication for `new_session_ticket` with a specified maximum early data size.
    *
    * @param max_early_data_size - The maximum size of early data.
    * @returns An instance of `Uint32` initialized with the given size.
    */
   static new_session_ticket(max_early_data_size: number): Uint32;

   /**
    * Creates a new `EarlyDataIndication` instance from a given value.
    *
    * @param value - The value to initialize the `EarlyDataIndication` instance with.
    * @returns An instance of `EarlyDataIndication`.
    */
   static fromValue(value: number): EarlyDataIndication;

   /**
    * Parses an `EarlyDataIndication` instance from a `Uint8Array`.
    *
    * @param array - The serialized array containing the `EarlyDataIndication` data.
    * @returns An instance of `EarlyDataIndication`.
    */
   static from(array: Uint8Array): EarlyDataIndication;

   /**
    * Creates a new `EarlyDataIndication` instance with the specified maximum early data size.
    *
    * @param max_early_data_size - The maximum size of early data.
    */
   constructor(max_early_data_size: number);
}
