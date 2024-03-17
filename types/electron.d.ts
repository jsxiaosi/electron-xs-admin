import Electron from 'electron';

export interface ElectronAPI {
  sendMessageToMain: (value: string) => void
  onMessageFromMain: (callback: IpcRendererListener<[string]>) => string
}

declare type IpcRendererListener<T extends any[] = any[]> = (event: Electron.IpcRendererEvent, ...args: T) => void