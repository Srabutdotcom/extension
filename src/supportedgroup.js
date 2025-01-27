//@ts-self-types = "../type/supportedgroup.d.ts"
import { Constrained, Uint16, NamedGroup } from "./dep.ts"
import { parseItems } from "./utils.js";

export class NamedGroupList extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const namedGroups = parseItems(copy, 2, lengthOf, NamedGroup)
      return new NamedGroupList(...namedGroups)
   }
   constructor(...named_group_list){
      super(2, 2**16-1, ...named_group_list.map(e=>e.Uint16));
      this.named_group_list = named_group_list
   }
}

