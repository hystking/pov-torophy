const fs = require('fs');
const Serialport = require('serialport');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { Logger } = require("./Logger");

let mainWindow;
let logger;

app.on('ready', () => {
  // メインのウィンドウ
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  logger = new Logger(mainWindow);

  // メインのウィンドウをロード
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

app.on('window-all-closed', () => {
  // 終了条件
  app.quit();
});

ipcMain.on('load-port-info-list', (event, data) => {
  // シリアルポートのリストを返す
  Serialport.list().then(portInfoList => {
    event.sender.send('port-info-list', portInfoList);
  });
});

ipcMain.on('send-color-data', (event, data, comName) => {
  // シリアルポートで色データを送る
  logger.log('シリアルポートで送信開始');
  const buffer = Buffer.from(data);
  const port = new Serialport(comName);
  port.write(buffer, err => {
    if(err) {
      logger.log("送信中にエラーが起きました");
      logger.log(err.message);
    } else {
      logger.log("送信完了");
    }
    port.close();
    event.sender.send('send-color-data-completed');
  });
});

ipcMain.on('save-state', (event, stateString) => {
  // 保存のダイアログ
  const defaultPath = 'color-data.json';
  dialog.showSaveDialog(
    {
      defaultPath,
      properties: {
        multiSelections: false,
      },
    },
    filePath => {
      if (filePath == null) {
        return;
      }
      fs.writeFileSync(filePath, stateString);
    },
  );
});

ipcMain.on('open-open-dialog', (event, stateString) => {
  // ロードのダイアログ
  dialog.showOpenDialog({}, filePaths => {
    if (filePaths == null) {
      return;
    }
    const filePath = filePaths[0];
    if (filePath == null) {
      return;
    }
    const stateString = fs.readFileSync(filePath, 'utf8');
    event.sender.send('load-state', stateString);
  });
});
