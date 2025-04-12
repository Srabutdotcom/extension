//@ts-self-types="../type/recordsizelimit.d.ts"
import { Uint16 } from "./dep.ts";

/**
 * Represents the Record Size Limit in a TLS context, extending Uint16.
 */
export class RecordSizeLimit extends Uint16 {}

/* const test_0 = RecordSizeLimit.fromValue(300);
const test_1 = RecordSizeLimit.from(test_0);

const _null = null; */
