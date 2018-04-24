/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Color.js":
/*!*************************!*\
  !*** ./src/js/Color.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Color = exports.Color = function () {\n  function Color(red, green, blue) {\n    _classCallCheck(this, Color);\n\n    this.set(red, green, blue);\n  }\n\n  _createClass(Color, [{\n    key: \"setFromHexColorString\",\n    value: function setFromHexColorString(hexColorString) {\n      var red = parseInt(hexColorString.substr(1, 2), 16);\n      var green = parseInt(hexColorString.substr(3, 2), 16);\n      var blue = parseInt(hexColorString.substr(5, 2), 16);\n      this.set(red, green, blue);\n    }\n  }, {\n    key: \"set\",\n    value: function set(red, green, blue) {\n      this.red = red;\n      this.green = green;\n      this.blue = blue;\n    }\n  }, {\n    key: \"toCSSString\",\n    value: function toCSSString() {\n      return \"rgb(\" + this.red + \", \" + this.green + \", \" + this.blue + \")\";\n    }\n  }]);\n\n  return Color;\n}();\n\n//# sourceURL=webpack:///./src/js/Color.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _index = __webpack_require__(/*! ./index */ \"./src/js/index.js\");\n\nfunction routes(path) {\n  switch (path) {\n    case '/':\n    case '/index.html':\n    default:\n      return (0, _index.index)();\n  }\n}\n\nroutes(window.location.pathname);\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.index = index;\n\nvar _Color = __webpack_require__(/*! ./Color */ \"./src/js/Color.js\");\n\nvar _window$require = window.require('electron'),\n    ipcRenderer = _window$require.ipcRenderer;\n\nfunction index() {\n  var state = {\n    rowNumber: 0,\n    columnNumber: 0,\n    colorData: [],\n    isMouseDown: false,\n    isSendingColor: false\n  };\n\n  function resize() {\n    // create new one\n    var newColorData = [];\n    for (var columnIndex = 0; columnIndex < state.columnNumber; columnIndex += 1) {\n      var row = [];\n      for (var rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {\n        row.push(new _Color.Color(0, 0, 0));\n      }\n      newColorData.push(row);\n    }\n\n    // copy old color data to new one\n\n    for (var _columnIndex = 0; _columnIndex < state.columnNumber; _columnIndex += 1) {\n      var prevRow = state.colorData[_columnIndex];\n      var newRow = newColorData[_columnIndex];\n      if (prevRow == null) {\n        continue;\n      }\n      for (var _rowIndex = 0; _rowIndex < state.rowNumber; _rowIndex += 1) {\n        var prevColor = prevRow[_rowIndex];\n        var newColor = newRow[_rowIndex];\n        if (prevColor == null) {\n          continue;\n        }\n        newColor.set(prevColor.red, prevColor.green, prevColor.blue);\n      }\n    }\n\n    state.colorData = newColorData;\n  }\n\n  function createCellsRowDom() {\n    var dom = document.createElement('div');\n    dom.classList.add('cells__row');\n    return dom;\n  }\n\n  function createCellsCellDom(columnIndex, rowIndex, color) {\n    var dom = document.createElement('div');\n    dom.classList.add('cells__cell');\n    dom.style.backgroundColor = color.toCSSString();\n    dom.addEventListener('mousedown', function () {\n      fillColorWithCurrentColor(columnIndex, rowIndex);\n    });\n    dom.addEventListener('mousemove', function () {\n      if (state.isMouseDown) {\n        fillColorWithCurrentColor(columnIndex, rowIndex);\n      }\n    });\n    return dom;\n  }\n\n  function update() {\n    var cellsDom = document.getElementById('cells');\n    cellsDom.innerHTML = '';\n\n    for (var columnIndex = 0; columnIndex < state.colorData.length; columnIndex += 1) {\n      var row = state.colorData[columnIndex];\n      var cellsRowDom = createCellsRowDom();\n      for (var rowIndex = 0; rowIndex < row.length; rowIndex += 1) {\n        var cellsCellDom = createCellsCellDom(columnIndex, rowIndex, row[rowIndex]);\n        cellsRowDom.appendChild(cellsCellDom);\n      }\n      cellsDom.appendChild(cellsRowDom);\n    }\n\n    if (state.isSendingColor) {\n      document.getElementById('sendButton').textContent = '送信中…';\n    } else {\n      document.getElementById('sendButton').textContent = '送信';\n    }\n\n    document.getElementById('rowNumberInput').value = Math.floor(state.rowNumber / 8);\n    document.getElementById('columnNumberInput').value = Math.floor(state.columnNumber / 8);\n  }\n\n  function fillColorWithCurrentColor(columnIndex, rowIndex) {\n    var hexColorString = document.getElementById('colorPickerInput').value;\n    state.colorData[columnIndex][rowIndex].setFromHexColorString(hexColorString);\n    update();\n  }\n\n  function encodeColorDataToSend(colorData) {\n    // 4バイト:　ヘッダ 0xC0, 0xFF, 0xEE, 0x11\n    // 1バイト:　列数\n    // 1バイト:　行数\n    // 3バイト * （列数 * 行数）:　RGBのデータを並べたもの\n    var columnNumber = colorData.length;\n    var rowNumber = columnNumber <= 0 ? 0 : colorData[0].length;\n\n    var dataSize = 4 + 2 + columnNumber * rowNumber * 3;\n    var data = new Uint8Array(dataSize);\n\n    data[0] = 0xc0;\n    data[1] = 0xff;\n    data[2] = 0xee;\n    data[3] = 0x11;\n    data[4 + 0] = columnNumber;\n    data[4 + 1] = rowNumber;\n\n    for (var columnIndex = 0; columnIndex < columnNumber; columnIndex += 1) {\n      for (var rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {\n        var color = colorData[columnIndex][rowIndex];\n        var _index = 4 + 2 + (columnIndex * rowNumber + rowIndex) * 3;\n        data[_index] = color.red;\n        data[_index + 1] = color.green;\n        data[_index + 2] = color.blue;\n      }\n    }\n\n    return data;\n  }\n\n  document.getElementById('rowNumberInput').addEventListener('change', function () {\n    state.rowNumber = 8 * parseInt(document.getElementById('rowNumberInput').value);\n    resize();\n    update();\n  });\n\n  document.getElementById('columnNumberInput').addEventListener('change', function () {\n    state.columnNumber = 8 * parseInt(document.getElementById('columnNumberInput').value);\n    resize();\n    update();\n  });\n\n  window.addEventListener('mousedown', function () {\n    state.isMouseDown = true;\n  });\n\n  window.addEventListener('mouseup', function () {\n    state.isMouseDown = false;\n  });\n\n  document.getElementById('sendButton').addEventListener('click', function () {\n    if (state.isSendingColor) {\n      return;\n    }\n    var data = encodeColorDataToSend(state.colorData);\n    console.log(data);\n    ipcRenderer.send('send-color-data', data);\n    state.isSendingColor = true;\n    update();\n  });\n\n  document.getElementById('saveButton').addEventListener('click', function () {\n    ipcRenderer.send('save-state', JSON.stringify(state));\n  });\n\n  document.getElementById('loadButton').addEventListener('click', function () {\n    ipcRenderer.send('open-open-dialog');\n  });\n\n  ipcRenderer.on('send-color-data-completed', function () {\n    state.isSendingColor = false;\n    update();\n  });\n\n  ipcRenderer.on('load-state', function (event, stateString) {\n    console.log(stateString);\n    var newState = JSON.parse(stateString);\n    Object.assign(state, newState);\n    resize();\n    update();\n  });\n\n  state.columnNumber = 8 * parseInt(document.getElementById('columnNumberInput').value);\n  state.rowNumber = 8 * parseInt(document.getElementById('rowNumberInput').value);\n  resize();\n  update();\n}\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/nakayama-yuhei/Works/cl-torophy/src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

/******/ });