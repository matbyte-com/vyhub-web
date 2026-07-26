import { defineConfig } from 'vite';
import { commonjsDeps, commonjsDepsPaths } from '@koumoul/vjsf/utils/build.js'
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import vuetify from "vite-plugin-vuetify";
import path from 'path';
import { readdirSync } from 'fs';
import { createRequire } from 'module';

// vite-plugin-vuetify's autoImport rewrites each component usage into a granular
// `vuetify/components/VXxx` import. Those are only reached through lazily-loaded
// routes, so Vite discovers them on first visit and re-optimizes -> full reload.
// Enumerate every component subpath up front so they're all pre-bundled. Built
// from the installed package so it stays correct across Vuetify upgrades.
const require = createRequire(import.meta.url);
const vuetifyComponentsDir = path.dirname(require.resolve('vuetify/components'));
const vuetifyComponents = readdirSync(vuetifyComponentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('V'))
  .map((d) => `vuetify/components/${d.name}`);

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
    // Settings tabs and most routes are loaded via variable dynamic imports
    // (e.g. `import(`../components/SettingComponents/${name}.vue`)`), which
    // Vite's dependency scanner cannot analyze statically. Their deps are only
    // discovered on first visit, triggering a re-optimize + full page reload.
    // Pre-bundle them up front so navigating to a new page stays an instant HMR
    // transition. (Dev-only concern; production builds bundle everything ahead.)
    include: [
      ...commonjsDeps,
      ...vuetifyComponents,
      'sortablejs',
      'vue-draggable-plus',
      'semver',
      'p-debounce',
      'browser-image-compression',
      'country-flag-icons/unicode',
      'country-list',
      'iso-639-1-plus',
      'currency-codes',
      'humanize-duration',
      'vue3-apexcharts',
      'swiper/element',
      'qs',
      'axios-extensions',
      'openapi-client-axios',
      'vue-gtag',
      'mitt',
      'ckeditor5',
      '@ckeditor/ckeditor5-vue',
    ],
  },
})
