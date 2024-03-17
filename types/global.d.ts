import 'vue/jsx'
import { ExposeInMainWorldApi } from "./electron";

declare global {
  interface Window {
    electronAPI: ExposeInMainWorldApi;
  }

  type RefType<T> = T | null;

  type Recordable<T = any> = Record<string, T>;

  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
}

export { }; 
