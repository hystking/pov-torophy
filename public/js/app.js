!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.range=function(e){for(var t=[],n=0;n<e;n+=1)t.push(n);return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DomLogger=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(0);t.DomLogger=function(){function e(t){var n=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dom=t,this.dom.classList.add("logger"),this.domLines=(0,r.range)(o).map(function(){var e=window.document.createElement("div");return e.className="logger__line",n.dom.appendChild(e),e}),this.buffer=(0,r.range)(o).map(function(){return""}),this.bufferIndex=0,this.lineCount=o,this.lastTime=0}return o(e,[{key:"clear",value:function(){for(var e=0;e<this.lineCount;e+=1)this.buffer[e]="";this.bufferIndex=0}},{key:"log",value:function(e){this.buffer[this.bufferIndex]=e,this.bufferIndex=(this.bufferIndex+1)%this.lineCount,this.update()}},{key:"update",value:function(){for(var e=0;e<this.lineCount;e+=1)this.domLines[e].textContent=this.buffer[(e+this.bufferIndex)%this.lineCount]}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.encodeColorDataToSend=function(e){var t=e.length,n=t<=0?0:e[0].length,o=new Uint8Array(6+t*n);o[0]=192,o[1]=255,o[2]=238,o[3]=17,o[4]=t,o[5]=n;for(var r=0;r<t;r+=1)for(var u=0;u<n;u+=1){var i=e[r][u],a=6+(r*n+u),d=i.red>127?4:0,l=i.green>127?2:0,s=i.blue>127?1:0;o[a]=d|l|s}return o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.Color=function(){function e(t,n,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.set(t,n,o)}return o(e,[{key:"setFromHexColorString",value:function(e){var t=parseInt(e.substr(1,2),16),n=parseInt(e.substr(3,2),16),o=parseInt(e.substr(5,2),16);this.set(t,n,o)}},{key:"set",value:function(e,t,n){this.red=e,this.green=t,this.blue=n}},{key:"toCSSString",value:function(){return"rgb("+this.red+", "+this.green+", "+this.blue+")"}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.index=function(){var e={columnNumber:0,rowNumber:0,colorData:[],isMouseDown:!1,isSendingColorData:!1,isPortOpened:!1};function t(){for(var t=[],n=0;n<e.rowNumber;n+=1){for(var r=[],u=0;u<e.columnNumber;u+=1)r.push(new o.Color(0,0,0));t.push(r)}for(var i=0;i<e.rowNumber;i+=1){var a=e.colorData[i],d=t[i];if(null!=a)for(var l=0;l<e.columnNumber;l+=1){var s=a[l],c=d[l];null!=s&&c.set(s.red,s.green,s.blue)}}e.colorData=t}function n(){var e=document.createElement("div");return e.classList.add("cells__row"),e}function a(t,n,o){var r=document.createElement("div");return r.classList.add("cells__cell"),r.style.backgroundColor=o.toCSSString(),r.addEventListener("mousedown",function(){l(t,n)}),r.addEventListener("mousemove",function(){e.isMouseDown&&l(t,n)}),r}function d(){var t=document.getElementById("cells");t.innerHTML="";for(var o=0;o<e.colorData.length;o+=1){for(var r=e.colorData[o],u=n(),i=0;i<r.length;i+=1){var d=a(o,i,r[i]);u.appendChild(d)}t.appendChild(u)}e.isSendingColorData?(document.getElementById("sendButton").textContent="送信中…",document.getElementById("sendButton").setAttribute("disabled","1")):e.isPortOpened?(document.getElementById("sendButton").textContent="送信",document.getElementById("sendButton").removeAttribute("disabled")):(document.getElementById("sendButton").textContent="送信",document.getElementById("sendButton").setAttribute("disabled","1")),document.getElementById("columnNumberInput").value=Math.floor(e.columnNumber/8),document.getElementById("rowNumberInput").value=Math.floor(e.rowNumber/8),e.isPortOpened?(document.getElementById("comNameList").setAttribute("disabled","1"),document.getElementById("baudRate").setAttribute("disabled","1"),document.getElementById("openPortButton").setAttribute("disabled","1")):(document.getElementById("comNameList").removeAttribute("disabled"),document.getElementById("baudRate").removeAttribute("disabled"),document.getElementById("openPortButton").removeAttribute("disabled"))}function l(t,n){var o=document.getElementById("colorPickerInput").value;e.colorData[t][n].setFromHexColorString(o),d()}document.getElementById("columnNumberInput").addEventListener("change",function(){e.columnNumber=8*parseInt(document.getElementById("columnNumberInput").value),t(),d()}),document.getElementById("rowNumberInput").addEventListener("change",function(){e.rowNumber=8*parseInt(document.getElementById("rowNumberInput").value),t(),d()}),window.addEventListener("mousedown",function(){e.isMouseDown=!0}),window.addEventListener("mouseup",function(){e.isMouseDown=!1}),document.getElementById("openPortButton").addEventListener("click",function(){if(!e.isPortOpened){var t=document.getElementById("comNameList"),n=null==t.options?"":t.options[t.selectedIndex].value,o=parseInt(document.getElementById("baudRate").value);i.send("open-port",n,o)}}),document.getElementById("sendButton").addEventListener("click",function(){if(e.isPortOpened&&!e.isSendingColorData){var t=(0,r.encodeColorDataToSend)(e.colorData),n=parseInt(document.getElementById("maxBufferSize").value),o=parseInt(document.getElementById("sendingInterval").value);i.send("send-color-data",t,n,o),e.isSendingColorData=!0,d()}}),document.getElementById("saveButton").addEventListener("click",function(){var t=Object.assign({},e);t.isMouseDown=!1,t.isSendingColorData=!1,t.isPortOpened=!1,i.send("save-state",JSON.stringify(t))}),document.getElementById("loadButton").addEventListener("click",function(){i.send("open-open-dialog")}),i.on("send-color-data-completed",function(){e.isSendingColorData=!1,d()}),i.on("port-opened",function(){e.isPortOpened=!0,d()}),i.on("load-state",function(n,o){var r=JSON.parse(o);Object.assign(e,r),t(),d()}),i.on("port-info-list",function(e,t){var n=t.map(function(e){var t=e.comName;return t}),o=t.find(function(e){var t=e.manufacturer;return t&&/Arduino/.test(t)}),r=null==n.options?null==o?"":o.comName:n.options[n.selectedIndex].value,u=document.getElementById("comNameList");u.innerHTML="";for(var i=0;i<n.length;i+=1){var a=n[i],d=document.createElement("option");d.value=a,d.textContent=a,u.appendChild(d),a===r&&(u.selectedIndex=i)}}),i.on("log",function(e,t){s.log(t)});var s=new u.DomLogger(document.getElementById("logger"),8);e.rowNumber=8*parseInt(document.getElementById("rowNumberInput").value),e.columnNumber=8*parseInt(document.getElementById("columnNumberInput").value),t(),d(),i.send("load-port-info-list")};var o=n(3),r=n(2),u=n(1),i=window.require("electron").ipcRenderer},function(e,t,n){"use strict";var o=n(4);!function(e){switch(e){case"/":case"/index.html":default:(0,o.index)()}}(window.location.pathname)},function(e,t,n){e.exports=n(5)}]);