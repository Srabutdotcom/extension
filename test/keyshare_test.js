import { KeyShareClientHello } from "../src/keyshare.js";
import { KeyShareServerHello } from "../src/keyshare.js";
import { NamedGroup } from "../src/dep.ts";
import { assertEquals } from "@std/assert";
import { KeyShareHelloRetryRequest } from "../src/keyshare.js";

Deno.test("KeyShareServerHello", () => {
   const x25519 = Uint8Array.of(0, 29, 0, 32, 201, 130, 136, 118, 17, 32, 149, 254, 102, 118, 43, 219, 247, 198, 114, 225, 86, 214, 204, 37, 59, 131, 61, 241, 221, 105, 177, 176, 78, 117, 31, 15);
   const back = KeyShareServerHello.from(x25519)
   assertEquals(x25519.toString(), back.toString())
})

const keyShareClientHello = Uint8Array.of(0,36,0,29,0,32,153,56,29,229,96,228,189,67,210,61,142,67,90,125,186,254,179,192,110,81,193,60,174,77,84,19,105,30,82,154,175,44);

const back = KeyShareClientHello.from(keyShareClientHello);

// start --- test KeyShareServerHello 
const key = NamedGroup.X25519

const key_0 = KeyShareServerHello.fromGroup(key);
const key_back = KeyShareServerHello.from(key_0);
// end --- test KeyShareServerHello 

// start --- test KeyShareHelloRetryRequest
const keyShare_0 = KeyShareHelloRetryRequest.from(NamedGroup.X25519.byte);
const keyShare_group = keyShare_0.group;
const keyShare_1 = KeyShareHelloRetryRequest.fromGroup(keyShare_group)
// end --- test KeyShareHelloRetryRequest

// start --- test keyShareClientHello
const keyShareClient_0 = KeyShareClientHello.fromGroups(NamedGroup.X25519, NamedGroup.SECP256R1);
const keyShareClient_group = keyShareClient_0.client_shares;//client_share
const keyShareClient_1 = KeyShareClientHello.from(keyShareClient_0)
// end --- test keyShareClientHello

const _null = null;
