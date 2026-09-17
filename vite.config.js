import { accessBdApiPlugin } from './server/aiProxy.js'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
  if (env.OPENAI_MODEL) process.env.OPENAI_MODEL = env.OPENAI_MODEL

  return {
    plugins: [react(), tailwindcss(), accessBdApiPlugin()],
  }
})
