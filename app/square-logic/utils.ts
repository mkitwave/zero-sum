export const range = (length: number) => {
  return [...Array(length).keys()];
};

const covertBooleanToNumber = (value: boolean) => (value ? 1 : 0);

const compactNumbers = (array: Array<number>) => {
  const compactedNumbers: Array<number> = [];
  let currentNumber = 0;
  array.forEach((value) => {
    if (value === 1) {
      currentNumber += 1;
    } else {
      if (currentNumber !== 0) {
        compactedNumbers.push(currentNumber);
      }
      currentNumber = 0;
    }
  });
  if (currentNumber !== 0) {
    compactedNumbers.push(currentNumber);
  }
  return compactedNumbers;
};

export const flipRowColumn = (array: Array<Array<any>>) =>
  range(array[0].length).map((_, x) =>
    range(array.length)
      .map((_, y) => array[y][x])
      .flat(),
  );

export const compactItemsToNumbers = (array: Array<Array<boolean>>) =>
  array
    .map((line) => line.map(covertBooleanToNumber))
    .map(compactNumbers)
    .map((numbers) => (numbers.length > 0 ? numbers : [0]));

export const createTwoDimensionalArray = ({
  rowLength,
  columnLength,
}: {
  rowLength: number;
  columnLength: number;
}) => range(rowLength).map(() => range(columnLength).map(() => false));
