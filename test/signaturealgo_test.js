import { assertEquals } from "jsr:@std/assert";
import { SignatureSchemeList } from "../src/signaturealgo.js";

Deno.test("Signature Algorithms", () => {
   const test = SignatureSchemeList.default();
   const back = SignatureSchemeList.from(test);
   assertEquals(test, back)
})