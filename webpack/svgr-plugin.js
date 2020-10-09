// a lightly modified version of https://github.com/DeviousM/razzle-plugin-svgr
// to allow use of both svgr loader and file loader

"use strict";
const path = require("path");
const WebpackConfigHelpers = require("razzle-dev-utils/WebpackConfigHelpers");
const Helpers = new WebpackConfigHelpers(process.cwd());

const SVGR_COMPONENTS_PATH = path.resolve(__dirname, '../src/common/icons');

const defaultOptions = {
  svgr: {
    dev: {
      svgoConfig: {
        plugins: [
          { removeViewBox: false },
          { mergePaths: false },
          { removeTitle: false }
        ]
      }
    },
    prod: {
      svgoConfig: {
        plugins: [
          { removeViewBox: false },
          { mergePaths: false },
          { removeTitle: false }
        ]
      }
    }
  }
};

module.exports = (
  defaultConfig,
  { target, dev },
  webpack,
  userOptions = {}
) => {
  const config = Object.assign({}, defaultConfig);

  const options = Object.assign({}, defaultOptions, userOptions);

  // Exclude from file-loader
  config.module.rules[
    config.module.rules.findIndex(Helpers.makeLoaderFinder("file-loader"))
  ].exclude.push(/\.(svg)$/);

  const constantEnv = dev ? "dev" : "prod";

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.svg$/,
      oneOf: [
        {
          exclude: SVGR_COMPONENTS_PATH,
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true
          }
        },
        {
          include: SVGR_COMPONENTS_PATH,
          loader: require.resolve("@svgr/webpack"),
          options: options.svgr[constantEnv]
        }
      ]
    }
  ];

  return config;
};
