const fs = require('fs');
const Serialport = require('serialport');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { Logger } = require('./Logger');

let mainWindow;
let logger;
let port;

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

ipcMain.on('open-port', (event, comName, baudRate) => {
  if(port) {
    port.close();
  }

  port = new Serialport(comName, {
    baudRate: baudRate,
  });

  port.on('error', err => {
    logger.log(`${comName}:${baudRate} に送信中にエラーが起きました`);
    logger.log(err.message);
  });

  port.on('close', err => {
    logger.log(`${comName}:${baudRate} を切断しました`);
  });

  logger.log(`${comName}:${baudRate} に接続しました`);
  event.sender.send('port-opened');
});

ipcMain.on('send-color-data', (event, data, maxBufferSize, sendingInterval) => {
  // シリアルポートで色データを送る
  function sendChunk(sendingIndex) {
    if (sendingIndex >= data.length) {
      logger.log('送信終了');
      event.sender.send('send-color-data-completed');
      return;
    }
    const subBufferSize = Math.min(data.length - sendingIndex, maxBufferSize);
    const subBuffer = Buffer.from(data.slice(sendingIndex, sendingIndex + subBufferSize));
    port.write(subBuffer, err => {
      if (err) {
        logger.log('送信中にエラーが起きました');
        logger.log(err.message);
      } else {
        logger.log(`${sendingIndex + subBufferSize}[bytes] 送信完了`);
      }
      setTimeout(function() {
        sendChunk(sendingIndex + subBufferSize);
      }, sendingInterval);
    });
  }
  logger.log(`送信開始 合計バイト数: ${data.length}[bytes]`);
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
