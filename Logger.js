class Logger {
  constructor(window) {
    this.window = window;
  }
  log(message) {
    const now = new Date();
    const logText = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}: ${message}`;
    this.window.webContents.send('log', logText);
    console.log(logText);
  }
}

module.exports = {
  Logger,
};
