import { HexaDecimal } from "../src/dep.ts";
import { ServerNameList } from "../src/servername.js";
import { ServerName } from "../src/servername.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("ServerName", () => {
   const test = ServerName.fromName('local');
   const back = ServerName.from(test);
   assertEquals(test, back)
})

Deno.test("ServerNameList", () => {
   const test = ServerNameList.fromNames('local');
   const back = ServerNameList.from(test);
   assertEquals(test, back)
})

const sni = HexaDecimal.fromString(`001100000e736d74702e676d61696c2e636f6d`).byte;
const sniBack = ServerNameList.from(sni);

const sni_0 = HexaDecimal.fromString(
   `00 18 00 00 15 73 6d 74 70 2d 6d 61 69 6c 2e
    6f 75 74 6c 6f 6f 6b 2e 63 6f 6d
   `).byte

const sni_1 = ServerNameList.fromNames("smtp-mail.outlook.com");
