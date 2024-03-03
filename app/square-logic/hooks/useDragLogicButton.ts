import { useEffect, useState } from "react";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
  rowLength: number;
  onDragEnd: (draggedItemIndexes: Array<{ x: number; y: number }>) => void;
};

export const useDragLogicButton = ({
  containerRef,
  rowLength,
  onDragEnd,
}: Props) => {
  const itemRects = containerRef.current
    ? Array.from(containerRef.current.querySelectorAll("button")).map((item) =>
        item.getBoundingClientRect(),
      )
    : undefined;

  const [draggedItemIndexes, setDraggedItemIndexes] = useState<
    Array<{ x: number; y: number }>
  >([]);

  const [dragArea, setDragArea] = useState<{
    start: { x: number; y: number } | undefined;
    end: { x: number; y: number } | undefined;
    current: { x: number; y: number } | undefined;
  }>({ start: undefined, current: undefined, end: undefined });

  const dragEvents = {
    onMouseUp: (event: MouseEvent) => {
      setDragArea((prev) => ({
        ...prev,
        end: { x: event.clientX, y: event.clientY },
      }));
    },
    onMouseOver: (event: MouseEvent) => {
      setDragArea((prev) =>
        prev.start
          ? {
              ...prev,
              current: { x: event.clientX, y: event.clientY },
            }
          : prev,
      );
    },
    onMouseDown: (event: MouseEvent) => {
      setDragArea((prev) => ({
        ...prev,
        start: { x: event.clientX, y: event.clientY },
      }));
    },
  };

  useEffect(() => {
    containerRef.current?.addEventListener("mouseup", dragEvents.onMouseUp);
    containerRef.current?.addEventListener("mouseover", dragEvents.onMouseOver);
    containerRef.current?.addEventListener("mousedown", dragEvents.onMouseDown);

    return () => {
      containerRef.current?.removeEventListener(
        "mouseup",
        dragEvents.onMouseUp,
      );
      containerRef.current?.removeEventListener(
        "mouseover",
        dragEvents.onMouseOver,
      );
      containerRef.current?.removeEventListener(
        "mousedown",
        dragEvents.onMouseDown,
      );
    };
  }, []);

  useEffect(() => {
    if (!dragArea.start || !dragArea.current || !itemRects) return;

    const { start, current } = dragArea;

    let tempDraggedItemIndexes: Array<{ x: number; y: number }> = [];
    itemRects.forEach((itemRect, index) => {
      const {
        x: itemX,
        y: itemY,
        width: itemWidth,
        height: itemHeight,
      } = itemRect;

      const isIntersect =
        itemX + itemWidth > start.x &&
        itemX < current.x &&
        itemY + itemHeight > start.y &&
        itemY < current.y;

      if (isIntersect) {
        const x = Math.floor(index / rowLength);
        const y = index % rowLength;

        tempDraggedItemIndexes.push({ x, y });
      }
    });

    setDraggedItemIndexes(tempDraggedItemIndexes);
  }, [dragArea.start, dragArea.current, rowLength]);

  useEffect(() => {
    if (!dragArea.end) return;

    onDragEnd(draggedItemIndexes);

    setDraggedItemIndexes([]);

    setDragArea({
      start: undefined,
      current: undefined,
      end: undefined,
    });
  }, [dragArea.end, draggedItemIndexes]);

  return { draggedItemIndexes };
};
