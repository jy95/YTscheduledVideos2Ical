// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const webpack = require('webpack');

module.exports = {
    webpack: (config, { dev, vendor }) => {
        // Perform customizations to webpack config

        // Handles Jquery in a CDN , so that we don't build that again
        config.externals = {
            jquery: 'jQuery'
        };

        // Handles vobject need to load fs for reading stuff , not needed for web app
        // config.node = { fs: 'empty' };

        // Important: return the modified config
        return config
    }
};