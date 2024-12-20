import certGen from './certgen';
import { resolve } from 'path';
import AppConfig from './app.config';
import * as process from 'node:process';
import { name as projectName } from './package.json';

export default async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const devHttps = {
    key: '',
    cert: ''
  };

  if (process.env.NODE_ENV === 'development') {
    const { devServerKey, devServerCert } = await certGen('./certs/app.key', './certs/app.crt');
    devHttps.key = devServerKey;
    devHttps.cert = devServerCert;
  }

  const getURL = (url: string) => {
    if (isProduction) {
      return `/${projectName}/${url}`;
    }

    return `/${url}`;
  };

  return {
    typescript: {
      shim: false
    },
    ssr: AppConfig.USE_SERVER,
    target: 'static',
    builder: 'webpack',
    vue: {
      compilerOptions: {
        isCustomElement: (tag: string) =>
          tag.startsWith('a-') || tag.startsWith('xrextras-') || tag.startsWith('lottie-player')
      }
    },
    useRuntimeConfig: true,
    runtimeConfig: {
      public: {
        // Will be available on both server and client
      }
    },
    css: ['~/assets/styles/main.scss'],
    styleResources: {
      scss: ['~/assets/styles/_fonts.scss', '~/assets/styles/utils/index.scss']
    },
    devServer: {
      https: devHttps,
      port: '3000'
    },
    rootDir: resolve('./src'),
    app: {
      head: {
        title: AppConfig.PROJECT_TITLE,
        noscript: [],
        script: [],
        link: [{ rel: 'icon', type: 'image/x-icon', href: getURL('favicon.ico') }]
      },
      cdnUrl: AppConfig.NUXT_APP_CDN_URL || undefined,
      baseURL: getURL('')
    },
    hooks: {},
    webpack: {
      terser: {
        terserOptions: {
          compress: {
            drop_console: isProduction
          }
        }
      }
    },
    sound: {
      sounds: {
        scan: true
      }
    },
    modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/style-resources', 'vue3-pixi-nuxt'],
    nitro: {
      preset: 'aws-lambda'
    }
  };
};
