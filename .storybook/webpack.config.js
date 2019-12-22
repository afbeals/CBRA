const path = require('path');
module.exports = ({ config, mode }) => {

    config.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'resolve-url-loader', // resolve styles url request
            'postcss-loader', // autoprefixing
            {
                loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
            },
        ],
        include: path.resolve(__dirname, '../src/styles')
    });

    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });

    config.resolve.extensions.push('.css', '.sass', '.scss');

    return config;
}
