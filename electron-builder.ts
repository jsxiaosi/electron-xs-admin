import type { Configuration } from 'electron-builder/out';

const config: Configuration = {
  appId: 'com.xsadmin.app',
  productName: 'vue-xs-admin',
  copyright: 'Copyright © 2022 <小斯斯>',
  publish: {
    provider: 'github',
    releaseType: 'release',
    owner: 'jsxiaosi',
    repo: 'electron-xs-admin',
  },
  icon: 'public/logo-512x512.png',
  mac: {
    target: ['dmg'],
    category: 'public.app-category.utilities',
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32'],
      },
    ],
    artifactName: '${productName}_${version}.${ext}',
  },
  linux: {
    target: ['AppImage'],
    artifactName: '${productName}-Linux-${version}.${ext}',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },
  files: ['dist_electron', 'dist'],
  directories: {
    buildResources: 'assets',
    output: 'dist_electron/release/${version}',
  },
};
export default config;
