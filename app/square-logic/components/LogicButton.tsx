type Props = {
  onClick: () => void;
  dragged: boolean;
  selected: boolean;
};

export const LogicButton = ({ onClick, dragged, selected }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full aspect-square border-r border-gray-300 last:border-none ${
        selected
          ? "bg-black"
          : `hover:bg-gray-200 ${dragged ? "bg-gray-400" : ""}`
      }`}
    />
  );
};
