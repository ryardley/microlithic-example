// This code comes from https://stackoverflow.com/a/14801711
/**
 * Removes a module from the cache
 */
export default function purgeCache(moduleName: string) {
  // Traverse the cache looking for the files
  // loaded by the specified module name
  searchCache(moduleName, (mod: { id: string }) => {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys((module.constructor as any)._pathCache).forEach(cacheKey => {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete (module.constructor as any)._pathCache[cacheKey];
    }
  });
}

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName: string, callback: (a: any) => void) {
  // Resolve the module identified by the specified name
  let mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod) {
    if (require.cache[mod] !== undefined) {
      mod = require.cache[mod];
      // Recursively go over the results
      (function traverse(modd: any) {
        // Go over each of the module's children and
        // traverse them
        modd.children.forEach((child: any) => {
          traverse(child);
        });

        // Call the specified callback providing the
        // found cached module
        callback(modd);
      })(mod);
    }
  }
}
