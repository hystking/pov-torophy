const fs = require('fs');
const Serialport = require('serialport');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { Logger } = require('./Logger');

const MAX_SUB_BUFFER_SIZE = 128;
const SUB_BUFFER_WAIT = 1000;

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
  function sendChunk(sendingIndex) {
    if (sendingIndex >= buffer.length) {
      port.close();
      return;
    }
    const subBufferSize = Math.min(buffer.length - sendingIndex, MAX_SUB_BUFFER_SIZE);
    const subBuffer = Buffer.from(buffer, sendingIndex, subBufferSize);
    port.write(buffer, err => {
      if (err) {
        logger.log('送信中にエラーが起きました');
        logger.log(err.message);
      } else {
        logger.log(`${sendingIndex + subBufferSize}[bytes] 送信完了`);
      }
      setTimeout(function() {
        sendChunk(sendingIndex + subBufferSize);
      }, SUB_BUFFER_WAIT);
    });
  }
  const buffer = Buffer.from(data);
  const port = new Serialport(comName);

  port.on('error', err => {
    logger.log('送信中にエラーが起きました');
    logger.log(err.message);
    event.sender.send('send-color-data-completed');
  });

  port.on('close', err => {
    logger.log('送信終了');
    event.sender.send('send-color-data-completed');
  });

  logger.log(`送信開始 合計バイト数: ${buffer.length}[bytes]`);
  sendChunk(0);
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
