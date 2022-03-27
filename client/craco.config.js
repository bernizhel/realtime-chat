const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

module.exports = {
    webpack: {
        plugins: {
            add: [
                new ModuleFederationPlugin({
                    // name: 'chat',
                    // filename: './src/Chat.js',
                    // remotes: {},
                    // exposes: {},
                    // shared: {
                    //     ...deps,
                    //     react: {
                    //         singleton: true,
                    //         requiredVersion: deps.react,
                    //     },
                    //     'react-dom': {
                    //         singleton: true,
                    //         requiredVersion: deps['react-dom'],
                    //     },
                    // },
                }),
            ],
        },
    },
};
