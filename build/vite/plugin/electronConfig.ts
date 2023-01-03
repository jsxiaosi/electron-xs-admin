import { builtinModules } from 'node:module';
import type { Plugin } from 'vite';
import { build } from 'vite';

function taskBuild(entry: string) {
  // 获取node 所有模块
  const builtins = builtinModules.filter((e) => !e.startsWith('_'));
  builtins.push('electron', ...builtins.map((m) => `node:${m}`));

  return build({
    // 指明要使用的配置文件。如果没有设置，Vite 将尝试从项目根目录自动解析。会导致重复查找文件编译
    configFile: false,
    // 关闭publicDir文件导出到打包目录
    publicDir: false,
    // 编译ts为js
    build: {
      lib: {
        entry,
        formats: ['cjs'],
        fileName: () => '[name].js',
      },
      outDir: 'dist_electron/config',
      emptyOutDir: false,
      rollupOptions: {
        // 设置Node.js包保持引用关系
        external: builtins,
      },
    },
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
  });
}

export function viteElectronTs(entryList: string[]): Plugin {
  return {
    // 插件名称
    name: 'vite-plugin-electron-ts',

    async closeBundle() {
      await Promise.all(entryList.map((i) => taskBuild(i)));
    },
  };
}

export default viteElectronTs;
