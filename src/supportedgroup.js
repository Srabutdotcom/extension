//@ts-self-types = "../type/supportedgroup.d.ts"
import { Uint16, NamedGroup, sanitize, unity, vector16 } from "./dep.ts"
import { parseItems } from "./dep.ts";

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
      const groups = unity(...named_group_list.map(e=>e.byte))
      return new NamedGroupList(vector16(groups));
   }

   static from(array) {
      return new NamedGroupList(array);
   }

   constructor(...args) {
      sanitize(args, { min: 2, max: 2 ** 16 - 1 })
      
      super(...args);
   }

   get named_group_list() {
      this.#named_group_list ||= parseItems(this, 2, this.length - 2, NamedGroup, {store: []});
      return this.#named_group_list;
   }
}
