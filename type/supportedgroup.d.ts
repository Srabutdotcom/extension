import { Constrained, Uint16, NamedGroup, Struct } from "../src/dep.ts";

/**
 * Represents a list of Named Groups as per TLS 1.3 specification.
 */
export class Named_group_list extends Constrained {
  /**
   * Creates a default `Named_group_list` with the most commonly used Named Groups.
   * @returns {Named_group_list} The default Named Group List.
   */
  static default(): Named_group_list;

  /**
   * Creates a `Named_group_list` from a sequence of Named Groups.
   * @param {NamedGroup[]} namedGroups - The Named Groups to include in the list.
   * @returns {Named_group_list} The created Named Group List.
   */
  static fromNamedGroups(...namedGroups: NamedGroup[]): Named_group_list;

  /**
   * Creates a `Named_group_list` from a Uint8Array representation.
   * @param {Uint8Array} array - The byte array containing the encoded Named Groups.
   * @returns {Named_group_list} The parsed Named Group List.
   */
  static from(array: Uint8Array): Named_group_list;

  /**
   * Constructs a `Named_group_list`.
   * @param {Uint16[]} namedGroups - The Named Groups in their Uint16 representation.
   */
  constructor(...namedGroups: Uint16[]);

  /** The list of Named Groups as objects. */
  namedGroups?: NamedGroup[];
}

/**
 * Represents a container for a `Named_group_list`.
 */
export class NamedGroupList extends Struct {
  /**
   * Creates a default `NamedGroupList` with a default `Named_group_list`.
   * @returns {NamedGroupList} The default Named Group List container.
   */
  static default(): NamedGroupList;

  /**
   * Creates a `NamedGroupList` from a Uint8Array representation.
   * @param {Uint8Array} array - The byte array containing the encoded Named Group List.
   * @returns {NamedGroupList} The parsed Named Group List container.
   */
  static from(array: Uint8Array): NamedGroupList;

  /**
   * Constructs a `NamedGroupList`.
   * @param {Named_group_list} named_group_list - The Named Group List.
   */
  constructor(named_group_list: Named_group_list);

  /** The `Named_group_list` instance contained in this object. */
  named_group_list: Named_group_list;

  /** The list of Named Groups as objects. */
  namedGroups?: NamedGroup[];
}
