//@ts-self-types="../type/pskxmodes.d.ts"
import { PskKeyExchangeMode, sanitize, unity, vector8 } from "./dep.ts";
import { parseItems } from "./utils.js";

// TODO

/* export class PskKeyExchangeModes_0 extends Constrained {
    static from(array) {
        const copy = Uint8Array.from(array);
        const lengthOf = copy.at(0);
        const ke_modes = parseItems(copy, 1, lengthOf, PskKeyExchangeMode);
        return new PskKeyExchangeModes(...ke_modes)
    }
    constructor(...ke_modes) {
        super(1, 255, ...ke_modes.map(e => e.Uint8))
        this.ke_modes = ke_modes;
    }
} */

/**
 * ```
 * struct {
 *     PskKeyExchangeMode ke_modes<1..255>;
 * } PskKeyExchangeModes;
 * ```
 *
 * Represents a list of key exchange modes the client supports.
 * psk_ke:  PSK-only key establishment.  In this mode, the server
      MUST NOT supply a "key_share" value.

   psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
      client and server MUST supply "key_share" values as described in
      Section 4.2.8.

 */
export class PskKeyExchangeModes extends Uint8Array {
    #ke_modes;

    static fromModes(...ke_modes) {
        ke_modes = unity(...ke_modes.map(e=>e.byte))
        return new PskKeyExchangeModes(vector8(ke_modes));
    }

    static from(array) {
        return new PskKeyExchangeModes(array);
    }

    constructor(...args) {
        sanitize(args, { min: 1, max: 255 });
        super(...args);
    }

    get ke_modes() {
        this.#ke_modes ||= parseItems(this, 1, this.length - 1, PskKeyExchangeMode, {store: []});
        return this.#ke_modes;
    }
}

