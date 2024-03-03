import Link from "next/link";
import { TOPICS } from "./constants";
import { titleFont } from "../font";
import { FaAngleRight } from "react-icons/fa";

const Topic = () => {
  return (
    <main className="bg-black h-full w-full p-8 flex flex-col gap-y-8">
      <h2
        className={`${titleFont.className} text-6xl text-center tracking-tighter`}
      >
        <span className="text-fuchsia-400">T</span>
        <span className="text-white">opics</span>
      </h2>
      <div className="h-0 grow w-full flex flex-col gap-y-2 overflow-y-auto">
        {TOPICS.map(({ id, name }) => (
          <Link
            key={id}
            href={`/qonnect/topic/${id}`}
            className="w-full h-16 border border-gray-400 rounded-full items-center flex px-6 justify-between"
          >
            <span className="text-white">{name}</span>
            <FaAngleRight className="w-5 h-5 text-fuchsia-400" />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Topic;
