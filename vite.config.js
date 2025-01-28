import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'

export default defineConfig({
    
    plugins: [ glsl() ],

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