import { EarlyDataIndication } from "../src/edi.js";
import { uint32 } from "../src/dep.ts";

const new_session_ticket = EarlyDataIndication.from(uint32(15000));
const test_0 = EarlyDataIndication.from(new_session_ticket);

const empty = EarlyDataIndication.client_hello();
const test_1 = EarlyDataIndication.from(empty);

const _null = null;