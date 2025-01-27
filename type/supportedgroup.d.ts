import { Constrained, NamedGroup } from "../src/dep.ts";

/**
 * Represents a list of Named Groups as per TLS 1.3 specification.
 */
export class NamedGroupList extends Constrained {
  /**
   * Parses a NamedGroupList from a Uint8Array.
   * @param array - The input array containing named groups data.
   * @returns A new instance of NamedGroupList.
   */
  static from(array: Uint8Array): NamedGroupList;

  /**
   * Constructs a NamedGroupList.
   * @param named_group_list - A list of NamedGroup instances.
   */
  constructor(...named_group_list: NamedGroup[]);

  /**
   * The list of named groups.
   */
  readonly named_group_list: NamedGroup[];
}
