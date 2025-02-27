//@ts-self-types="../type/supportedversion.d.ts"
import { safeuint8array, Version } from "./dep.ts";
import { parseItems } from "./utils.js"

export class ProtocolVersion extends Uint8Array {
   static fromVersion(version){
      if(version instanceof Version)return ProtocolVersion.from(version.byte);
      if(version instanceof Uint8Array)return ProtocolVersion.from(Version.from(version).byte);
      if(typeof version == "number")return ProtocolVersion.from(Version.fromValue(version).byte);
   }
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
   static fromVersions(...versions){
      const _version = safeuint8array(...versions.map(v=>{
         if(v instanceof Version)return v.byte;
         if(v instanceof Uint8Array)return Version.from(v).byte;
         if(typeof v == "number")return Version.fromValue(v).byte;
         throw Error(`Expected Version or Uint8Array`)
      }))
      return Versions.from(safeuint8array(_version.length, _version));
   }
   static defaultTwo() { return Versions.from(Uint8Array.of(4, 3, 4, 3, 3)) }
   static defaultOne() { return Versions.from(Uint8Array.of(2, 3, 4)) }
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

