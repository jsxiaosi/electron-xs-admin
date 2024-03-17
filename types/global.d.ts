import 'vue/jsx'
import { ElectronAPI } from "./electron";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  type RefType<T> = T | null;

  type Recordable<T = any> = Record<string, T>;

  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
}

export { }; 
