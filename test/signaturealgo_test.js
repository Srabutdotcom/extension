import { assertEquals } from "jsr:@std/assert";
import { SignatureSchemeList } from "../src/signaturealgo.js";
import { SignatureScheme } from "../src/dep.ts";

const test = SignatureSchemeList.fromSchemes(
   SignatureScheme.RSA_PSS_RSAE_SHA256,
   SignatureScheme.RSA_PSS_RSAE_SHA384
);
const back = SignatureSchemeList.from(test);
const algos = test.supported_signature_algorithms
const _null = null;
