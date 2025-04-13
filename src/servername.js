//@ts-self-types="../type/servername.d.ts"
import { sanitize, uint16, unity } from "./dep.ts";
import { parseItems } from "./utils.js"
//LINK - https://datatracker.ietf.org/doc/html/rfc6066#section-3

const encoder = new TextEncoder
const decoder = new TextDecoder
const MAX16_1 = 65535

/**
 * ```
 * opaque HostName<1..2^16-1>;
 * ```
 */
export class HostName extends Uint8Array {
   #opaque;

   static fromName(hostName) {
      hostName = encoder.encode(hostName)
      return new HostName(unity(uint16(hostName.length), hostName));
   }

   static from(array) {
      return new HostName(array);
   }

   constructor(...args) {
      sanitize(args, { min: 1, max: MAX16_1 });
      super(...args);
   }

   get opaque() {
      this.#opaque ||= this.subarray(2);
      return this.#opaque.view;
   }

   get name() {
      return decoder.decode(this.subarray(2));
   }
}

/**
 * ```
 * struct {
          NameType name_type;
          select (name_type) {
              case host_name: HostName;
          } name;
      } ServerName;

   enum {
          host_name(0), (255)
      } NameType;
   ```
 */
export class ServerName extends Uint8Array {
   #hostName
   
   static fromName(hostName) {
      hostName = HostName.fromName(hostName);
      return new ServerName(unity(0, hostName))
   }
   static from(array) { return new ServerName(array) }
   constructor(...args) {
      sanitize(args, { start: 1, min: 1, max: MAX16_1 });
      super(...args)
   }
   get name() {
      this.#hostName ??= HostName.from(this.subarray(1));
      return this.#hostName.name;
   }
}

/**
 * ```
 * struct {
          ServerName server_name_list<1..2^16-1>
      } ServerNameList;
   ```
 */
export class ServerNameList extends Uint8Array {
   #serverNames;

   static fromNames(...names) {
      const serverNames = unity(...names.map(name => ServerName.fromName(name)))
      return new ServerNameList(unity(uint16(serverNames.length), serverNames));
   }

   static from(array) {
      return new ServerNameList(array);
   }

   constructor(...args) {
      sanitize(args, { min: 1, max: MAX16_1 });
      super(...args);
   }

   get serverNames() {
      this.#serverNames ||= parseItems(this, 2, this.length - 2, ServerName, {store: []});
      return this.#serverNames;
   }
}

