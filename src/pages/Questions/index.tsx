/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import UserInfo from "src/common/UserInfo";
import {
  difficultyState,
  questionsState,
  ScoreState,
} from "../../recoilResources/User.Atoms";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface QuestionObject {
  category: string;
  type: any;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: any;
}

const Questions = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);

  const [questions]: any = useRecoilState(questionsState);
  const [difficulty]: any = useRecoilState(difficultyState);

  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);

  const [, setScore] = useRecoilState(ScoreState);

  const minutesCondition =
    difficulty === "easy"
      ? 0
      : difficulty === "medium"
      ? 0
      : difficulty === "hard"
      ? 1
      : 0;

  const secondsCondition =
    difficulty === "easy"
      ? 30
      : difficulty === "medium"
      ? 59
      : difficulty === "hard"
      ? 30
      : 0;

  const initialMinute: any = minutesCondition;
  const initialSeconds: any = secondsCondition;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval: any = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          const findCorrectAnswerFromQuestion = questions[step].answers.find(
            (a: any) => a.isCorrect === true
          );

          const correctAnswerId = findCorrectAnswerFromQuestion.id;
          if (selectedAnswer === correctAnswerId) {
            setScore((current) => current + 1);
          } else {
            setScore((current) => current);
          }
          setStep(step + 1);
          setMinutes(minutesCondition);
          setSeconds(secondsCondition);
          setSelectedAnswer(0);
          clearInterval(myInterval);
          return;
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  const handleNextButton = (question: any) => {
    const findCorrectAnswerFromQuestion = question.answers.find(
      (a: any) => a.isCorrect === true
    );

    const correctAnswerId = findCorrectAnswerFromQuestion.id;
    if (selectedAnswer === correctAnswerId) {
      setScore((current) => current + 1);
    } else {
      setScore((current) => current);
    }
    setStep(step + 1);
    setMinutes(minutesCondition);
    setSeconds(secondsCondition);
    setSelectedAnswer(0);
  };

  const handleSkipButton = () => {
    setScore((current) => current);

    setStep(step + 1);
    setMinutes(minutesCondition);
    setSeconds(secondsCondition);
    setSelectedAnswer(0);
  };

  const handleSelectedAnswer = (id: number) => {
    setSelectedAnswer(id);
  };

  return (
    <>
      <UserInfo />
      <div>
        {(minutes === 0 && seconds === 0) ||
        step + 1 > questions?.length ? null : (
          <h1 className=" bg-gray-300 rounded-xl w-1/4 mx-auto mt-10 text-center">
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        )}
      </div>

      {questions.length !== 0 && !(step + 1 > questions?.length) ? (
        <div className="container fluid mt-3 block p-6 w-full md:w-1/2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <>
            <h5 className="mb-2 text-sm font-bold text-center text-black bg-gray-200 w-1/4 p-2 rounded">
              Question {step + 1}
            </h5>
            <h5 className="mb-2 text-2xl text-center font-normal tracking-tight text-gray-900 dark:text-white">
              {questions[step]?.question}
            </h5>
            <div className="flex flex-wrap justify-center">
              {questions[step]?.answers.map((answer: any) => (
                <button
                  className={`${
                    selectedAnswer === answer?.id
                      ? "py-2 px-4 m-2 rounded bg-gray-500 text-white shadow-2xl"
                      : "py-2 px-4 m-2 rounded bg-gray-200"
                  }`}
                  key={answer?.id}
                  value={answer?.id}
                  onClick={() => handleSelectedAnswer(answer?.id)}
                >
                  {answer?.name}
                </button>
              ))}
            </div>
          </>
        </div>
      ) : (
        ``
      )}

      {step + 1 > questions?.length ? (
        ``
      ) : (
        <div className="w-3/4 lg:w-1/4 flex justify-center mx-auto gap-4">
          <button
            className="text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4 bg-black text-white"
            onClick={() => handleSkipButton()}
          >
            Skip
          </button>

          <button
            className=" text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4"
            style={{
              backgroundColor: "#DF8A40",
            }}
            onClick={() => handleNextButton(questions[step])}
          >
            Next
          </button>
        </div>
      )}

      {/* {questions.length !== 0
        ? questions
            .slice(step, step + 1)
            .map((question: any, index: number = step) => (
              <div
                className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={index}
              >
                {console.log(`sssss`, step)}
                {question.type === "radio" ? (
                  <>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {questions[index]?.question}
                    </h5>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="true"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        True
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked
                        id="default-radio-2"
                        type="radio"
                        value="false"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        False
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {question?.question}
                    </h5>
                    {question?.incorrect_answers.map((answer: string) => (
                      <>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {answer}
                        </label>
                      </>
                    ))}
                  </>
                )}
              </div>
            ))
        : ``} */}
    </>
  );
};

export default Questions;
