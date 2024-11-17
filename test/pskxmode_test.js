import { PskKeyExchangeModes } from "../src/pskxmode.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("PskKeyExchangeModes", ()=>{
   const test = PskKeyExchangeModes.default();
   const back = PskKeyExchangeModes.from(test);
   assertEquals(test, back)
})