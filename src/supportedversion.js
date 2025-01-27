//@ts-self-types="../type/supportedversion.d.ts"
import { ProtocolVersion, Version } from "./dep.ts";
import { Constrained } from "./dep.ts";
import { Struct } from "./dep.ts";
import { parseItems } from "./utils.js"

export class SupportedVersions extends Struct {
   static forClient_hello() {
      return Versions.default();
   }
   static forServer_hello() {
      return Selected_version.default();
   }
   static fromClient_hello(array) {
      return Versions.from(array)
   }
   static fromServer_hello(array) {
      return Selected_version.from(array);
   }
   constructor(version) {
      super(version)
   }
}

export class Versions extends Constrained {
   static default() { return new Versions(
      Version.TLS13,
   ) }
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      const versions = parseItems(copy, 1, lengthOf, Version)
      return new Versions(...versions)
   }
   constructor(...versions) {
      super(2, 254, ...versions.map(e => e.protocolVersion()))
      this.versions = versions
   }
}

export class Selected_version {
   static default() { return Version.TLS13.protocolVersion() }
   static from(array) { return ProtocolVersion.from(array) }
}

