//@ts-self-types="../type/utils.d.ts"

export function parseItems(copy, start, lengthOf, Fn, option = {}) {
   if (start + lengthOf > copy.length) {
      throw new RangeError("Specified length exceeds available data.");
   }
   const { parser= null, store= new Set(), storeset = (store, data)=>{store.set(data.key, data.value)} } = option
   if (!(store instanceof Set || store instanceof Map || store instanceof Array)) {
      throw new TypeError("store must be an instance of Set, Map, or Array.");
   }

   let offset = start;
   while ((offset < lengthOf + start) && (offset < copy.length)) {
      const item = Fn.from(copy.subarray(offset)); offset += item.length;
      if (parser) parser(item)
      if (store instanceof Set) store.add(item);
      else if (store instanceof Map) storeset(store, item);
      else store.push(item)
   }
   return store
}

