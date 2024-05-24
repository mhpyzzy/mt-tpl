import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';
import remoteConsole from 'vite-plugin-remove-console'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  envDir:'env',
  plugins: [
    vue(),
    remoteConsole(),
    AutoImport({
      resolvers: [ElementPlusResolver(),VantResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(),VantResolver()],
    }),
    // 兼容低版本
    legacy({
      targets: ['Chrome 52'],
      modernPolyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      math: 'parens-division'
    }
  },
  server: {
    host:'0.0.0.0',
    proxy:{}
  }
})
