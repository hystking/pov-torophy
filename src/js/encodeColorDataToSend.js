export function encodeColorDataToSend(colorData) {
  // 4バイト:　ヘッダ 0xC0, 0xFF, 0xEE, 0x11
  // 1バイト:　行数
  // 1バイト:　列数
  // 3バイト * （列数 * 行数）:　RGBのデータを並べたもの
  const rowNumber = colorData.length;
  const columnNumber = rowNumber <= 0 ? 0 : colorData[0].length;

  const dataSize = 4 + 2 + rowNumber * columnNumber * 3;
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
      const index = 4 + 2 + (rowIndex * columnNumber + columnIndex) * 3;
      data[index] = color.red;
      data[index + 1] = color.green;
      data[index + 2] = color.blue;
    }
  }

  return data;
}
