import Link from "next/link";
import { TOPICS } from "./constants";

const Topic = () => {
  return (
    <main className="">
      <h2>주제를 선택하세요.</h2>
      <ul>
        {TOPICS.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/qonnect/topic/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Topic;
