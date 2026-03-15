// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // No Nuxt 4, os arquivos ficam na pasta 'app'
  srcDir: 'app',

  css: ['~/assets/css/main.css'],

  modules: [],

  app: {
    head: {
      title: 'Ouviu - Resumos de Livros em Áudio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aprenda mais em menos tempo com resumos de livros inteligentes.' }
      ]
    }
  }
})
