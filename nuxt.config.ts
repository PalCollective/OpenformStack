// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viteNode: true
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "dayjs-nuxt",
    "@pinia/nuxt"
  ],
  app: {
    head: {
      title: "PalCollective Forms",
      meta: [
        {
          name: "description",
          content:
            "Open source form backend that allows you to collect form submissions without writing any backend code",
        },
        { charset: "utf-8" },
      ],
    },
  },
  runtimeConfig: {
    // Loaded at runtime from env variables, to avoid burning them into the image
    // (https://nuxt.com/docs/guide/going-further/runtime-config#example)
    googleClientSecret: '',
    apiRouteSecret: '',
    resendApiKey: '',
    byespamApiKey: '',
    inngestEventKey: '',
    inngestSigningKey: '',
    
    public: {
      // These on the other hand are baked to the build in production and hence
      // must be made available during build (check docker-compose.prod.yml)
      FROM_MAIL: process.env.FROM_MAIL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

      // SEO
      baseUrl: process.env.NUXT_BASE_URL,
      siteUrl: process.env.NUXT_SITE_URL,
      siteName: "PalCollective Forms",
      siteDescription:
        "Open source form backend that allows you to collect form submissions without writing any backend code",
      language: "en",
    },
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  colorMode: {
    preference: "light",
  }
});
