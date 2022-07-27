import { Link } from "react-router-dom";
const StartPage = (): JSX.Element => {
  return (
    <>
      <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Link to="/questions">
          <div className="text-center">
            <button className="bg-blue-500 text-white p-2 rounded">
              Choose Category
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default StartPage;
