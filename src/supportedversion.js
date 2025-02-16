//@ts-self-types="../type/supportedversion.d.ts"
import { Version } from "./dep.ts";
import { parseItems } from "./utils.js"

export class ProtocolVersion extends Uint8Array {
   static from(array) { return new ProtocolVersion(array) }
   static sanitize(array) {
      try {
         const output = Version.from(array).byte;
         return [output]
      } catch (error) {
         throw error
      }
   }
   constructor(...args) {
      args = (args[0] instanceof Uint8Array) ? ProtocolVersion.sanitize(args[0]) : args
      super(...args)
   }
   get version() {
      return Version.from(this);
   }
}
/**
 * ProtocolVersion versions<2..254>;
 */
export class Versions extends Uint8Array {
   #versions
   static default() { return Versions.from(Uint8Array.of(4, 3, 4, 3, 3)) }
   static sanitize(array) {
      const lengthOf = array.at(0);
      if (lengthOf < 2) throw Error(`Expected length minimal 2`)
      return [array.slice(0, 1 + lengthOf)];
   }
   static from(array) { return new Versions(array) }
   constructor(...args) {
      args = (args[0] instanceof Uint8Array) ? Versions.sanitize(args[0]) : args
      super(...args)
      //this.#versions ||= parseItems(this, 1, this.length - 1, ProtocolVersion)
   }
   get versions() { 
      this.#versions ||= parseItems(this, 1, this.length - 1, ProtocolVersion)
      return this.#versions 
   }
}

export const Selected_version = ProtocolVersion

/* export class SupportedVersions extends Struct {
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

export class Versions_0 extends Constrained {
   static default() {
      return new Versions(
         Version.TLS13,
      )
   }
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
} */

/* export class Selected_version {
   static default() { return Version.TLS13.protocolVersion() }
   static from(array) { return ProtocolVersion.from(array) }
} */

