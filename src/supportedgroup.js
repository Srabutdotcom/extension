//@ts-self-types = "../type/supportedgroup.d.ts"
import { Constrained, Uint16, NamedGroup, Struct } from "./dep.ts"

export class Named_group_list extends Constrained {
   static default(){
      return Named_group_list.fromNamedGroups(
         NamedGroup.X25519,
         NamedGroup.SECP256R1,
         NamedGroup.SECP384R1,
         NamedGroup.X448,
         NamedGroup.SECP521R1,
      )
   }
   static fromNamedGroups(...namedGroups) { 
      const named_group_list = new Named_group_list(...namedGroups.map(e=>e.Uint16)) 
      named_group_list.namedGroups = namedGroups
      return named_group_list 
   }
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value
      const namedGroups = [];
      for (let offset = 2; offset < lengthOf + 2; offset += 2) {
         const group = NamedGroup.from(copy.subarray(offset))
         namedGroups.push(group);
      }
      const named_group_list = Named_group_list.fromNamedGroups(...namedGroups);
      named_group_list.namedGroups = namedGroups;
      return named_group_list
   }
   constructor(...namedGroups) {
      super(2, 2 ** 16 - 1, ...namedGroups);
   }
}

export class NamedGroupList extends Struct {
   static default(){
      return new NamedGroupList(Named_group_list.default())
   }
   static from(array){
      const copy = Uint8Array.from(array);
      return new NamedGroupList(Named_group_list.from(copy))
   }
   constructor(named_group_list){
      super(named_group_list);
      this.named_group_list = named_group_list
      this.namedGroups = named_group_list?.namedGroups
   }
}

