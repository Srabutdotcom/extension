// @ts-self-types="../type/extension.d.ts"
//LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2
import { Constrained, Uint16, ExtensionType, Struct } from "./dep.ts";

export class ExtensionData extends Constrained {
   opaque
   static fromOpaque(opaque) { return new ExtensionData(opaque) }
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value; // First 2 bytes represent the length
      const extensionData = copy.subarray(2, lengthOf + 2);
      return new ExtensionData(extensionData);
   }
   constructor(opaque) {
      super(0, 2 ** 16 - 1, opaque)
      this.opaque = opaque
   }
}

export class Extension extends Struct {
   extension_type
   extension_data
   constructor(extension_type, extension_data) {
      super(extension_type.Uint16, ExtensionData.fromOpaque(extension_data))
      this.extension_type = extension_type;
      this.extension_data = extension_data
   }
   static from(array) {
      const copy = Uint8Array.from(array);
      const extension_type = ExtensionType.from(copy.subarray(0, 2))
      const extension_data = ExtensionData.from(copy.subarray(2));
      return new Extension(extension_type, extension_data.opaque)
   }
}