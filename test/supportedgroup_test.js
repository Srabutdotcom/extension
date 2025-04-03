import { assertEquals } from "jsr:@std/assert";
import { NamedGroupList } from "../src/supportedgroup.js";
import { NamedGroup } from "../src/dep.ts";

const test = NamedGroupList.fromGroups(
   NamedGroup.X25519,
   NamedGroup.SECP256R1
)
