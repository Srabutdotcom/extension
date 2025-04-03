import { CertificateAuthoritiesExtension } from "../src/certauth.js";
import { Byte } from "../src/dep.ts";

const ca1 = Byte.create([0x30, 0x82, 0x01, 0x0a]); // Example DN
const ca2 = Byte.create([0x30, 0x81, 0xfa]);       // Another example DN

const test_0 = CertificateAuthoritiesExtension.fromDNs(ca1, ca2);
const test_1 = CertificateAuthoritiesExtension.from(test_0)
const test_2 = new CertificateAuthoritiesExtension(Uint8Array.of(0, 2, 1, 2, 3))