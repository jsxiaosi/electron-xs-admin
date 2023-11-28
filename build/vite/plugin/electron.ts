import type { PluginOption } from 'vite';
// eslint-disable-next-line import/default
import electron from 'vite-plugin-electron';

export function configElectronPlugin(): PluginOption[] {
  return electron([
    {
      entry: 'electron/main/index.ts',
      vite: {
        build: {
          sourcemap: true,
          minify: true,
          outDir: 'dist_electron/config',
          rollupOptions: {
            output: {
              entryFileNames: 'main.cjs',
            },
          },
        },
      },
    },
    {
      entry: 'electron/preload/index.ts',
      vite: {
        build: {
          sourcemap: true,
          minify: true,
          outDir: 'dist_electron/config',
          rollupOptions: {
            output: {
              entryFileNames: 'preload.cjs',
            },
          },
        },
      },
    },
  ]);
}
