//@ts-self-types="../type/pskxmodes.d.ts"
import { /* Constrained,  */PskKeyExchangeMode } from "./dep.ts";
import { parseItems } from "./utils.js";

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

    static sanitize(args) {
        if (args[0] instanceof Uint8Array) {
            const lengthOf = args[0][0];
            if (lengthOf < 1 || lengthOf > 255) {
                throw new RangeError("Length of PskKeyExchangeModes should be between 1 and 255");
            }
            args[0] = args[0].slice(0, 1 + lengthOf);
        }
    }

    static fromModes(...ke_modes) {
        const array = ke_modes.reduce((prev, curr) => {
            prev.push(curr[0]??+curr);
            return prev;
        }, []);
        array.unshift(array.length);
        return new PskKeyExchangeModes(new Uint8Array(array));
    }

    static from(array) {
        return new PskKeyExchangeModes(array);
    }

    constructor(...args) {
        PskKeyExchangeModes.sanitize(args);
        super(...args);
    }

    get ke_modes() {
        this.#ke_modes ||= parseItems(this, 1, this.length - 1, PskKeyExchangeMode);
        return this.#ke_modes;
    }
}

