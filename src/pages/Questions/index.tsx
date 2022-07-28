/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import UserInfo from "src/common/UserInfo";
import {
  categoriesState,
  difficultyState,
  questionsState,
  ScoreState,
} from "../../recoilResources/User.Atoms";

const Questions = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [categories]: any = useRecoilState(categoriesState);
  const [questions, setQuestions]: any = useRecoilState(questionsState);
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
    const newQuestionsArray = questions.map((question: any) => {
      const newAnswers = handleShuffleAnswers(question.answers);
      const questionNewObject = {
        question: question.question,
        category: question.category,
        difficulty: question.difficulty,
        type: question.type,
        answers: newAnswers,
      };
      return questionNewObject;
    });
    setQuestions(newQuestionsArray);
  }, [step]);

  const handleNextButton = (question: any) => {
    const findCorrectAnswerFromQuestion = question?.answers.find(
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

  const handleShuffleAnswers = (answers: any) => {
    const newAnswers = [...answers];
    let currentIndex = newAnswers.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newAnswers[currentIndex], newAnswers[randomIndex]] = [
        newAnswers[randomIndex],
        newAnswers[currentIndex],
      ];
    }

    return newAnswers;
  };

  useEffect(() => {
    let myInterval: any = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          handleNextButton(questions[step]);
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

      {categories.length === 0 && step + 1 > questions?.length ? (
        <div className="mt-5 text-center">
          <h5>Awesome, Wanna start over with new questions?</h5>
          <Link to="/">
            <button className="bg-blue-400 text-white w-1/4 px-4 py-2">
              Start A new Game
            </button>
          </Link>
        </div>
      ) : step + 1 > questions?.length ? (
        <div className="mt-5  text-center">
          <h5>Ready for another round? </h5>
          <Link to="/categories">
            <button className="bg-blue-400 text-white w-1/4 px-4 py-2">
              Let's go
            </button>
          </Link>
        </div>
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
    </>
  );
};

export default Questions;
