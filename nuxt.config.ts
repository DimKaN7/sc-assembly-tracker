// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: import.meta.env.NUXT_APP_BASE_URL ?? '/',
    buildAssetsDir: '_nuxt',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1' },
      ],
    },
  },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    '@nuxt/eslint',
    'nuxt-svgo',
    '@vueuse/nuxt',
  ],
  css: ['@/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '~/assets/scss/fonts.scss';
            @use '~/assets/scss/mixins/index.scss' as *;`,
        },
      },
    },
  },
  imports: {
    dirs: ['stores/**', 'composables/**', 'models/**', 'utils/api/**', 'utils/helpers/**'],
  },
  svgo: {
    autoImportPath: '@/assets/images/',
    componentPrefix: 'i',
    defaultImport: 'component',
  },
  devServer: {
    host: '',
  },
  runtimeConfig: {
    public: {
      baseUrl: `${import.meta.env.NUXT_API_BASE_URL}`,
      authUrl: `${import.meta.env.NUXT_AUTH_URL}`,
      assembliesEventsUrl: `${import.meta.env.NUXT_ASSEMBLIES_EVENTS_URL}`,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        'noUncheckedIndexedAccess': false,
      },
    },
  },
  experimental: {
    viteEnvironmentApi: true,
  },
  nitro: {
    preset: 'github-pages',
  },
  routeRules: {
    '/**': { prerender: true },
  },
})
