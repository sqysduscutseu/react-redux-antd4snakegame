const { override, fixBabelImports, /*getBabelLoader*/} = require('customize-cra');
// const path = require('path');

module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    }), 
);

// module.exports = function override(config, env) {
//     const babelLoader = getBabelLoader(config.module.rules);
//     const pwd = path.resolve();
//     babelLoader.include = [path.normalize(`${pwd}/src`)];
//     // use babelrc
//     babelLoader.options.babelrc = true;
    
//     return config;
//   };