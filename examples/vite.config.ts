import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginOSSSrc from 'vite-plugin-osssrc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginOSSSrc({
      ossUrl: 'http://zhonger-file.oss-cn-beijing.aliyuncs.com',
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
