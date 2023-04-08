// The source of fragment https://github.com/kulshekhar/ts-jest/blob/main/e2e/native-esm-ts/mjs-resolver.ts
const mjsResolver = (path, options) => {
  const mjsExtRegex = /\.mjs$/i;
  const resolver = options.defaultResolver;
  if (mjsExtRegex.test(path)) {
    try {
      return resolver(path.replace(mjsExtRegex, ".mts"), options);
    } catch {
      // use default resolver
    }
  }

  return resolver(path, options);
};

module.exports = mjsResolver;
