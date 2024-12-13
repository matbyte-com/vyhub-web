import { defineConfig } from 'vite';
import { commonjsDeps, commonjsDepsPaths } from '@koumoul/vjsf/utils/build.js'
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import vuetify from "vite-plugin-vuetify";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8050
  },
  preview: {
    port: 8050,
  },
  resolve: {
    alias: {
      // vue: '@vue/compat',
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    vue({
      compilerOptions: {
        // Your options go here
        isCustomElement: (tag) => tag.startsWith('v-'), // Example of a custom option
      },
    }),
    vuetify({
      autoImport: { labs: true }
    }),
    Components(),
  ],
  define: {
    'process.env': process.env
  },
  build: {
    target: 'esnext', // you can also use 'es2020' here
    /*commonjsOptions: {
      include: commonjsDepsPaths,
    },*/
  },
  optimizeDeps: {
    include: commonjsDeps,
    esbuildOptions: {
      target: 'esnext', // you can also use 'es2020' here
    },
  },
})
