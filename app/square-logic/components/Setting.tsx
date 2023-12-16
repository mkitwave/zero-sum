import { useForm } from "react-hook-form";
import { MAX_LINE_LENGTH, MIN_LINE_LENGTH } from "../constants";

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
  const { register, handleSubmit } = useForm<{
    rowLength: string;
    columnLength: string;
  }>({
    defaultValues: {
      rowLength: defaultLineLength.rowLength.toString(),
      columnLength: defaultLineLength.columnLength.toString(),
    },
  });

  const inputOptions = {
    min: MIN_LINE_LENGTH,
    max: MAX_LINE_LENGTH,
  };

  return (
    <section>
      <button
        type="button"
        onClick={handleClickReset}
        disabled={resetDisabled}
        className="disabled:opacity-30"
      >
        Reset
      </button>
      <div>
        <label>
          Row:
          <input
            type="number"
            {...register("rowLength", inputOptions)}
            className="w-20 h-5 border border-black"
          />
        </label>
        <label>
          Column:
          <input
            type="number"
            {...register("columnLength", inputOptions)}
            className="w-20 h-5 border border-black"
          />
        </label>
        <button
          type="submit"
          onClick={handleSubmit(({ rowLength, columnLength }) =>
            handleChangeLineLength({
              rowLength: Number(rowLength),
              columnLength: Number(columnLength),
            }),
          )}
        >
          Save
        </button>
      </div>
    </section>
  );
};
