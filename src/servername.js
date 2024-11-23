//@ts-self-types="../type/servername.d.ts"
import { Constrained, Struct, Uint16 } from "./dep.ts";
//LINK - https://datatracker.ietf.org/doc/html/rfc6066#section-3

export class HostName extends Constrained {
   opaque
   static fromName(hostName) {
      const hostNameByte = new TextEncoder().encode(hostName);
      return new HostName(hostNameByte);
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const hostName = copy.subarray(2, 2 + lengthOf);
      return new HostName(hostName);
   }

   constructor(opaque) {
      super(1, 65535, opaque);
      this.opaque = opaque;
   }

   get name() {
      return new TextDecoder().decode(this.opaque);
   }
}

export class ServerName extends Struct {
   hostname;

   static fromName(name) {
      const hostName = HostName.fromName(name);
      return new ServerName(hostName);
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const nameType = copy[0];
      if (nameType !== 0) {
         throw new TypeError("Expected nameType of 0 (host_name)");
      }
      const hostname = HostName.from(copy.subarray(1));
      return new ServerName(hostname);
   }

   constructor(hostname) {
      super(Uint8Array.of(0), hostname);
      this.hostname = hostname;
   }

   get name() {
      return this.hostname.name;
   }
}

export class ServerNameList extends Constrained {
   serverName
   static fromName(name){
      const serverName = ServerName.fromName(name);
      return new ServerNameList(serverName)
   }
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const serverName = ServerName.from(copy.subarray(2, 2+ lengthOf ));
      return new ServerNameList(serverName)
   }
   constructor(serverName){
      super(1,2**16-1, serverName);
      this.serverName = serverName
   }
}