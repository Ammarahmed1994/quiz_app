/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  categoriesState,
  difficultyState,
  questionsState,
} from "../../recoilResources/User.Atoms";

interface CategoryObject {
  id: number;
  name: string;
}

const Categories = (): JSX.Element => {
  const [categories]: any = useRecoilState(categoriesState);
  const [difficulty]: any = useRecoilState(difficultyState);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [, setQuestions] = useRecoilState(questionsState);
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleChooseCategory = (id: number) => {
    setSelectedCategory(id);
  };

  const handleQuestionNavigation = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=3&category=${selectedCategory}&difficulty=${difficulty}`
      )
      .then((response: any) => {
        const questionResult = response?.data.results;

        const newQuestions = questionResult?.map((question: any) => {
          let questionAnswers: any = [];

          if (question.type === "multiple") {
            questionAnswers = question.incorrect_answers.map(
              (q: any, index: number) => ({
                answer: q,
                id: index + 1,
                isCorrect: false,
              })
            );
            let correctAnswerObject = {
              answer: question.correct_answer,
              id: 4,
              isCorrect: true,
            };
            questionAnswers.push(correctAnswerObject);
          }

          console.log(`questionAnswers`, questionAnswers);
          const questionnewObject = {
            question: question.question,
            category: question.category,
            difficulty: question.difficulty,
            type: question.type,
            answers: questionAnswers,
          };
          return questionnewObject;
        });
        setQuestions(newQuestions);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          Select the Quiz category
        </h5>
        <div className="flex flex-wrap justify-center">
          {categories?.map((category: CategoryObject) => (
            <button
              className={`${
                selectedCategory === category?.id
                  ? "p-2 m-2 rounded bg-gray-600 text-white"
                  : " p-2 m-2  rounded  bg-gray-300"
              }`}
              key={category?.id}
              value={category?.id}
              onClick={() => handleChooseCategory(category?.id)}
            >
              {category?.name}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleQuestionNavigation}
          >
            Start Quiz
          </button>
        </div>
      </div>
      {redirect && <Redirect to="/questions" />}
    </>
  );
};

export default Categories;
