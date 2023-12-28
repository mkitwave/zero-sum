import { useEffect, useRef, useState } from "react";
import { compactItemsToNumbers, flipRowColumn } from "../utils";
import { LogicButton } from "./LogicButton";
import { useDragLogicButton } from "../hooks/useDragLogicButton";

type Props = {
  items: Array<Array<boolean>>;
  selectItem: ({
    x,
    y,
    value,
  }: {
    x: number;
    y: number;
    value?: boolean;
  }) => void;
};

export const Editor = ({ items, selectItem }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rowCompactedNumbers: Array<Array<number>> =
    compactItemsToNumbers(items);

  const columnCompactedNumbers: Array<Array<number>> = compactItemsToNumbers(
    flipRowColumn(items),
  );

  const { draggedItemIndexes } = useDragLogicButton({
    containerRef,
    rowLength: items[0].length,
    onDragEnd: (draggedItemIndexes) => {
      draggedItemIndexes.forEach(({ x, y }) => {
        selectItem({ x, y, value: true });
      });
    },
  });

  return (
    <div className="p-[8rem] w-full flex justify-center">
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
          <div
            ref={containerRef}
            className="w-full grid grid-flow-row border-2 border-black"
          >
            {items.map((column, x) => (
              <div
                key={x}
                className="grid grid-flow-col border-b border-gray-300 last:border-none"
              >
                {column.map((selected, y) => (
                  <LogicButton
                    key={y}
                    onClick={() => selectItem({ x, y })}
                    dragged={draggedItemIndexes.some(
                      (draggedItem) =>
                        draggedItem.x === x && draggedItem.y === y,
                    )}
                    selected={selected}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
