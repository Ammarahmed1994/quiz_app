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
  ];
  return (
    <>
      {questions.length !== 0
        ? questions.map((question) => (
            <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              {question.type === "radio" ? (
                <>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {question?.question}
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
                  {question.incorrect_answers.map((answer: string) => (
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
        : ``}
    </>
  );
};

export default Questions;
