import type { ExposeInMainWorldApi } from './electron';
import 'vue/jsx';

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

export {};
