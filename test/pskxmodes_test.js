import { PskKeyExchangeMode } from "../src/dep.ts";
import { PskKeyExchangeModes } from "../src/pskxmodes.js";
import { assertEquals } from "jsr:@std/assert";

const test = PskKeyExchangeModes.fromModes(PskKeyExchangeMode.PSK_KE, PskKeyExchangeMode.PSK_DHE_KE);
