"use client";

import Link from "next/link";
import { TOPICS } from "../constants";
import { useEffect, useState } from "react";
import { Question } from "../types";
import { titleFont } from "../../font";
import { FaRandom } from "react-icons/fa";

type Props = {
  params: { topicId: string };
};

const TopicDetail = ({ params: { topicId } }: Props) => {
  const [alreadyShowedQuestionIds, setAlreadyShowedQuestionIds] = useState<
    Array<number>
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const currentTopic = TOPICS.find(({ id }) => id === Number(topicId));

  const allQuestionAlreadShowed =
    alreadyShowedQuestionIds.length === currentTopic?.questions.length;

  const showNewQuestion = () => {
    if (!currentTopic) return;

    const newQuestions = currentTopic.questions.filter(
      ({ id }) => !alreadyShowedQuestionIds.includes(id),
    );
    const randomQuestion =
      newQuestions[Math.floor(Math.random() * newQuestions.length)];

    setCurrentQuestion(randomQuestion);
    setAlreadyShowedQuestionIds((prevState) => [
      ...prevState,
      randomQuestion.id,
    ]);
  };

  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      showNewQuestion();
    }
  }, []);

  return (
    <main className="bg-black h-full w-full p-8 flex flex-col gap-y-8 items-center">
      <h2
        className={`${titleFont.className} text-6xl text-center tracking-tighter`}
      >
        <span className="text-fuchsia-400">Q</span>
        <span className="text-white">uestion</span>
      </h2>
      {currentQuestion && (
        <>
          <section className="w-full bg-white h-0 grow rounded-full flex flex-col items-center justify-between py-10 px-5">
            <p className="h-0 grow flex items-center font-semibold text-lg">
              {currentQuestion.content}?
            </p>
            <button
              type="button"
              onClick={showNewQuestion}
              disabled={allQuestionAlreadShowed}
              className="bg-fuchsia-400 w-16 h-16 rounded-full flex items-center justify-center flex-col disabled:bg-gray-300 disabled:text-gray-400"
            >
              <FaRandom className="w-6 h-6" />
            </button>
          </section>
          <Link
            href="/qonnect/topic"
            className="text-fuchsia-400 underline text-sm"
          >
            다른 주제로 생성하기
          </Link>
        </>
      )}
    </main>
  );
};

export default TopicDetail;
