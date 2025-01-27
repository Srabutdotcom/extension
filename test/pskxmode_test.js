import { PskKeyExchangeMode } from "../src/dep.ts";
import { PskKeyExchangeModes } from "../src/pskxmode.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("PskKeyExchangeModes", () => {
   const test = new PskKeyExchangeModes(PskKeyExchangeMode.PSK_KE);
   const back = PskKeyExchangeModes.from(test);
   assertEquals(test.toString(), back.toString())
})
