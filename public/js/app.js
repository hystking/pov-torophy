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

/***/ "./src/js/DomLogger.js":
/*!*****************************!*\
  !*** ./src/js/DomLogger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.DomLogger = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _range = __webpack_require__(/*! ./range */ \"./src/js/range.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar DomLogger = exports.DomLogger = function () {\n  function DomLogger(dom) {\n    var _this = this;\n\n    var lineCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;\n\n    _classCallCheck(this, DomLogger);\n\n    this.dom = dom;\n    this.dom.classList.add('logger');\n    this.domLines = (0, _range.range)(lineCount).map(function () {\n      var line = window.document.createElement('div');\n      line.className = 'logger__line';\n      _this.dom.appendChild(line);\n      return line;\n    });\n    this.buffer = (0, _range.range)(lineCount).map(function () {\n      return '';\n    });\n    this.bufferIndex = 0;\n    this.lineCount = lineCount;\n    this.lastTime = 0;\n  }\n\n  _createClass(DomLogger, [{\n    key: 'clear',\n    value: function clear() {\n      for (var i = 0; i < this.lineCount; i += 1) {\n        this.buffer[i] = '';\n      }\n      this.bufferIndex = 0;\n    }\n  }, {\n    key: 'log',\n    value: function log(text) {\n      this.buffer[this.bufferIndex] = text;\n      this.bufferIndex = (this.bufferIndex + 1) % this.lineCount;\n      this.update();\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      for (var i = 0; i < this.lineCount; i += 1) {\n        this.domLines[i].textContent = this.buffer[(i + this.bufferIndex) % this.lineCount];\n      }\n    }\n  }]);\n\n  return DomLogger;\n}();\n\n//# sourceURL=webpack:///./src/js/DomLogger.js?");

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

/***/ "./src/js/encodeColorDataToSend.js":
/*!*****************************************!*\
  !*** ./src/js/encodeColorDataToSend.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.encodeColorDataToSend = encodeColorDataToSend;\nfunction encodeColorDataToSend(colorData) {\n  // 形式はREADME参照のこと\n\n  var rowNumber = colorData.length;\n  var columnNumber = rowNumber <= 0 ? 0 : colorData[0].length;\n\n  var dataSize = 4 + 2 + rowNumber * columnNumber * 3;\n  var data = new Uint8Array(dataSize);\n\n  data[0] = 0xc0;\n  data[1] = 0xff;\n  data[2] = 0xee;\n  data[3] = 0x11;\n  data[4 + 0] = rowNumber;\n  data[4 + 1] = columnNumber;\n\n  for (var rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {\n    for (var columnIndex = 0; columnIndex < columnNumber; columnIndex += 1) {\n      var color = colorData[rowIndex][columnIndex];\n      var index = 4 + 2 + (rowIndex * columnNumber + columnIndex) * 3;\n      data[index] = color.red;\n      data[index + 1] = color.green;\n      data[index + 2] = color.blue;\n    }\n  }\n\n  return data;\n}\n\n//# sourceURL=webpack:///./src/js/encodeColorDataToSend.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.index = index;\n\nvar _Color = __webpack_require__(/*! ./Color */ \"./src/js/Color.js\");\n\nvar _encodeColorDataToSend = __webpack_require__(/*! ./encodeColorDataToSend */ \"./src/js/encodeColorDataToSend.js\");\n\nvar _DomLogger = __webpack_require__(/*! ./DomLogger */ \"./src/js/DomLogger.js\");\n\nvar _window$require = window.require('electron'),\n    ipcRenderer = _window$require.ipcRenderer;\n\nfunction index() {\n  var state = {\n    columnNumber: 0,\n    rowNumber: 0,\n    colorData: [],\n    isMouseDown: false,\n    isSendingColorData: false\n  };\n\n  function resize() {\n    // create new one\n    var newColorData = [];\n    for (var rowIndex = 0; rowIndex < state.rowNumber; rowIndex += 1) {\n      var row = [];\n      for (var columnIndex = 0; columnIndex < state.columnNumber; columnIndex += 1) {\n        row.push(new _Color.Color(0, 0, 0));\n      }\n      newColorData.push(row);\n    }\n\n    // copy old color data to new one\n\n    for (var _rowIndex = 0; _rowIndex < state.rowNumber; _rowIndex += 1) {\n      var prevRow = state.colorData[_rowIndex];\n      var newRow = newColorData[_rowIndex];\n      if (prevRow == null) {\n        continue;\n      }\n      for (var _columnIndex = 0; _columnIndex < state.columnNumber; _columnIndex += 1) {\n        var prevColor = prevRow[_columnIndex];\n        var newColor = newRow[_columnIndex];\n        if (prevColor == null) {\n          continue;\n        }\n        newColor.set(prevColor.red, prevColor.green, prevColor.blue);\n      }\n    }\n\n    state.colorData = newColorData;\n  }\n\n  function createCellsRowDom() {\n    var dom = document.createElement('div');\n    dom.classList.add('cells__row');\n    return dom;\n  }\n\n  function createCellsCellDom(rowIndex, columnIndex, color) {\n    var dom = document.createElement('div');\n    dom.classList.add('cells__cell');\n    dom.style.backgroundColor = color.toCSSString();\n    dom.addEventListener('mousedown', function () {\n      fillColorWithCurrentColor(rowIndex, columnIndex);\n    });\n    dom.addEventListener('mousemove', function () {\n      if (state.isMouseDown) {\n        fillColorWithCurrentColor(rowIndex, columnIndex);\n      }\n    });\n    return dom;\n  }\n\n  function update() {\n    var cellsDom = document.getElementById('cells');\n    cellsDom.innerHTML = '';\n\n    for (var rowIndex = 0; rowIndex < state.colorData.length; rowIndex += 1) {\n      var row = state.colorData[rowIndex];\n      var cellsRowDom = createCellsRowDom();\n      for (var columnIndex = 0; columnIndex < row.length; columnIndex += 1) {\n        var cellsCellDom = createCellsCellDom(rowIndex, columnIndex, row[columnIndex]);\n        cellsRowDom.appendChild(cellsCellDom);\n      }\n      cellsDom.appendChild(cellsRowDom);\n    }\n\n    if (state.isSendingColorData) {\n      document.getElementById('sendButton').textContent = '送信中…';\n    } else {\n      document.getElementById('sendButton').textContent = '送信';\n    }\n\n    document.getElementById('columnNumberInput').value = Math.floor(state.columnNumber / 8);\n    document.getElementById('rowNumberInput').value = Math.floor(state.rowNumber / 8);\n  }\n\n  function fillColorWithCurrentColor(rowIndex, columnIndex) {\n    var hexColorString = document.getElementById('colorPickerInput').value;\n    state.colorData[rowIndex][columnIndex].setFromHexColorString(hexColorString);\n    update();\n  }\n\n  document.getElementById('columnNumberInput').addEventListener('change', function () {\n    state.columnNumber = 8 * parseInt(document.getElementById('columnNumberInput').value);\n    resize();\n    update();\n  });\n\n  document.getElementById('rowNumberInput').addEventListener('change', function () {\n    state.rowNumber = 8 * parseInt(document.getElementById('rowNumberInput').value);\n    resize();\n    update();\n  });\n\n  window.addEventListener('mousedown', function () {\n    state.isMouseDown = true;\n  });\n\n  window.addEventListener('mouseup', function () {\n    state.isMouseDown = false;\n  });\n\n  document.getElementById('sendButton').addEventListener('click', function () {\n    if (state.isSendingColorData) {\n      return;\n    }\n    var data = (0, _encodeColorDataToSend.encodeColorDataToSend)(state.colorData);\n    var comName = comNameList.options == null ? '' : comNameList.options[comNameList.selectedIndex].value;\n    ipcRenderer.send('send-color-data', data, comName);\n    state.isSendingColorData = true;\n    update();\n  });\n\n  document.getElementById('saveButton').addEventListener('click', function () {\n    var savingState = Object.assign({}, state);\n    savingState.isMouseDown = false;\n    savingState.isSendingColorData = false;\n    ipcRenderer.send('save-state', JSON.stringify(savingState));\n  });\n\n  document.getElementById('loadButton').addEventListener('click', function () {\n    ipcRenderer.send('open-open-dialog');\n  });\n\n  ipcRenderer.on('send-color-data-completed', function () {\n    state.isSendingColorData = false;\n    update();\n  });\n\n  ipcRenderer.on('load-state', function (event, stateString) {\n    var newState = JSON.parse(stateString);\n    Object.assign(state, newState);\n    resize();\n    update();\n  });\n\n  ipcRenderer.on('port-info-list', function (event, portInfoList) {\n    var comNameList = portInfoList.map(function (_ref) {\n      var comName = _ref.comName;\n      return comName;\n    });\n    var arduinoPortInfo = portInfoList.find(function (_ref2) {\n      var manufacturer = _ref2.manufacturer;\n      return manufacturer && /Arduino/.test(manufacturer);\n    });\n    var selectedOptionValue = comNameList.options == null ? arduinoPortInfo == null ? '' : arduinoPortInfo.comName : comNameList.options[comNameList.selectedIndex].value;\n\n    var comNameListDom = document.getElementById('comNameList');\n    comNameListDom.innerHTML = '';\n\n    for (var i = 0; i < comNameList.length; i += 1) {\n      var comName = comNameList[i];\n      var optionDom = document.createElement('option');\n      optionDom.value = comName;\n      optionDom.textContent = comName;\n      comNameListDom.appendChild(optionDom);\n      if (comName === selectedOptionValue) {\n        comNameListDom.selectedIndex = i;\n      }\n    }\n  });\n\n  ipcRenderer.on('log', function (event, message) {\n    logger.log(message);\n  });\n\n  var logger = new _DomLogger.DomLogger(document.getElementById(\"logger\"), 10);\n\n  state.rowNumber = 8 * parseInt(document.getElementById('rowNumberInput').value);\n  state.columnNumber = 8 * parseInt(document.getElementById('columnNumberInput').value);\n\n  resize();\n  update();\n\n  ipcRenderer.send('load-port-info-list');\n}\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/range.js":
/*!*************************!*\
  !*** ./src/js/range.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.range = range;\nfunction range(n) {\n  var arr = [];\n  for (var i = 0; i < n; i += 1) {\n    arr.push(i);\n  }\n  return arr;\n}\n\n//# sourceURL=webpack:///./src/js/range.js?");

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