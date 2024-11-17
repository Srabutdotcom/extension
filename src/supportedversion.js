//@ts-self-types="../type/supportedversion.d.ts"
import { Version } from "@tls/enum";
import { ProtocolVersion } from "./dep.ts";
import { Constrained } from "./dep.ts";
import { Struct } from "./dep.ts";

export class SupportedVersions extends Struct {
   static forClient_hello() {
      return new SupportedVersions(Versions.default());
   }
   static forServer_hello() {
      return new SupportedVersions(Selected_version.default());
   }
   static fromClient_hello(array) {
      const versions = Versions.from(array)
      const supportedVersions = new SupportedVersions(versions);
      supportedVersions.versions = versions;
      return supportedVersions
   }
   static fromServer_hello(array) {
      const selected_version = Selected_version.from(array);
      const supportedVersions = new SupportedVersions(selected_version);
      supportedVersions.selected_version = selected_version;
      return supportedVersions
   }
   constructor(version) {
      super(version)
   }
}

export class Versions extends Constrained {
   static default() { return new Versions(Version.TLS13.protocolVersion()) }
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      const versions = [];
      for (let offset = 1; offset < lengthOf + 1;) {
         const version = ProtocolVersion.from(copy.subarray(offset));
         versions.push(version); offset += version.length;
      }
      return new Versions(...versions)
   }
   constructor(...versions) {
      super(2, 254, ...versions)
      this.versions = versions
   }
}

export class Selected_version {
   static default() { return Version.TLS13.protocolVersion() }
   static from(array) { return ProtocolVersion.from(array) }
}

