import { defineConfig } from 'vite';
import { commonjsDeps, commonjsDepsPaths } from '@koumoul/vjsf/utils/build.js'
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import vitePluginRequire from "vite-plugin-require";
import vuetify from "vite-plugin-vuetify";
import path from 'path';
import {nodePolyfills} from "vite-plugin-node-polyfills";

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
    // Compat Build
    /*vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3
          }
        }
      }
    }),*/
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
    nodePolyfills(), // Polyfill for Eventsource. TODO maybe rebuild eventsource later
    // TODO need to be readded??
    /*Components({
      resolvers: [
        (componentName) => {
          if (componentName.startsWith("VJsf")) {
            return { name: componentName, as:componentName, from: '@koumoul/vjsf' };
          }
        },
      ],
    }),*/
  ],
  define: {
    'process.env': process.env
  },
  build: {
    target: 'esnext', // you can also use 'es2020' here
    commonjsOptions: {
      include: commonjsDepsPaths,
    },
  },
  optimizeDeps: {
    include: commonjsDeps,
    esbuildOptions: {
      target: 'esnext', // you can also use 'es2020' here
    },
  },
})
