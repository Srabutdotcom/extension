import { NamedGroup } from "../src/dep.ts";

/**
 * Represents a KeyShareEntry structure.
 * @version 0.6.4
 */
export class KeyShareEntry extends Uint8Array {
  /** Parses a KeyShareEntry from a NamedGroup */
  static fromGroup(group: NamedGroup): KeyShareEntry;

  /** Creates a KeyShareEntry from a given Uint8Array */
  static from(array: Uint8Array): KeyShareEntry;

  /** Constructs a new KeyShareEntry */
  constructor(...args: ConstructorParameters<typeof Uint8Array>);

  /** The NamedGroup associated with this KeyShareEntry */
  get group(): NamedGroup;

  /** The key exchange data portion of the entry */
  get key_exchange(): Uint8Array;
}

/**
 * Represents the KeyShare extension in the ClientHello message.
 * @version 0.6.4
 */
export class KeyShareClientHello extends Uint8Array {
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

  /**
    * Parsed client shares as a Map where the key is a NamedGroup and value is key exchange data.
    */
  get client_shares(): Map<NamedGroup, Uint8Array>;
}

/**
 * Represents the KeyShare extension in the HelloRetryRequest message.
 * @version 0.6.4
 */
export class KeyShareHelloRetryRequest extends Uint8Array {
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
 * @version 0.6.4
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
