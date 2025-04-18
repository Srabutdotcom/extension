import { NamedGroup } from "../src/dep.ts";

/**
 * Represents a list of NamedGroups as per RFC 8446.
 * 
 * ```
 * struct {
 *       NamedGroup named_group_list<2..2^16-1>;
 * } NamedGroupList;
 * ```
 * @version 0.6.0
 */
export class NamedGroupList extends Uint8Array {
  /**
   * Parsed list of NamedGroups
   * @private
   */
  #named_group_list: NamedGroup[];

  /**
   * Validates and sanitizes the input arguments.
   * 
   * @param {any[]} args - The input arguments to sanitize.
   * @throws {RangeError} If the length is out of bounds (2 to 2^16-1).
   */
  static sanitize(args: any[]): void;

  /**
   * Creates a NamedGroupList instance from a list of NamedGroups.
   * 
   * @param {...(NamedGroup | Uint8Array)} named_group_list - List of NamedGroups.
   * @returns {NamedGroupList} A new NamedGroupList instance.
   */
  static fromGroups(...named_group_list: (NamedGroup | Uint8Array)[]): NamedGroupList;

  /**
   * Creates a NamedGroupList instance from an existing Uint8Array.
   * 
   * @param {Uint8Array} array - The byte array representing a NamedGroupList.
   * @returns {NamedGroupList} A new NamedGroupList instance.
   */
  static from(array: Uint8Array): NamedGroupList;

  /**
   * Constructs a NamedGroupList instance.
   * 
   * @param {...any[]} args - Constructor arguments.
   */
  constructor(...args: any[]);

  /**
   * Retrieves the parsed list of NamedGroups.
   * 
   * @returns {NamedGroup[]} The list of NamedGroups.
   */
  get named_group_list(): NamedGroup[];
}

