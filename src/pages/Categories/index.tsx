/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "../../recoilResources/User.Atoms";

const Categories = (): JSX.Element => {
  const [categories]: any = useRecoilState(categoriesState);
  const [selectedCategory, setSelectedCategory]: any = useState<string>("");

  console.log(`helll catttttt`, categories);

  const handleChooseCategory = (name: any) => {
    setSelectedCategory(name);
  };
  console.log(`dfsd`, selectedCategory);
  return (
    <>
      <div className="container fluid mt-10 block p-6 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          Select the Quiz category
        </h5>
        <div className="flex flex-wrap">
          {categories?.slice(0, 3).map((category: any) => (
            // <button className=" p-2 m-2 border-2 border-gray-200 bg-gray-300">
            //   {category.name}
            // </button>
            <button
              // className=" p-2 m-2 border-2 border-gray-200 bg-gray-300"
              className={`${
                selectedCategory === category?.name
                  ? "p-2 m-2 border-2 border-gray-200 bg-gray-600 text-white"
                  : " p-2 m-2 border-2 border-gray-200 bg-gray-300"
              }`}
              value={category?.id}
              onClick={() => handleChooseCategory(`${category?.id}`)}
            >
              {category?.name}
            </button>
          ))}
        </div>
        <Link to="/questions">
          <button>go to questions</button>
        </Link>
      </div>
    </>
  );
};

export default Categories;
