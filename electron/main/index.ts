// 控制应用生命周期和创建原生浏览器窗口的模组
import path from 'path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, ipcMain } from 'electron';

globalThis.__filename = fileURLToPath(import.meta.url);
globalThis.__dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV;

const indexHtmlFilePath = path.join(__dirname, '../../dist/index.html');
const preloadFilePath = path.join(__dirname, 'preload.mjs');

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: preloadFilePath,
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  if (NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173/');
    // 打开开发工具
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(indexHtmlFilePath);
  }

  // 监听渲染进程发送的消息
  ipcMain.on('message-to-main', (_event, args) => {
    console.log(args); // 打印从渲染进程接收到的消息
    // 回应渲染进程
    mainWindow.webContents.send('message-from-main', 'Hello from Main Process');
  });
}

app.whenReady().then(createWindow);

app.on('before-quit', () => {
  if (import.meta.env.DEV) {
    app.exit();
  }
});

app.on('activate', function () {
  // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
  // 打开的窗口，那么程序会重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
