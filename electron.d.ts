// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElectronEventListener = (...args: any[]) => void;

export interface IElectronAPI {
  on: (channel: string, func: ElectronEventListener) => void;
  off: (channel: string, func: ElectronEventListener) => void;
  send: (channel: string, ...args: unknown[]) => void;
  invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
}

declare global {
  interface Window {
    ipcRenderer: IElectronAPI;
  }
}