import { assertEquals } from "jsr:@std/assert";
import { Versions } from "../src/supportedversion.js";
import { Version } from "../src/dep.ts";
import { ProtocolVersion } from "../src/supportedversion.js";

const supportedVersions = Uint8Array.of(0x04, 0x03, 0x04, 0x03, 0x03);
const supportedVersionsBack = Versions.from(supportedVersions);

const versions = Versions.fromVersions(Version.TLS13);
const version = ProtocolVersion.fromVersion(Version.TLS12);

/* Deno.test("Selected_version", () => {
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
}) */

