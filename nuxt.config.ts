import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/global.css'],
  app: {
    baseURL: '/',
    head: {
      title: 'SARA Dream Homes Design',
      meta: [
        { name: 'description', content: 'Dream Homes Design' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Quicksand:wght@500;700;800&display=swap' }
      ]
    }
  }
})
