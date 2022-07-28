/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "../../recoilResources/User.Atoms";

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

  const questions: QuestionObject[] = [
    {
      category: "Category 1",
      type: "radio",
      difficulty: "medium",
      question: "Is your name Ammar",
      correct_answer: "true",
      incorrect_answers: "false",
    },
    {
      category: "Category 2",
      type: "checkbox",
      difficulty: "medium",
      question: "Is your name Ahmed",
      correct_answer: "four",
      incorrect_answers: ["one", "two", "three"],
    },
    {
      category: "Category 2",
      type: "checkbox",
      difficulty: "medium",
      question: "Is your name mohsen",
      correct_answer: "four",
      incorrect_answers: ["one", "two", "three"],
    },
  ];

  const handleNextButton = () => {
    setStep(step + 1);
    setSeconds(3);
    setMinutes(0);
  };

  const initialMinute = 0;
  const initialSeconds = 3;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval: any = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setStep(step + 1);
          setMinutes(0);
          setSeconds(3);
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

  return (
    <>
      <div>
        {(minutes === 0 && seconds === 0) ||
        step + 1 > questions?.length ? null : (
          <h1>
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        )}
      </div>

      {questions.length !== 0 && !(step + 1 > questions?.length) ? (
        <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {questions[step].type === "radio" ? (
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {questions[step]?.question}
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
                {questions[step]?.question}
              </h5>
              {questions[step]?.incorrect_answers.map((answer: string) => (
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
      ) : (
        ``
      )}

      {step + 1 > questions?.length ? (
        <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            All Done
          </h5>
        </div>
      ) : (
        <button
          className=" text-white py-2 text-md w-1/4 rounded-3xl mt-2 mx-auto px-4 float-right"
          style={{
            backgroundColor: "#DF8A40",
          }}
          onClick={handleNextButton}
        >
          Next
        </button>
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
