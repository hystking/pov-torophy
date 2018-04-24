const { ipcRenderer } = window.require('electron');
import { Color } from './Color';
import { encodeColorDataToSend } from './encodeColorDataToSend';

export function index() {
  const state = {
    columnNumber: 0,
    rowNumber: 0,
    colorData: [],
    isMouseDown: false,
    isSendingColorData: false,
  };

  function resize() {
    // create new one
    const newColorData = [];
    for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
      const row = [];
      for (
        let columnIndex = 0;
        columnIndex < state.columnNumber;
        columnIndex += 1
      ) {
        row.push(new Color(0, 0, 0));
      }
      newColorData.push(row);
    }

    // copy old color data to new one

    for (let rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {
      const prevRow = state.colorData[rowIndex];
      const newRow = newColorData[rowIndex];
      if (prevRow == null) {
        continue;
      }
      for (
        let columnIndex = 0;
        columnIndex < state.columnNumber;
        columnIndex += 1
      ) {
        const prevColor = prevRow[columnIndex];
        const newColor = newRow[columnIndex];
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

  function createCellsCellDom(rowIndex, columnIndex, color) {
    const dom = document.createElement('div');
    dom.classList.add('cells__cell');
    dom.style.backgroundColor = color.toCSSString();
    dom.addEventListener('mousedown', () => {
      fillColorWithCurrentColor(rowIndex, columnIndex);
    });
    dom.addEventListener('mousemove', () => {
      if (state.isMouseDown) {
        fillColorWithCurrentColor(rowIndex, columnIndex);
      }
    });
    return dom;
  }

  function update() {
    const cellsDom = document.getElementById('cells');
    cellsDom.innerHTML = '';

    for (let rowIndex = 0; rowIndex < state.colorData.length; rowIndex += 1) {
      const row = state.colorData[rowIndex];
      const cellsRowDom = createCellsRowDom();
      for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
        const cellsCellDom = createCellsCellDom(
          rowIndex,
          columnIndex,
          row[columnIndex],
        );
        cellsRowDom.appendChild(cellsCellDom);
      }
      cellsDom.appendChild(cellsRowDom);
    }

    if (state.isSendingColorData) {
      document.getElementById('sendButton').textContent = '送信中…';
    } else {
      document.getElementById('sendButton').textContent = '送信';
    }

    document.getElementById('columnNumberInput').value = Math.floor(
      state.columnNumber / 8,
    );
    document.getElementById('rowNumberInput').value = Math.floor(
      state.rowNumber / 8,
    );
  }

  function fillColorWithCurrentColor(rowIndex, columnIndex) {
    const hexColorString = document.getElementById('colorPickerInput').value;
    state.colorData[rowIndex][columnIndex].setFromHexColorString(
      hexColorString,
    );
    update();
  }

  document
    .getElementById('columnNumberInput')
    .addEventListener('change', () => {
      state.columnNumber =
        8 * parseInt(document.getElementById('columnNumberInput').value);
      resize();
      update();
    });

  document.getElementById('rowNumberInput').addEventListener('change', () => {
    state.rowNumber =
      8 * parseInt(document.getElementById('rowNumberInput').value);
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
    if (state.isSendingColorData) {
      return;
    }
    const data = encodeColorDataToSend(state.colorData);
    const comName =
      comNameList.options == null
        ? ''
        : comNameList.options[comNameList.selectedIndex].value;
    ipcRenderer.send('send-color-data', data, comName);
    state.isSendingColorData = true;
    update();
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    const savingState = Object.assign({}, state);
    savingState.isMouseDown = false;
    savingState.isSendingColorData = false;
    ipcRenderer.send('save-state', JSON.stringify(savingState));
  });

  document.getElementById('loadButton').addEventListener('click', () => {
    ipcRenderer.send('open-open-dialog');
  });

  ipcRenderer.on('send-color-data-completed', () => {
    state.isSendingColorData = false;
    update();
  });

  ipcRenderer.on('load-state', (event, stateString) => {
    console.log(stateString);
    const newState = JSON.parse(stateString);
    Object.assign(state, newState);
    resize();
    update();
  });

  ipcRenderer.on('port-info-list', (event, portInfoList) => {
    const comNameList = portInfoList.map(({ comName }) => comName);
    const arduinoPortInfo = portInfoList.find(
      ({ manufacturer }) => manufacturer && /Arduino/.test(manufacturer),
    );
    const selectedOptionValue =
      comNameList.options == null
        ? arduinoPortInfo == null
          ? ''
          : arduinoPortInfo.comName
        : comNameList.options[comNameList.selectedIndex].value;

    const comNameListDom = document.getElementById('comNameList');
    comNameListDom.innerHTML = '';

    for (let i = 0; i < comNameList.length; i += 1) {
      const comName = comNameList[i];
      const optionDom = document.createElement('option');
      optionDom.value = comName;
      optionDom.textContent = comName;
      comNameListDom.appendChild(optionDom);
      if (comName === selectedOptionValue) {
        comNameListDom.selectedIndex = i;
      }
    }
  });

  state.rowNumber =
    8 * parseInt(document.getElementById('rowNumberInput').value);
  state.columnNumber =
    8 * parseInt(document.getElementById('columnNumberInput').value);
  resize();
  update();

  ipcRenderer.send('load-port-info-list');
}
