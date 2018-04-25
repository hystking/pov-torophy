import { range } from './range';

export class DomLogger {
  constructor(dom, lineCount = 20) {
    this.dom = dom;
    this.dom.classList.add('logger');
    this.domLines = range(lineCount).map(() => {
      const line = window.document.createElement('div');
      line.className = 'logger__line';
      this.dom.appendChild(line);
      return line;
    });
    this.buffer = range(lineCount).map(() => '');
    this.bufferIndex = 0;
    this.lineCount = lineCount;
    this.lastTime = 0;
  }

  clear() {
    for (let i = 0; i < this.lineCount; i += 1) {
      this.buffer[i] = '';
    }
    this.bufferIndex = 0;
  }

  log(text) {
    this.buffer[this.bufferIndex] = text;
    this.bufferIndex = (this.bufferIndex + 1) % this.lineCount;
    this.update();
  }

  update() {
    for (let i = 0; i < this.lineCount; i += 1) {
      this.domLines[i].textContent = this.buffer[
        (i + this.bufferIndex) % this.lineCount
      ];
    }
  }
}
