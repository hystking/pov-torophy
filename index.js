const fs = require('fs');
const Serialport = require('serialport');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

app.on('ready', () => {
  // メインのウィンドウ
  mainWindow = new BrowserWindow({
    width: 720,
    height: 480,
  });

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
  console.log('send-color-data');
  const buffer = Buffer.from(data);
  const port = new Serialport(comName);
  port.write(buffer, err => {
    if(err) {
      console.log(err.message);
    } else {
      console.log("write ended");
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
