/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  categoriesState,
  difficultyState,
} from "../../recoilResources/User.Atoms";

const levels = [
  {
    id: 1,
    name: `easy`,
  },
  {
    id: 2,
    name: `medium`,
  },
  {
    id: 3,
    name: `hard`,
  },
];

const StartPage = (): JSX.Element => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [, setCategories] = useRecoilState(categoriesState);
  const [redirect, setRedirect] = useState<boolean>(false);

  const [, setDifficulty] = useRecoilState(difficultyState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    axios
      .get(`https://opentdb.com/api_token.php?command=request`)
      .then((response: any) => {
        localStorage.setItem("token", response?.data.token);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://opentdb.com/api_category.php`)
      .then((response: any) => {
        setCategories(response?.data.trivia_categories.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("username", username);
    setDifficulty(selectedDifficulty);

    setTimeout(() => {
      setRedirect(true);
    }, 1000);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleChooseDifficulty = (name: any) => {
    setSelectedDifficulty(name);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 text-gray-700 -mt-40">
        <form
          className="flex flex-col bg-white rounded shadow-lg p-12 w-1/2"
          action=""
          onSubmit={handleSubmit}
        >
          <label className="font-semibold text-md">
            Add your name and choose difficulty <br />
            and let the game begins
          </label>
          <input
            className="flex items-center h-12 px-4 w-full bg-gray-50 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            name="username"
            onChange={handleUsernameChange}
            required
          />

          <div className="flex flex-row justify-center">
            {levels?.map((level: any) => (
              <div className="" key={level.id}>
                <button
                  className={`${
                    selectedDifficulty === level?.name
                      ? "p-2 m-2 rounded bg-gray-600 text-white w-20"
                      : " p-2 m-2 rounded bg-gray-300 w-20"
                  }`}
                  value={level?.name}
                  onClick={() => handleChooseDifficulty(`${level?.name}`)}
                >
                  {level?.name}
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
      {redirect && <Redirect to="/categories" />}
    </>
  );
};

export default StartPage;
