const path = require('path')
const svrgPlugin = require('./webpack/svgr-plugin')

const enableSassModules = (baseConfig) => {
  const config = { ...baseConfig }

  const cssRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString() === '/\\.module\\.css$/'
  )
  if (cssRule) {
    const scss = { ...cssRule }

    scss.test = /\.scss$/
    scss.include = path.join(__dirname, 'src')
    scss.use.push({ loader: 'sass-loader' })

    config.module.rules.push(scss)
  }

  return config
}

const enableAliases = (baseConfig, alias) => ({
  ...baseConfig,
  resolve: {
    ...baseConfig.resolve,
    alias
  }
})

module.exports = {
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        useEslint: true,
        forkTsChecker: {
          tsconfig: './tsconfig.json',
          tslint: undefined,
          watch: './src',
          typeCheck: true
        }
      }
    }
  ],
  modify(baseConfig, { target, dev }, webpack) {
    let config = enableSassModules(baseConfig)
    config = enableAliases(config, {
      common: path.resolve('./src/common')
    })
    config = svrgPlugin(config, { target, dev }, webpack)
    return config
  }
}
