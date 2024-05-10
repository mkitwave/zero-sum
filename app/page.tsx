"use client";

import { useEffect, useRef, useState } from "react";

import { Outfit } from "next/font/google";
import Image from "next/image";

const outfit = Outfit({ subsets: ["latin"] });

const DEFAULT_TITLE = "ZEROSUM.";

export default function RootPage() {
  const initializedRef = useRef<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    DEFAULT_TITLE.split("").forEach((char, index) => {
      setTimeout(
        () => {
          setTitle((prev) => prev + char);
        },
        100 * (index + 1),
      );
    });
  }, []);

  return (
    <div
      className={`${outfit.className} w-full h-full bg-slate-50 flex flex-col items-center justify-center`}
    >
      <h1 className="text-4xl h-20 flex items-center md:h-40 md:text-8xl font-bold">
        {title}
      </h1>
      <ul className="w-full h-0 grow p-4 flex flex-col max-w-[80rem]">
        <li className="w-full sm:w-1/2 md:w-1/3">
          <a
            href="https://thug-life-cam.vercel.app/"
            target="_blank"
            className="w-full h-[20rem] flex flex-col border border-zinc-500"
          >
            <Image
              className="w-full h-[14rem]"
              alt=""
              src="/root/thug-life-cam.png"
              width={200}
              height={100}
            />
            <div className="p-3 flex flex-col gap-y-2 h-0 grow">
              <span className="text-xl text-zinc-900">Thug life cam</span>
              <p className="text-sm text-zinc-500">
                Filtered webcam with Tensorflow.js
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
