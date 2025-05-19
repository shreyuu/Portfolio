/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      // Override SVGO configuration
      const svgRule = webpackConfig.module.rules
        .find(rule => rule.oneOf)
        .oneOf.find(rule => rule.test && rule.test.toString().includes('svg'));

      if (svgRule) {
        svgRule.use = [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        ];
      }

      // Override PostCSS configuration
      const postCssRule = webpackConfig.module.rules
        .find(rule => rule.oneOf)
        .oneOf.find(rule => rule.test && rule.test.toString().includes('css'));

      if (postCssRule) {
        const postCssLoader = postCssRule.use.find(
          loader => loader.loader && loader.loader.includes('postcss-loader')
        );

        if (postCssLoader) {
          postCssLoader.options = {
            ...postCssLoader.options,
            postcssOptions: {
              plugins: [
                postcssFlexbugsFixes,
                [
                  postcssPresetEnv,
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
              ],
            },
          };
        }
      }

      return webpackConfig;
    },
  },
  style: {
    postcss: {
      plugins: [
        postcssFlexbugsFixes,
        postcssPresetEnv({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  },
};
