// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
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
  ],
  css: ['@/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '~/assets/scss/fonts.scss';`,
        },
      },
    },
  },
  imports: {
    dirs: ['stores/**', 'composables/**', 'models/**'],
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
})
