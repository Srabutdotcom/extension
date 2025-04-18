import { ExtensionType } from "@tls/enum";

/**
 * Represents a TLS Extension as a byte array.
 * Used in the TLS handshake process to store extension type and data.
 * @version 0.6.0
 */
export declare class Extension extends Uint8Array {
  /**
   * Creates a new Extension instance from a type and data.
   * @param {ExtensionType} type - The extension type.
   * @param {Uint8Array} data - The extension data.
   * @returns {Extension} The created Extension instance.
   */
  static create(type: ExtensionType, data: Uint8Array): Extension;

  /**
   * Creates a new Extension instance from the given arguments.
   * @param {...any[]} args - The arguments to create the Extension.
   * @returns {Extension} The created Extension instance.
   */
  static from(...args: any[]): Extension;

  /**
   * Constructs a new Extension instance.
   * @param {...any[]} args - The arguments for the Extension.
   */
  constructor(...args: any[]);

  /**
   * Gets the extension type from the first two bytes.
   * @returns {ExtensionType} The extension type.
   */
  get type(): ExtensionType;

  /**
   * Gets the extension data after the length field.
   * @returns {Uint8Array} The extension data.
   */
  get data(): Uint8Array;
  set pos(pos: number);
  get pos(): number;
  set parser(parser: any)
}
