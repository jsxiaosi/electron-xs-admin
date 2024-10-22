import electron from 'vite-plugin-electron/simple';

import type { PluginOption } from 'vite';

export function configElectronPlugin(isDevelopment: boolean, isProduction: boolean): PluginOption {
  if (!isDevelopment) {
    return electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: !isProduction,
            minify: isProduction,
            outDir: 'dist_electron/config',
            rollupOptions: {
              output: {
                entryFileNames: 'main.js',
              },
            },
          },
        },
      },
      preload: {
        input: 'electron/preload/index.ts',
        vite: {
          build: {
            sourcemap: !isProduction,
            minify: isProduction,
            outDir: 'dist_electron/config',
            rollupOptions: {
              output: {
                entryFileNames: 'preload.mjs',
              },
            },
          },
        },
      },
      // renderer: {},
    });
  } else {
    return [];
  }
}
