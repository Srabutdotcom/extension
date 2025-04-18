/**
 * Represents an empty byte array with a fixed length of zero.
 * @version 0.5.8
 */
export class Empty extends Uint8Array {
   /**
    * Constructs an empty `Uint8Array` with a length of zero.
    */
   constructor();
 }
 
 /**
  * Represents the Early Data Indication as described in 
  * [RFC 8446 Section 4.2.10](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.10).
  * Extends `Uint8Array` to handle Early Data Indication functionality.
  * @version 0.5.8
  */
 export class EarlyDataIndication extends Uint8Array {
   /**
    * Creates an `EarlyDataIndication` instance for a ClientHello message.
    * 
    * @returns {EarlyDataIndication} A new `EarlyDataIndication` instance with empty data.
    */
   static client_hello(): EarlyDataIndication;
 
   /**
    * Creates an `EarlyDataIndication` instance for EncryptedExtensions.
    * 
    * @returns {EarlyDataIndication} A new `EarlyDataIndication` instance with empty data.
    */
   static encrypted_extensions(): EarlyDataIndication;
 
   /**
    * Creates an `EarlyDataIndication` instance for a NewSessionTicket message.
    * 
    * @param {number} max_early_data_size - The maximum early data size.
    * @returns {EarlyDataIndication} A new `EarlyDataIndication` instance with the given size.
    */
   static new_session_ticket(max_early_data_size: number): EarlyDataIndication;
 
   /**
    * Creates an `EarlyDataIndication` instance from the provided array.
    * If the array is empty, an empty `EarlyDataIndication` is returned.
    * Otherwise, the data is processed as a `Uint32`.
    * 
    * @param {Uint8Array} array - The array containing the Early Data Indication.
    * @returns {EarlyDataIndication} A new `EarlyDataIndication` instance.
    */
   static from(array: Uint8Array): EarlyDataIndication;
 
   /**
    * Constructs an `EarlyDataIndication` instance with the provided data.
    * 
    * @param {...any} args - The data for the Early Data Indication.
    */
   constructor(...args:any[]);
 
   /**
    * @type {Uint8Array} The data contained within the Early Data Indication.
    */
   get value(): number;
 }
 
