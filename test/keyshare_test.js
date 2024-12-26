import { KeyShareServerHello } from "../src/keyshare.js";
import { assertEquals } from "@std/assert";

Deno.test("KeyShareServerHello", () => {
   const x25519 = Uint8Array.of(0, 29, 0, 32, 201, 130, 136, 118, 17, 32, 149, 254, 102, 118, 43, 219, 247, 198, 114, 225, 86, 214, 204, 37, 59, 131, 61, 241, 221, 105, 177, 176, 78, 117, 31, 15);
   const back = KeyShareServerHello.from(x25519)
   assertEquals(x25519.toString(), back.toString())
})
