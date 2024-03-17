<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  // import { useIpcRenderer } from '@vueuse/electron';
  // import { ipcRenderer } from 'electron';
  import { deffElementLocale } from '@/hooks/web/useI18n';

  // const ipcRenderer = useIpcRenderer();

  // ipcRenderer.send('message-to-main', 'Hello from Renderer Process');
  // ipcRenderer.on('message-from-main', (_event, message: string) => {
  //   console.log('[Electron message]: ', message);
  // });

  window.electronAPI.sendMessageToMain('Hello from Renderer Process');

  window.electronAPI.onMessageFromMain((_event, message) => {
    console.log('[Electron message]: ', message);
  });

  const { tolocale } = deffElementLocale();
</script>

<template>
  <ElConfigProvider :locale="tolocale">
    <router-view />
  </ElConfigProvider>
</template>
