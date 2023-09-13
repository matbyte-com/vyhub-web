import { defineConfig } from 'vite'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import vitePluginRequire from "vite-plugin-require";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8050,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        (componentName) => {
          if (componentName.startsWith("VJsf")) {
            return { name: componentName, as:componentName, from: '@koumoul/vjsf' };
          }
        },
        VuetifyResolver()
      ],
    }),
    vitePluginRequire({}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  define: {
    'process.env': process.env
  },
  build: {
    target: 'esnext', // you can also use 'es2020' here
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // you can also use 'es2020' here
    },
  },
})
