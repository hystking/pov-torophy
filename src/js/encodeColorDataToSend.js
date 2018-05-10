export function encodeColorDataToSend(colorData) {
  // 形式はREADME参照のこと

  const rowNumber = colorData.length;
  const columnNumber = rowNumber <= 0 ? 0 : colorData[0].length;

  const dataSize = 4 + 2 + rowNumber * columnNumber;
  const data = new Uint8Array(dataSize);

  data[0] = 0xc0;
  data[1] = 0xff;
  data[2] = 0xee;
  data[3] = 0x11;
  data[4 + 0] = rowNumber;
  data[4 + 1] = columnNumber;

  for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < columnNumber; columnIndex += 1) {
      const color = colorData[rowIndex][columnIndex];
      const index = 4 + 2 + (rowIndex * columnNumber + columnIndex);
      const flagR = color.red > 127 ? 0b100 : 0;
      const flagG = color.green > 127 ? 0b010 : 0;
      const flagB = color.blue > 127 ? 0b001 : 0;
      data[index] = flagR | flagG | flagB;
    }
  }

  return data;
}
