export class Color {
  constructor(red, green, blue) {
    this.set(red, green, blue);
  }

  setFromHexColorString(hexColorString) {
    const red = parseInt(hexColorString.substr(1, 2), 16);
    const green = parseInt(hexColorString.substr(3, 2), 16);
    const blue = parseInt(hexColorString.substr(5, 2), 16);
    this.set(red, green, blue);
  }

  set(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toCSSString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}
