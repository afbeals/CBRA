const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // optomize && minify css
const CleanWebpackPlugin = require('clean-webpack-plugin'); // clean build on bundling (remove build folder)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // build index file dynamically
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css to seperate files
const TerserPlugin = require('terser-webpack-plugin'); // optimation and minifier
const merge = require('webpack-merge'); // i ntroduces merge function for export
const path = require('path'); // directory paths
const webpack = require('webpack'); // bundle application
const buildConfig = require('./buildConfig'); // Build Constants

// determine enviornment dynamically
const TARGET = process.env.npm_lifecycle_event;
const isDev = TARGET !== 'prod';

// store path locations
const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
  templates: path.resolve(__dirname, 'templates'),
};

// configure html builder
const htmlConfig = {
  template: path.join(paths.templates, 'index.html'),
  minify: {
    collapseWhitespace: true,
  },
  env: TARGET,
  ...buildConfig.htmlTemplate,
};

// common options between ENV's
const common = {
  devServer: {
    contentBase: paths.build,
    compress: true,
    watchOptions: {
      ignored: ['node_modules'],
      aggregateTimeout: 500,
    },
  },
  entry: {
    main: [path.join(paths.src, 'index.js')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          'eslint-loader', // linter (make sure in correct order)
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'url-loader', // inline images
            options: {
              limit: 8192, // use fallback if image lager than this in kb
              fallback: 'file-loader',
              outputPath: 'images',
              name: '[name]-[hash:8].[ext]', // fallback loader option
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings (minified if in prod)
          'css-loader', // translates CSS into CommonJS
          'resolve-url-loader', // resolve styles url request
          'postcss-loader', // autoprefixing
          {
            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
            options: {
              soureMap: true,
              sourceMapContents: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.build]),
    new HtmlWebpackPlugin(htmlConfig),
    new webpack.EnvironmentPlugin({ NODE_ENV: TARGET }), // add env var when compiling
  ],
  resolve: {
    alias: {
      // resolve directory alias for imports
      '~Components': path.join(paths.src, '/components/'),
      '~Modules': path.join(paths.src, '/modules/'),
      '~Pages': path.join(paths.src, '/pages/'),
      '~Styles': path.join(paths.src, '/styles/'),
      '~Util': path.join(paths.src, '/util/'),
      '~Images': path.resolve(__dirname, './public/images/'),
    },
    extensions: ['.js', '.jsx', '.css', '.sass', '.scss', '.jpeg'], // import extention resolvers, makes extention not needed in import request
  },
};

const devEnv = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true, // serv index file for history object,
    clientLogLevel: 'error',
    hot: true,
    host: '0.0.0.0',
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
  mode: 'development',
  output: {
    path: paths.build,
    filename: 'app.[hash].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};

const prodEnv = {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // multi-process parallel running to improve the build speed
        sourceMap: true, // Must be set to true  due to devtool option
        terserOptions: {
          mangle: true, // Note `mangle.properties` is `false` by default.
        },
      }),
    ],
  },
  output: {
    path: paths.build,
    filename: 'app.[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }), // create global constants , configured at compile time
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(), // optomize js bundle (id references)
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
};

// Export Webpack
process.env.BABEL_ENV = TARGET; // set babel env

if (isDev) {
  module.exports = merge(common, devEnv);
} else {
  module.exports = merge(common, prodEnv);
}
