import { ExtensionType, PskKeyExchangeMode } from "../src/dep.ts";
import { Extension } from "../src/mod.ts";
import { PskKeyExchangeModes } from "../src/pskxmodes.js";
import { assertEquals } from "jsr:@std/assert";

const test = PskKeyExchangeModes.fromModes(/* PskKeyExchangeMode.PSK_KE, */ PskKeyExchangeMode.PSK_DHE_KE);
const test_ext = Extension.create(
   ExtensionType.PSK_KEY_EXCHANGE_MODES,
   test
)
const _null = null;