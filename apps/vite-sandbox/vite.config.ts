import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const projectDir = resolve(fileURLToPath(new URL("../..", import.meta.url)));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@lonlat/components": resolve(projectDir, 'libs/components')
    }
  }
})
