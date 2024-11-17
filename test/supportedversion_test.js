import { assertEquals } from "jsr:@std/assert";
import { Selected_version, Versions, SupportedVersions } from "../src/supportedversion.js";

Deno.test("Selected_version", () => {
   const test = Selected_version.default();
   const back = Selected_version.from(test);
   assertEquals(test, back)
})

Deno.test("Versions", () => {
   const test = Versions.default();
   const back = Versions.from(test);
   assertEquals(test, back)
})

Deno.test("SupportedVersions for client_hello", () => {
   const test = SupportedVersions.forClient_hello();
   const back = SupportedVersions.fromClient_hello(test);
   assertEquals(test, back)
})

Deno.test("SupportedVersions for server_hello", () => {
   const test = SupportedVersions.forServer_hello();
   const back = SupportedVersions.fromServer_hello(test);
   assertEquals(test, back)
})

