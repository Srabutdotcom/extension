//@ts-self-types = "../type/supportedgroup.d.ts"
import { Uint16, NamedGroup, Byte } from "./dep.ts"
import { parseItems } from "./utils.js";

/* export class NamedGroupList extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const namedGroups = parseItems(copy, 2, lengthOf, NamedGroup)
      return new NamedGroupList(...namedGroups)
   }
   constructor(...named_group_list) {
      super(2, 2 ** 16 - 1, ...named_group_list.map(e => e.Uint16));
      this.named_group_list = named_group_list
   }
} */

/**
 * ```
 * struct {
          NamedGroup named_group_list<2..2^16-1>;
      } NamedGroupList;
   ```
 */
export class NamedGroupList extends Uint8Array {
   #named_group_list;

   static sanitize(args) {
      if (args[0] instanceof Uint8Array) {
         const lengthOf = Uint16.from(args[0]).value;
         if (lengthOf < 2 || lengthOf > 2 ** 16 - 1) {
            throw new RangeError("Length of NamedGroupList should be between 2 and 2**16-1");
         }
         args[0] = args[0].slice(0, 2 + lengthOf);
      }
   }

   static fromGroups(...named_group_list) {
      const array = named_group_list.reduce((prev, curr) => {
         curr = (curr instanceof NamedGroup) ? curr.byte :
            (curr instanceof Uint8Array) ? curr : new Uint8Array
         prev.append(curr);
         return prev;
      }, Byte.create());
      array.prepend(Uint16.fromValue(array.length));
      return new NamedGroupList(array);
   }

   static from(array) {
      return new NamedGroupList(array);
   }

   constructor(...args) {
      NamedGroupList.sanitize(args);
      super(...args);
   }

   get named_group_list() {
      this.#named_group_list ||= parseItems(this, 2, this.length - 2, NamedGroup);
      return this.#named_group_list;
   }
}
