import { Byte } from "../src/dep.ts";
import { PskBinderEntry, PskIdentity, Binders, OfferedPsks } from "../src/offeredpsks.js"

// TODO

const offeredPsks = Uint8Array.of(0, 184, 0, 178, 44, 3, 93, 130, 147, 89, 238, 95, 247, 175, 78, 201, 0, 0, 0, 0, 38, 42, 100, 148, 220, 72, 109, 44, 138, 52, 203, 51, 250, 144, 191, 27, 0, 112, 173, 60, 73, 136, 131, 201, 54, 124, 9, 162, 190, 120, 90, 188, 85, 205, 34, 96, 151, 163, 169, 130, 17, 114, 131, 248, 42, 3, 161, 67, 239, 211, 255, 93, 211, 109, 100, 232, 97, 190, 127, 214, 29, 40, 39, 219, 39, 156, 206, 20, 80, 119, 212, 84, 163, 102, 77, 78, 109, 164, 210, 158, 224, 55, 37, 166, 164, 218, 252, 208, 252, 103, 210, 174, 167, 5, 41, 81, 62, 61, 162, 103, 127, 165, 144, 108, 91, 63, 125, 143, 146, 242, 40, 189, 164, 13, 218, 114, 20, 112, 249, 251, 242, 151, 181, 174, 166, 23, 100, 111, 172, 92, 3, 39, 46, 151, 7, 39, 198, 33, 167, 145, 65, 239, 95, 125, 230, 80, 94, 91, 251, 195, 136, 233, 51, 67, 105, 64, 147, 147, 74, 228, 211, 87, 250, 214, 170, 203);

const binder = Byte.fromHex(`3a dd 4f b2 d8 fd f8 22 a0 ca 3c f7 67 8e f5 e8 8d
         ae 99 01 41 c5 92 4d 57 bb 6f a3 1b 9e 5f 9d`);
const binder_0 = crypto.getRandomValues(new Uint8Array(32))

const pskBinderEntry_0 = PskBinderEntry.fromBinder(binder);

const pskIdentity_0 = Uint8Array.of(0, 178, 44, 3, 93, 130, 147, 89, 238, 95, 247, 175, 78, 201, 0, 0, 0, 0, 38, 42, 100, 148, 220, 72, 109, 44, 138, 52, 203, 51, 250, 144, 191, 27, 0, 112, 173, 60, 73, 136, 131, 201, 54, 124, 9, 162, 190, 120, 90, 188, 85, 205, 34, 96, 151, 163, 169, 130, 17, 114, 131, 248, 42, 3, 161, 67, 239, 211, 255, 93, 211, 109, 100, 232, 97, 190, 127, 214, 29, 40, 39, 219, 39, 156, 206, 20, 80, 119, 212, 84, 163, 102, 77, 78, 109, 164, 210, 158, 224, 55, 37, 166, 164, 218, 252, 208, 252, 103, 210, 174, 167, 5, 41, 81, 62, 61, 162, 103, 127, 165, 144, 108, 91, 63, 125, 143, 146, 242, 40, 189, 164, 13, 218, 114, 20, 112, 249, 251, 242, 151, 181, 174, 166, 23, 100, 111, 172, 92, 3, 39, 46, 151, 7, 39, 198, 33, 167, 145, 65, 239, 95, 125, 230, 80, 94, 91, 251, 195, 136, 233, 51, 67, 105, 64, 147, 147, 74, 228, 211, 87, 250, 214, 170, 203)
const pskIdentity_1 = PskIdentity.from(pskIdentity_0);

const binders_0 = Binders.fromBinders(binder, binder_0);

const test_0 = OfferedPsks.from(offeredPsks);
test_0.identities
test_0.binders; // initially, they don't have binders

const offeredPsksWithBinders = Byte.fromHex(`
   00 b8 00 b2 2c 03 5d 82 93 59 ee 5f f7 af 4e c9 00
   00 00 00 26 2a 64 94 dc 48 6d 2c 8a 34 cb 33 fa 90 bf 1b 00 70
   ad 3c 49 88 83 c9 36 7c 09 a2 be 78 5a bc 55 cd 22 60 97 a3 a9
   82 11 72 83 f8 2a 03 a1 43 ef d3 ff 5d d3 6d 64 e8 61 be 7f d6
   1d 28 27 db 27 9c ce 14 50 77 d4 54 a3 66 4d 4e 6d a4 d2 9e e0
   37 25 a6 a4 da fc d0 fc 67 d2 ae a7 05 29 51 3e 3d a2 67 7f a5
   90 6c 5b 3f 7d 8f 92 f2 28 bd a4 0d da 72 14 70 f9 fb f2 97 b5
   ae a6 17 64 6f ac 5c 03 27 2e 97 07 27 c6 21 a7 91 41 ef 5f 7d
   e6 50 5e 5b fb c3 88 e9 33 43 69 40 93 93 4a e4 d3 57 fa d6 aa
   cb 00 21 20 3a dd 4f b2 d8 fd f8 22 a0 ca 3c f7 67 8e f5 e8 8d
   ae 99 01 41 c5 92 4d 57 bb 6f a3 1b 9e 5f 9d
   `)

const test_1 = OfferedPsks.from(offeredPsksWithBinders);
test_1.identities
test_1.binders;

const test_2 = OfferedPsks.fromIdentitiesAndBinders(
   test_1.identities,
   test_1.binders
)

const _null = null;