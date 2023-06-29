import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
// 配置组件按需导入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 配置@路径别名
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    // 配置自动按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
      // 这些库在使用时候不需要再导入了，可以直接使用
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      // 配置文件
      dts: "auto-import.d.ts"
    }),
    // 配置组件自动导入
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      // 使这两个目录下的文件不需要引入组件就能直接使用
      dirs: ["src/components", "src/views"],
      // 是否包括所有子目录都可以直接使用
      deep: true,
      // 组件的有效文件扩展名
      extensions: ["vue"],
      // 配置自动导入组件的文件生成的位置
      dts: "components.d.ts"
    }),
  ],
  // ↓解析配置
  resolve: {
    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      }
    }
  }
})
