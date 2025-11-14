import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "nuxt-auth-utils", "@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["**/.nuxt/**", "**/dist/**"],
      },
    },
  },
  css: ["~/assets/css/main.css"],

  nitro: {
    // preset: "node",
    preset: "node-server",
  },
});
