import { useForm } from "react-hook-form";
import { FiCheck, FiEdit2, FiX } from "react-icons/fi";
import { MAX_LINE_LENGTH, MIN_LINE_LENGTH } from "../constants";
import { useState } from "react";

type Props = {
  defaultLineLength: { rowLength: number; columnLength: number };
  resetDisabled: boolean;
  handleClickReset: () => void;
  handleChangeLineLength: (data: {
    rowLength: number;
    columnLength: number;
  }) => void;
};

export const Setting = ({
  defaultLineLength,
  resetDisabled,
  handleClickReset,
  handleChangeLineLength,
}: Props) => {
  const defaultValues = {
    rowLength: defaultLineLength.rowLength.toString(),
    columnLength: defaultLineLength.columnLength.toString(),
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<{
    rowLength: string;
    columnLength: string;
  }>({
    defaultValues,
  });

  const inputOptions = {
    min: MIN_LINE_LENGTH,
    max: MAX_LINE_LENGTH,
  };

  return (
    <section className="flex h-20 shrink-0 items-center">
      <div className="text-2xl flex items-center gap-x-1">
        <input
          type="number"
          className="w-8 focus:outline-none text-2xl"
          {...register("rowLength", inputOptions)}
        />
        ×
        <input
          type="number"
          className="w-8 focus:outline-none text-2xl"
          {...register("columnLength", inputOptions)}
        />
        {isEditing ? (
          <>
            <button
              type="reset"
              onClick={() => {
                reset(defaultValues);
                setIsEditing(false);
              }}
            >
              <FiX />
            </button>
            <button
              type="submit"
              onClick={handleSubmit(({ rowLength, columnLength }) =>
                handleChangeLineLength({
                  rowLength: Number(rowLength),
                  columnLength: Number(columnLength),
                }),
              )}
            >
              <FiCheck />
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            <FiEdit2 />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleClickReset}
        disabled={resetDisabled}
        className="disabled:opacity-30 border border-red-500 text-red-500 px-3 py-1.5 mr-3"
      >
        Clear
      </button>
    </section>
  );
};
