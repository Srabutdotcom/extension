import { ExtensionType } from "../src/dep.ts";
import { Extension } from "../src/extension.js";
import { ServerNameList } from "../src/servername.js";

const test_0 = Extension.create(ExtensionType.SERVER_NAME, ServerNameList.fromNames('localhost_1', 'localhost_2'));
const test_1 = Extension.from(test_0)

const _null= null;