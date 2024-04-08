import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';
import remoteConsole from 'vite-plugin-remove-console'

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
