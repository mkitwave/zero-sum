"use client";

import { useEffect, useRef, useState } from "react";
import { Setting } from "./components/Setting";
import { createTwoDimensionalArray } from "./utils";
import { Editor } from "./components/Editor";

const SquareLogic = () => {
  const [rowLength, setRowLength] = useState<number>(19);
  const [columnLength, setColumnLength] = useState<number>(20);
  const [items, setItems] = useState<Array<Array<boolean>>>([]);

  const initialized = useRef<boolean>(false);

  const selected = items.flat().filter((item) => item).length;

  const initialize = ({
    rowLength,
    columnLength,
  }: {
    rowLength: number;
    columnLength: number;
  }) => {
    setItems(createTwoDimensionalArray({ rowLength, columnLength }));
  };

  const selectItem = ({
    x,
    y,
    value,
  }: {
    x: number;
    y: number;
    value?: boolean;
  }) => {
    setItems((prev) =>
      prev.map((column, i) => {
        if (i === x) {
          return column.map((selected, j) => {
            if (j === y) {
              return value === undefined ? !selected : value;
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
    rowLength: number;
    columnLength: number;
  }) => {
    if (!selected || confirm("Are you sure to save? Your canvas will reset.")) {
      setRowLength(rowLength);
      setColumnLength(columnLength);
    }
  };

  useEffect(() => {
    initialize({ rowLength, columnLength });
    initialized.current = true;
  }, [rowLength, columnLength]);

  return (
    <main className="flex flex-col w-full h-full p-10">
      <div className="flex gap-x-3 items-end">
        <h1 className="text-6xl font-semibold pb-1.5">
          Logic<span className="text-red-500">.</span>
        </h1>
        <input
          type="text"
          placeholder="Square"
          className="focus:outline-none w-[20rem] text-6xl font-semibold placeholder:text-gray-400 caret-red-500"
        />
      </div>
      <Setting
        defaultLineLength={{
          rowLength,
          columnLength,
        }}
        resetDisabled={!selected}
        handleClickReset={reset}
        handleChangeLineLength={changeLineLength}
      />
      {initialized.current && <Editor items={items} selectItem={selectItem} />}
    </main>
  );
};

export default SquareLogic;
