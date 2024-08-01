const { override, addBabelPlugin } = require("customize-cra");

module.exports = override(
  addBabelPlugin([
    "module-resolver",
    {
      alias: {
        "@components": "./src/components",
        "@utils": "./src/utils",
        "@styles": "./src/styles",
      },
    },
  ])
);
