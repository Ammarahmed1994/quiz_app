import { Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  categoriesState,
  difficultyState,
  usernameState,
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
  const [nameOfUser, setNameOfUser] = useState<string>("");
  const [, setCategories] = useRecoilState(categoriesState);
  const [, setUsername] = useRecoilState(usernameState);
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
        setCategories(response?.data.trivia_categories.slice(0, 5));
      })
      .catch((err) => {
        console.log(err);
      });

    setUsername(nameOfUser);
    setDifficulty(selectedDifficulty);

    setTimeout(() => {
      setRedirect(true);
    }, 1000);
  };

  const handleUsernameChange = (event: any) => {
    setNameOfUser(event.target.value);
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
          <div className="font-semibold text-md text-center">
            Choose your difficulty level, add your Name
            <br />
            and let the game begin
          </div>
          <div className="flex flex-row justify-center">
            {levels?.map((level: any) => (
              <div className="" key={level.id}>
                <button
                  className={`${
                    selectedDifficulty === level?.name
                      ? "p-2 m-2 rounded bg-gray-500 shadow-2xl text-white w-20"
                      : " p-2 m-2 rounded bg-gray-200 w-20"
                  }`}
                  value={level?.name}
                  onClick={() => handleChooseDifficulty(`${level?.name}`)}
                >
                  {level?.name}
                </button>
              </div>
            ))}
          </div>

          <input
            className="flex items-center h-12 px-4 w-full  mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            name="username"
            placeholder="Enter your Name"
            onChange={handleUsernameChange}
            required
          />

          <button
            className=" text-white py-2 text-md w-1/3 rounded-3xl mt-2 mx-auto px-4"
            style={{
              backgroundColor: "#DF8A40",
            }}
            type="submit"
          >
            Play
          </button>
        </form>
      </div>
      {redirect && <Redirect to="/categories" />}
    </>
  );
};

export default StartPage;
