// https://nuxt.com/docs/api/configuration/nuxt-config
import certGen from './certgen';
import { resolve } from 'path';
import AppConfig from './app.config';
import * as process from 'node:process';

export default async () => {
  const useServer = AppConfig.USE_SERVER;
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

  return {
    typescript: {
      shim: false
    },
    ssr: useServer,
    builder: 'webpack',
    vue: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('a-') || tag.startsWith('xrextras-') || tag.startsWith('lottie-player')
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
      scss: ['./assets/styles/_fonts.scss', './assets/styles/utils/index.scss']
    },
    devServer: {
      https: devHttps,
      port: '3012',
      host: 'https://192.168.31.226/'
    },
    rootDir: resolve('./src'),
    app: {
      head: {
        noscript: [],
        script: [],
        title: AppConfig.PROJECT_TITLE
      },
      cdnUrl: AppConfig.NUXT_APP_CDN_URL || undefined
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
    modules: [
      '@pinia/nuxt',
      '@vueuse/nuxt',
      '@nuxtjs/style-resources'
    ],
    nitro: {
      preset: 'aws-lambda'
    }
  };
};
