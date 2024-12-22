// preload.js
import { contextBridge, ipcRenderer } from 'electron';
import type { ExposeInMainWorldApi } from '#/electron';

const exposeInMainWorldApi: ExposeInMainWorldApi = {
  sendMessageToMain: message => ipcRenderer.send('message-to-main', message),
  onMessageFromMain: callback => ipcRenderer.on('message-from-main', callback),
};

contextBridge.exposeInMainWorld('electronAPI', exposeInMainWorldApi);
