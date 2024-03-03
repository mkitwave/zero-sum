"use client";

import Link from "next/link";
import { TOPICS } from "../constants";
import { useState } from "react";
import { Question } from "../types";

type Props = {
  params: { topicId: string };
};

const TopicDetail = ({ params: { topicId } }: Props) => {
  const [alreadyShowedQuestionIds, setAlreadyShowedQuestionIds] = useState<
    Array<number>
  >([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const currentTopic = TOPICS.find(({ id }) => id === Number(topicId));

  if (!currentTopic) return <></>;

  const allQuestionAlreadShowed =
    alreadyShowedQuestionIds.length === currentTopic.questions.length;

  const showNewQuestion = () => {
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

    if (!showCard) {
      setShowCard(true);
    }
  };

  return (
    <main>
      {currentQuestion ? (
        <div>{currentQuestion.content}</div>
      ) : (
        <p>{currentTopic.name} 주제로 질문을 생성할게요.</p>
      )}
      {!allQuestionAlreadShowed && (
        <button type="button" onClick={showNewQuestion}>
          생성하기
        </button>
      )}
      <Link href="/qonnect/topic">다른 주제로 생성하기</Link>
    </main>
  );
};

export default TopicDetail;
