import { Options } from 'poi';

const options: Options = {
  entry: 'app/index.tsx',
  outDir: 'build',
  plugins: [require('@poi/plugin-typescript')()],
  configureWebpack(config: any) {
    /**
     * To make possible loading .less styles of ant design we need to edit less loader
     * and set `javascriptEnabled` option
     */
    config.module.rules.forEach((item) => {
      if (item && item.test instanceof RegExp && item.test.test('.less')) {
        item.oneOf[item.oneOf.length - 1].use.forEach((useItem) => {
          if (useItem.loader === 'less-loader') {
            useItem.options.javascriptEnabled = true;
          }
        });
      }
    });
    return config;
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};

export default options;
