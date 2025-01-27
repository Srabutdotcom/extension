import { assertEquals } from "jsr:@std/assert";
import { SignatureSchemeList } from "../src/signaturealgo.js";
import { SignatureScheme } from "../src/dep.ts";

Deno.test("Signature Algorithms", () => {
   const test = new SignatureSchemeList(
      SignatureScheme.RSA_PSS_RSAE_SHA256,
      SignatureScheme.RSA_PSS_RSAE_SHA384
   );
   const back = SignatureSchemeList.from(test);
   assertEquals(test.toString(), back.toString())
})
