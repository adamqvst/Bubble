import { defineConfig } from 'vite'

export default defineConfig({
  
    build: {
        rollupOptions: {
            input: {
                app: './bubble.html',
            },
        },
    },
    server: {
        open: '/bubble.html',
    },
})