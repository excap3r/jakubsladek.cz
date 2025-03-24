import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable minification with the fastest option (esbuild)
    minify: 'esbuild',
    cssMinify: true,
    // Generate sourcemaps only in development
    sourcemap: process.env.NODE_ENV === 'development',
    // Improve chunk size and distribution
    chunkSizeWarningLimit: 800,
    // Optimize output for faster loading
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        // Use content hashing for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Modern approach for chunk splitting
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor_three';
            if (id.includes('gsap')) return 'vendor_gsap';
            if (id.includes('@studio-freight/lenis')) return 'vendor_lenis';
            return 'vendor';
          }
          if (id.includes('src/modules/animations.js')) {
            return 'animations';
          }
          if (id.includes('src/effects/')) {
            return 'effects';
          }
          return null;
        }
      }
    },
    // Optimize assets - lower limit to inline fewer files
    assetsInlineLimit: 2048, // Inline small files (2kb)
  },
  // Enable asset preloading
  optimizeDeps: {
    include: ['three', 'gsap', '@studio-freight/lenis'],
    exclude: []
  },
  // Preserve some custom directives
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  publicDir: 'public', // Files in this directory will be served at root path and copied to dist on build
  plugins: [
    // Enable compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1kb
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Optimize images - with more aggressive settings
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75, // Lower quality for better compression
        progressive: true,
      },
      pngquant: {
        quality: [0.7, 0.8], // More aggressive compression
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
          {
            name: 'cleanupIDs',
            active: true,
          },
          {
            name: 'removeUselessStrokeAndFill',
            active: true,
          }
        ],
      },
      webp: {
        quality: 75, // Lower quality for better compression
        method: 6, // Higher compression method
        nearLossless: 60,
      },
    }),
  ],
})