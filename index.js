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

// 終了条件
app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('load-port-info-list', (event, data) => {
  Serialport.list().then(portInfoList => {
    event.sender.send('port-info-list', portInfoList);
  });
});

ipcMain.on('send-color-data', (event, data, comName) => {
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
