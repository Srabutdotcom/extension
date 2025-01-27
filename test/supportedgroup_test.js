import { assertEquals } from "jsr:@std/assert";
import { NamedGroupList } from "../src/supportedgroup.js";
import { NamedGroup } from "../src/dep.ts";


Deno.test("NamedGroupList", ()=>{
   const test = new NamedGroupList(NamedGroup.X25519);
   const back = NamedGroupList.from(test);
   assertEquals(test, back)
})