import { Constrained, Uint16, NamedGroup, KeyShareEntry } from "../src/dep.ts";



/**
 * Represents the KeyShare extension in the ClientHello message.
 */
export class KeyShareClientHello extends Constrained {
  /**
   * Creates a KeyShareClientHello from multiple KeyShareEntry instances.
   * @param {KeyShareEntry[]} keyShareEntries - The key share entries.
   * @returns {KeyShareClientHello} A KeyShareClientHello instance.
   */
  static fromKeyShareEntries(...keyShareEntries: KeyShareEntry[]): KeyShareClientHello;

  /**
   * Creates a KeyShareClientHello from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyShareClientHello} A KeyShareClientHello instance.
   */
  static from(array: Uint8Array): KeyShareClientHello;

  /**
   * Constructs a KeyShareClientHello instance.
   * @param {KeyShareEntry[]} keyShareEntries - The key share entries.
   */
  constructor(...keyShareEntries: KeyShareEntry[]);

  /** The key share entries in the ClientHello. */
  keyShareEntries: KeyShareEntry[];
}

/**
 * Represents the KeyShare extension in the HelloRetryRequest message.
 */
export class KeyShareHelloRetryRequest extends Uint16 {
  /**
   * Creates a KeyShareHelloRetryRequest from a NamedGroup.
   * @param {NamedGroup} group - The NamedGroup.
   * @returns {KeyShareHelloRetryRequest} A KeyShareHelloRetryRequest instance.
   */
  static fromGroup(group: NamedGroup): KeyShareHelloRetryRequest;

  /**
   * Creates a KeyShareHelloRetryRequest from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyShareHelloRetryRequest} A KeyShareHelloRetryRequest instance.
   */
  static from(array: Uint8Array): KeyShareHelloRetryRequest;

  /**
   * Constructs a KeyShareHelloRetryRequest instance.
   * @param {NamedGroup} group - The NamedGroup.
   */
  constructor(group: NamedGroup);

  /** The NamedGroup for key share negotiation. */
  group: NamedGroup;
}

/**
 * Represents the KeyShare extension in the ServerHello message.
 */
export class KeyShareServerHello extends Uint8Array {
  /**
   * Creates a KeyShareServerHello from a KeyShareEntry.
   * @param {KeyShareEntry} keyShareEntry - The key share entry.
   * @returns {KeyShareServerHello} A KeyShareServerHello instance.
   */
  static fromKeyShareEntry(keyShareEntry: KeyShareEntry): KeyShareServerHello;

  /**
   * Creates a KeyShareServerHello from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyShareServerHello} A KeyShareServerHello instance.
   */
  static from(array: Uint8Array): KeyShareServerHello;

  /**
   * Constructs a KeyShareServerHello instance.
   * @param {KeyShareEntry} keyShareEntry - The key share entry.
   */
  constructor(keyShareEntry: KeyShareEntry);

  /** The NamedGroup for the key share in ServerHello. */
  group: NamedGroup;

  /** The key exchange octet. */
  key_exchange: Uint8Array;
}
