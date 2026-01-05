import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'save-json-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-data') {
            let body = ''
            req.on('data', chunk => {
              body += chunk.toString()
            })
            req.on('end', () => {
              try {
                const { type, data } = JSON.parse(body)
                const filePath = path.resolve(__dirname, `src/data/${type}.json`)
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
                res.statusCode = 200
                res.end(JSON.stringify({ success: true }))
              } catch (error) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: error.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  ],
  server: {
    allowedHosts: ['5974d3256e78.ngrok-free.app']
  }
})
