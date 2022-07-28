/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "../../recoilResources/User.Atoms";
import Categories from "../Categories";

const StartPage = (): JSX.Element => {
  const [difficulty, setDifficulty] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .get(`https://opentdb.com/api_token.php?command=request`)
      .then((response: any) => {
        localStorage.setItem("token", response?.token);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://opentdb.com/api_category.php`)
      .then((response: any) => {
        setCategories(response?.data.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("username", username);
    setRedirect(true);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  console.log(`data1`, categories);
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 text-gray-700 -mt-40">
        <h1 className="sm:text-3xl text-3xl font-extrabold title-font mb-4 text-gray-900">
          Add your name and choose difficulty
        </h1>
        <form
          className="flex flex-col bg-white rounded shadow-lg p-12 "
          action=""
          onSubmit={handleSubmit}
        >
          <label className="font-semibold text-xs">What is your name?</label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-gray-50 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            name="username"
            onChange={handleUsernameChange}
            required
          />

          <div className="text-center mt-2">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              type="submit"
            >
              Choose Category
            </button>
          </div>
        </form>
      </div>
      {redirect && <Redirect to="/categories" />}
    </>
  );
};

export default StartPage;
