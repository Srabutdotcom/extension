import { ServerNameList } from "../src/servername.js";
import { ServerName } from "../src/servername.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("ServerName", () => {
   const test = ServerName.fromName('local');
   const back = ServerName.from(test);
   assertEquals(test, back)
})

Deno.test("ServerNameList", () => {
   const test = ServerNameList.fromName('local');
   const back = ServerNameList.from(test);
   assertEquals(test, back)
})

