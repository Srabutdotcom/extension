//@ts-self-types="../type/supportedversion.d.ts"
import { sanitize, Uint16, unity, vector8, Version } from "./dep.ts";
import { parseItems } from "./utils.js"

export class ProtocolVersion extends Uint16 {
   static fromVersion(version){
      if(version instanceof Version)return ProtocolVersion.from(version.byte);
      if(version instanceof Uint8Array)return ProtocolVersion.from(Version.from(version).byte);
      if(typeof version == "number")return ProtocolVersion.from(Version.fromValue(version).byte);
   }
   static from(array) { return new ProtocolVersion(array) }
   get version() {
      return Version.from(this);
   }
}

export class Selected_version extends ProtocolVersion {}

/**
 * ProtocolVersion versions<2..254>;
 */
export class Versions extends Uint8Array {
   #versions
   static fromVersions(...versions){
      versions = unity(...versions.map(e=>e.byte))
      return Versions.from(vector8(versions));
   }
   static defaultTwo() { return Versions.from(Uint8Array.of(4, 3, 4, 3, 3)) }
   static defaultOne() { return Versions.from(Uint8Array.of(2, 3, 4)) }
   
   static from(array) { return new Versions(array) }
   constructor(...args) {
      sanitize(args, { min:2, max: 254})
      super(...args)
      
   }
   get versions() { 
      this.#versions ||= parseItems(this, 1, this.length - 1, Version, {store: []})
      return this.#versions 
   }
}


