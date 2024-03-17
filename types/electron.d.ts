import { IpcRenderer,IpcRendererEvent } from 'electron'

export interface ExposeInMainWorldApi {
  sendMessageToMain: (value: string) => void
  onMessageFromMain: (callback: IpcRendererListener<[string]>) => IpcRenderer
}

declare type IpcRendererListener<T extends any[] = any[]> = (event: IpcRendererEvent, ...args: T) => void