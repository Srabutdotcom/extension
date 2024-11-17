import { assertEquals } from "jsr:@std/assert";
import { Named_group_list, NamedGroupList } from "../src/supportedgroup.js";

Deno.test("Named_group_list", ()=>{
   const test =Named_group_list.default();
   const back =Named_group_list.from(test);
   assertEquals(test, back)
})

Deno.test("NamedGroupList", ()=>{
   const test = NamedGroupList.default();
   const back = NamedGroupList.from(test);
   assertEquals(test, back)
})