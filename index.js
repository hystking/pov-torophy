// const fs = require('fs');
const Serialport = require('serialport');
const { app, BrowserWindow, ipcMain } = require('electron');

const port = new Serialport('/dev/tty.Bluetooth-Incoming-Port');

app.on('ready', () => {
  // メインのウィンドウ
  mainWindow = new BrowserWindow({
    width: 720,
    height: 480,
  });

  // メインのウィンドウをロード
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

// 終了条件
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('send-color-data', (event, data) => {
  console.log("send-color-data");
  const buffer = Buffer.from(data);
  port.write(buffer);
  event.sender.send('send-color-data-completed');
});
