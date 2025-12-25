const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Find the Babel-Loader rule within the existing configuration
      const rule = webpackConfig.module.rules.find(
        (r) => Array.isArray(r.oneOf)
      ).oneOf.find(
        (r) => r.loader && r.loader.includes('babel-loader')
      );

      if (rule) {
        // Ensure 'include' is an array
        if (typeof rule.include === 'string') {
          rule.include = [rule.include];
        }

        // ⚠️ ADD THE PATH TO THE UNTRANSPILED PACKAGE(S) HERE ⚠️
        // This example includes 'react-router-dom' and a placeholder package.
        // You only need to include packages that are causing the "Module parse failed" error.
        rule.include.push(path.resolve('node_modules/react-router-dom'));
        rule.include.push(path.resolve('node_modules/[dependency-name]/src')); // If you find another package failing

        console.log('Babel-Loader now includes:', rule.include.map(p => path.basename(p)).join(', '));
      }

      return webpackConfig;
    },
  },
};
// module.exports = {
//   reactScriptsVersion: "react-scripts",
//   style: {
//     css: {
//       loaderOptions: () => {
//         return {
//           url: false,
//         };
//       },
//     },
//   },
// };