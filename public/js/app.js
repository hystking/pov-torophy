!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();n.Color=function(){function e(n,t,o){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.set(n,t,o)}return o(e,[{key:"setFromHexColorString",value:function(e){var n=parseInt(e.substr(1,2),16),t=parseInt(e.substr(3,2),16),o=parseInt(e.substr(5,2),16);this.set(n,t,o)}},{key:"set",value:function(e,n,t){this.red=e,this.green=n,this.blue=t}},{key:"toCSSString",value:function(){return"rgb("+this.red+", "+this.green+", "+this.blue+")"}}]),e}()},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.index=function(){var e={colorData:[],isMouseDown:!1,isSendingColor:!1};function n(){for(var n=8*parseInt(document.getElementById("rowNumberInput").value),t=8*parseInt(document.getElementById("columnNumberInput").value),r=[],u=0;u<t;u+=1){for(var i=[],a=0;a<n;a+=1)i.push(new o.Color(0,0,0));r.push(i)}for(var c=0;c<t;c+=1){var l=e.colorData[c],s=r[c];if(null!=l)for(var d=0;d<n;d+=1){var f=l[d],v=s[d];null!=f&&v.set(f.red,f.green,f.blue)}}e.colorData=r}function t(){var e=document.createElement("div");return e.classList.add("cells__row"),e}function u(n,t,o){var r=document.createElement("div");return r.classList.add("cells__cell"),r.style.backgroundColor=o.toCSSString(),r.addEventListener("mousedown",function(){a(n,t)}),r.addEventListener("mousemove",function(){e.isMouseDown&&a(n,t)}),r}function i(){var n=document.getElementById("cells");n.innerHTML="";for(var o=0;o<e.colorData.length;o+=1){for(var r=e.colorData[o],i=t(),a=0;a<r.length;a+=1){var c=u(o,a,r[a]);i.appendChild(c)}n.appendChild(i)}e.isSendingColor?document.getElementById("sendButton").textContent="送信中…":document.getElementById("sendButton").textContent="送信"}function a(n,t){var o=document.getElementById("colorPickerInput").value;e.colorData[n][t].setFromHexColorString(o),i()}document.getElementById("rowNumberInput").addEventListener("change",function(){n(),i()}),document.getElementById("columnNumberInput").addEventListener("change",function(){n(),i()}),window.addEventListener("mousedown",function(){e.isMouseDown=!0}),window.addEventListener("mouseup",function(){e.isMouseDown=!1}),document.getElementById("sendButton").addEventListener("click",function(){if(!e.isSendingColor){var n=function(e){var n=e.length,t=n<=0?0:e[0].length,o=new Uint8Array(6+n*t*3);o[0]=192,o[1]=255,o[2]=238,o[3]=17,o[4]=n,o[5]=t;for(var r=0;r<n;r+=1)for(var u=0;u<t;u+=1){var i=e[r][u],a=6+3*(r*t+u);o[a]=i.red,o[a+1]=i.green,o[a+2]=i.blue}return o}(e.colorData);console.log(n),r.send("send-color-data",n),e.isSendingColor=!0,i()}}),r.on("send-color-data-completed",function(){e.isSendingColor=!1,i()}),n(),i()};var o=t(0),r=window.require("electron").ipcRenderer},function(e,n,t){"use strict";var o=t(1);!function(e){switch(e){case"/":case"/index.html":default:(0,o.index)()}}(window.location.pathname)},function(e,n,t){e.exports=t(2)}]);