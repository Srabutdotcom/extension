//@ts-self-types="../type/psk.d.ts"
import { Constrained, Struct, Uint16, Uint32, Uint8 } from "./dep.ts";

//LINK - https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.11

export class Identity extends Constrained {
   static fromIdentity(identity) { return new Identity(identity) }
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const identity = copy.subarray(2, lengthOf + 2);
      return new Identity(identity)
   }
   constructor(identity) {
      super(1, 2 ** 16 - 1, identity)
      this.identity = identity
   }
}

export class PskBinderEntry extends Constrained {
   static fromBinderEntry(binderEntry) {
      return new PskBinderEntry(binderEntry);
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint8.from(copy).value;
      const binderEntry = copy.subarray(1, lengthOf + 1);
      return new PskBinderEntry(binderEntry);
   }

   constructor(binderEntry) {
      super(32, 255, binderEntry);
      this.binderEntry = binderEntry;
   }
}

export class PskIdentity extends Struct {
   static from(array) {
      const copy = Uint8Array.from(array);
      const identity = Identity.from(copy);
      const obfuscated_ticket_age = Uint32.from(copy.subarray(identity.length));
      return new PskIdentity(identity.identity, obfuscated_ticket_age.value)
   }
   constructor(identity, obfuscated_ticket_age) {
      super(
         Identity.fromIdentity(identity),
         Uint32.fromValue(obfuscated_ticket_age)
      )
      this.identity = identity
      this.obfuscated_ticket_age = obfuscated_ticket_age
   }
}

export class Identities extends Constrained {
   static fromIdentities(...pskIdentity) {
      return new Identities(...pskIdentity);
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const identities = copy.subarray(2, lengthOf + 2);
      return new Identities(...identities);
   }

   constructor(...pskIdentity) {
      super(7, 2 ** 16 - 1, ...pskIdentity);
      this.pskIdentity = pskIdentity;
   }
}

export class Binders extends Constrained {
   static fromBinders(...pskBinderEntry) {
      return new Binders(...pskBinderEntry);
   }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const binders = copy.subarray(2, lengthOf + 2);
      return new Binders(...binders);
   }

   constructor(...pskBinderEntry) {
      super(33, 2 ** 16 - 1, ...pskBinderEntry);
      this.pskBinderEntry = pskBinderEntry;
   }
}

export class OfferedPsks extends Struct {
   static from(array) {
      const copy = Uint8Array.from(array);
      const identities = Identities.from(copy);
      const binders = Binders.from(copy.subarray(identities.length));
      return new OfferedPsks(identities, binders)
   }
   constructor(identities, binders) {
      super(identities, binders)
   }
}

export class PreSharedKeyExtension {
   static clientHello(identities, binders) { return new OfferedPsks(identities, binders) }
   static serverHello(index) { return Uint16.fromValue(index) }
}


/* const test = new PskIdentity(Uint8Array.of(1, 4, 5), 3000);
const value = PskIdentity.from(test);
debugger;
 */