"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const range = (length: number) => {
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

const flipRowColumn = (array: Array<Array<any>>) =>
  range(array[0].length).map((_, x) =>
    range(array.length)
      .map((_, y) => array[y][x])
      .flat(),
  );

const compactItemsToNumbers = (array: Array<Array<boolean>>) =>
  array
    .map((line) => line.map(covertBooleanToNumber))
    .map(compactNumbers)
    .map((numbers) => (numbers.length > 0 ? numbers : [0]));

const MIN_LINE_LENGTH = 2;
const MAX_LINE_LENGTH = 20;

const SquareLogic = () => {
  const [rowLength, setRowLength] = useState<number>(19);
  const [columnLength, setColumnLength] = useState<number>(20);
  const [items, setItems] = useState<Array<Array<boolean>>>([]);

  const initialized = useRef<boolean>(false);

  const { register, handleSubmit } = useForm<{
    rowLength: string;
    columnLength: string;
  }>({
    defaultValues: {
      rowLength: rowLength.toString(),
      columnLength: columnLength.toString(),
    },
  });

  const selected = items.flat().filter((item) => item).length;

  useEffect(() => {
    initialize({ rowLength, columnLength });
    initialized.current = true;
  }, [rowLength, columnLength]);

  const initialize = ({
    rowLength,
    columnLength,
  }: {
    rowLength: number;
    columnLength: number;
  }) => {
    setItems(range(rowLength).map(() => range(columnLength).map(() => false)));
  };

  const selectItem = ({ x, y }: { x: number; y: number }) => {
    setItems((prev) =>
      prev.map((column, i) => {
        if (i === x) {
          return column.map((selected, j) => {
            if (j === y) {
              return !selected;
            }
            return selected;
          });
        }
        return column;
      }),
    );
  };

  const reset = () => {
    confirm("Are you sure to reset?") &&
      initialize({ rowLength, columnLength });
  };

  const changeLineLength = ({
    rowLength,
    columnLength,
  }: {
    rowLength: string;
    columnLength: string;
  }) => {
    if (!selected || confirm("Are you sure to save? Your canvas will reset.")) {
      setRowLength(Number(rowLength));
      setColumnLength(Number(columnLength));
    }
  };

  const rowCompactedNumbers: Array<Array<number>> = initialized.current
    ? compactItemsToNumbers(items)
    : [];

  const columnCompactedNumbers: Array<Array<number>> = initialized.current
    ? compactItemsToNumbers(flipRowColumn(items))
    : [];

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[90%] max-w-[40rem] relative">
        <div className="grid grid-flow-row absolute h-full -left-4 -translate-x-[100%]">
          {rowCompactedNumbers.map((numbers, index) => (
            <div key={index} className="flex h-full text-right">
              {numbers.map((value, index) => (
                <span key={index} className="w-full">
                  {value}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full grid grid-flow-row">
          <div className="grid grid-flow-col w-full absolute -translate-y-[100%] -top-2">
            {columnCompactedNumbers.map((numbers, index) => (
              <div key={index} className="flex flex-col w-full justify-end">
                {numbers.map((value, index) => (
                  <span key={index}>{value}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="w-full grid grid-flow-row border-2 border-black">
            {items.map((column, x) => (
              <div
                key={x}
                className="grid grid-flow-col border-b border-gray-300 last:border-none"
              >
                {column.map((selected, y) => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => selectItem({ x, y })}
                    className={`w-full aspect-square border-r border-gray-300 last:border-none ${
                      selected ? "bg-black" : ""
                    } `}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        disabled={!selected}
        className="disabled:opacity-30"
      >
        Reset
      </button>
      <div>
        <label>
          Row:
          <input
            type="number"
            {...register("rowLength", {
              min: MIN_LINE_LENGTH,
              max: MAX_LINE_LENGTH,
            })}
            className="w-20 h-5 border border-black"
          />
        </label>
        <label>
          Column:
          <input
            type="number"
            {...register("columnLength", {
              min: MIN_LINE_LENGTH,
              max: MAX_LINE_LENGTH,
            })}
            className="w-20 h-5 border border-black"
          />
        </label>
        <button type="submit" onClick={handleSubmit(changeLineLength)}>
          Save
        </button>
      </div>
    </main>
  );
};

export default SquareLogic;
