const { ipcRenderer } = window.require('electron');
import { Color } from './Color';

export function index() {
  const state = {
    rowNumber: 0,
    columnNumber: 0,
    colorData: [],
    isMouseDown: false,
    isSendingColor: false,
  };

  function resize() {
    // create new one
    const newColorData = [];
    for (
      let columnIndex = 0;
      columnIndex < state.columnNumber;
      columnIndex += 1
    ) {
      const row = [];
      for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
        row.push(new Color(0, 0, 0));
      }
      newColorData.push(row);
    }

    // copy old color data to new one

    for (
      let columnIndex = 0;
      columnIndex < state.columnNumber;
      columnIndex += 1
    ) {
      const prevRow = state.colorData[columnIndex];
      const newRow = newColorData[columnIndex];
      if (prevRow == null) {
        continue;
      }
      for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
        const prevColor = prevRow[rowIndex];
        const newColor = newRow[rowIndex];
        if (prevColor == null) {
          continue;
        }
        newColor.set(prevColor.red, prevColor.green, prevColor.blue);
      }
    }

    state.colorData = newColorData;
  }

  function createCellsRowDom() {
    const dom = document.createElement('div');
    dom.classList.add('cells__row');
    return dom;
  }

  function createCellsCellDom(columnIndex, rowIndex, color) {
    const dom = document.createElement('div');
    dom.classList.add('cells__cell');
    dom.style.backgroundColor = color.toCSSString();
    dom.addEventListener('mousedown', () => {
      fillColorWithCurrentColor(columnIndex, rowIndex);
    });
    dom.addEventListener('mousemove', () => {
      if (state.isMouseDown) {
        fillColorWithCurrentColor(columnIndex, rowIndex);
      }
    });
    return dom;
  }

  function update() {
    const cellsDom = document.getElementById('cells');
    cellsDom.innerHTML = '';

    for (
      let columnIndex = 0;
      columnIndex < state.colorData.length;
      columnIndex += 1
    ) {
      const row = state.colorData[columnIndex];
      const cellsRowDom = createCellsRowDom();
      for (let rowIndex = 0; rowIndex < row.length; rowIndex += 1) {
        const cellsCellDom = createCellsCellDom(
          columnIndex,
          rowIndex,
          row[rowIndex],
        );
        cellsRowDom.appendChild(cellsCellDom);
      }
      cellsDom.appendChild(cellsRowDom);
    }

    if (state.isSendingColor) {
      document.getElementById('sendButton').textContent = '送信中…';
    } else {
      document.getElementById('sendButton').textContent = '送信';
    }

    document.getElementById('rowNumberInput').value = Math.floor(state.rowNumber / 8);
    document.getElementById('columnNumberInput').value = Math.floor(state.columnNumber / 8);
  }

  function fillColorWithCurrentColor(columnIndex, rowIndex) {
    const hexColorString = document.getElementById('colorPickerInput').value;
    state.colorData[columnIndex][rowIndex].setFromHexColorString(
      hexColorString,
    );
    update();
  }

  function encodeColorDataToSend(colorData) {
    // 4バイト:　ヘッダ 0xC0, 0xFF, 0xEE, 0x11
    // 1バイト:　列数
    // 1バイト:　行数
    // 3バイト * （列数 * 行数）:　RGBのデータを並べたもの
    const columnNumber = colorData.length;
    const rowNumber = columnNumber <= 0 ? 0 : colorData[0].length;

    const dataSize = 4 + 2 + columnNumber * rowNumber * 3;
    const data = new Uint8Array(dataSize);

    data[0] = 0xc0;
    data[1] = 0xff;
    data[2] = 0xee;
    data[3] = 0x11;
    data[4 + 0] = columnNumber;
    data[4 + 1] = rowNumber;

    for (let columnIndex = 0; columnIndex < columnNumber; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
        const color = colorData[columnIndex][rowIndex];
        const index = 4 + 2 + (columnIndex * rowNumber + rowIndex) * 3;
        data[index] = color.red;
        data[index + 1] = color.green;
        data[index + 2] = color.blue;
      }
    }

    return data;
  }

  document.getElementById('rowNumberInput').addEventListener('change', () => {
    state.rowNumber =
      8 * parseInt(document.getElementById('rowNumberInput').value);
    resize();
    update();
  });

  document
    .getElementById('columnNumberInput')
    .addEventListener('change', () => {
      state.columnNumber =
        8 * parseInt(document.getElementById('columnNumberInput').value);
      resize();
      update();
    });

  window.addEventListener('mousedown', () => {
    state.isMouseDown = true;
  });

  window.addEventListener('mouseup', () => {
    state.isMouseDown = false;
  });

  document.getElementById('sendButton').addEventListener('click', () => {
    if (state.isSendingColor) {
      return;
    }
    const data = encodeColorDataToSend(state.colorData);
    console.log(data);
    ipcRenderer.send('send-color-data', data);
    state.isSendingColor = true;
    update();
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    ipcRenderer.send('save-state', JSON.stringify(state));
  });

  document.getElementById('loadButton').addEventListener('click', () => {
    ipcRenderer.send('open-open-dialog');
  });

  ipcRenderer.on('send-color-data-completed', () => {
    state.isSendingColor = false;
    update();
  });

  ipcRenderer.on('load-state', (event, stateString) => {
    console.log(stateString);
    const newState = JSON.parse(stateString);
    Object.assign(state, newState);
    resize();
    update();
  });

  state.columnNumber =
    8 * parseInt(document.getElementById('columnNumberInput').value);
  state.rowNumber =
    8 * parseInt(document.getElementById('rowNumberInput').value);
  resize();
  update();
}
