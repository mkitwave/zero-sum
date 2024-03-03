import Link from "next/link";
import { titleFont } from "./font";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qonnect",
  description: "개발자 모임을 위한 아이스브레이킹 질문들",
};

const Qonnect = () => {
  return (
    <main className="bg-black h-full p-8 flex flex-col justify-between">
      <div className="h-0 grow w-full items-center justify-center flex flex-col gap-y-5">
        <h1
          className={`${titleFont.className} text-6xl text-center tracking-tighter`}
        >
          <span className="text-fuchsia-400">Q</span>
          <span className="text-white">onnect</span>
        </h1>
        <p className="text-white text-center text-sm">
          개발자 모임을 위한 아이스브레이킹 질문들
        </p>
      </div>
      <Link
        href="/qonnect/topic"
        className="w-full bg-fuchsia-400 rounded-full h-14 flex items-center justify-center text-black font-semibold"
      >
        시작하기
      </Link>
    </main>
  );
};

export default Qonnect;
