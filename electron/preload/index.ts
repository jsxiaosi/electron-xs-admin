// preload.js
import { ipcRenderer, contextBridge } from 'electron';
import type { IpcRendererListener } from '#/electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessageToMain: (message: string) => ipcRenderer.send('message-to-main', message),
  onMessageFromMain: (callback: IpcRendererListener) =>
    ipcRenderer.on('message-from-main', callback),
});
