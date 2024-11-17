import { Constrained, Uint16, NamedGroup, Struct } from "../src/dep.ts";

/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {
  /**
   * Creates a KeyExchange from an octet array.
   * @param {Uint8Array} octet - The octet array.
   * @returns {KeyExchange} A KeyExchange instance.
   */
  static fromKey(octet: Uint8Array): KeyExchange;

  /**
   * Creates a KeyExchange from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyExchange} A KeyExchange instance.
   */
  static from(array: Uint8Array): KeyExchange;

  /**
   * Constructs a KeyExchange instance.
   * @param {Uint8Array} octet - The octet array representing the key exchange.
   */
  constructor(octet: Uint8Array);

  /** The key exchange octet. */
  key_exchange: Uint8Array;
}

/**
 * Represents a key share entry in TLS handshake.
 */
export class KeyShareEntry extends Struct {
  /**
   * Creates a KeyShareEntry from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyShareEntry} A KeyShareEntry instance.
   */
  static from(array: Uint8Array): KeyShareEntry;

  /**
   * Constructs a KeyShareEntry instance.
   * @param {NamedGroup} group - The NamedGroup for the key share.
   * @param {KeyExchange} key_exchange - The KeyExchange for the key share.
   */
  constructor(group: NamedGroup, key_exchange: KeyExchange);

  /** The NamedGroup for the key share. */
  group: NamedGroup;

  /** The key exchange octet. */
  key_exchange: Uint8Array;
}

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
export class KeyShareServerHello extends Uint16 {
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
