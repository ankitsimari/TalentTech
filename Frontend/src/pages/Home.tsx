import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitState as authInitState } from "../redux/auth/reducer";
import { InitState as interviewInitState } from "../redux/interview/reducer";
import Loader from "../component/Loader";
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
} from "../redux/auth/action";
import axios from "axios";
import Navbar from "../component/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import Topics from "../component/Topics";
import { setInitialPromptSuccess } from "../redux/interview/action";
import Cookies from "js-cookie";
import { baseURL } from "../redux/store";

export type Store = {
  authReducer: authInitState;
  interviewReducer: interviewInitState;
};

const Home = () => {
  const [techStack, setTechStack] = useState("");
  const [loadingInterviewState, setLoadingInterviewState] = useState(false);
  const [topics, setTopics] = useState([]);

  const token = Cookies.get("token");
  const { isLoading, isError, user } = useSelector((store: Store) => {
    return store.authReducer;
  });

  /**
   const { isLoading, isError, user } = useSelector((store: Store) => {
    return store.authReducer;
  });
   */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Function to change tech stack
  const handleTechStack = (e: any) => {
    setTechStack(e.target.value);
  };

  //function to start interview
  const handleStart = async () => {
    const interviewScript = {
      techStack: techStack,
      options: [`Any ${techStack} topics`],
    };

    await dispatch(setInitialPromptSuccess(interviewScript));

    setLoadingInterviewState((prev) => !prev);
    setTimeout(() => {
      setLoadingInterviewState((prev) => !prev);
      navigate("/interview");
    }, 1000);
  };

  useEffect(() => {
    dispatch(getUserRequest());
    axios
      .get(`${baseURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust content type as needed
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUserFailure());
      });
  }, []);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  console.log(user);
  

  return (
    <div className="home-div">
      <Navbar />
      <h1 className="text-4xl	font-medium	">
        Welcome, <span className="text-lg	font-normal">{user.username}</span>
      </h1>

      <div
        className="mt-10"
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
      >
        <div>
          <p>Choose your Tech Stack</p>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleTechStack}
            value={techStack}
          >
            <option className="m-2" value={""}>
              Choose a Tech Stack
            </option>
            <option value="mern" className="m-2">
              MERN
            </option>
            <option value="node" className="m-2">
              Node
            </option>
            <option value="java" className="m-2">
              Java
            </option>
          </select>
        </div>

        <div>
          <Topics techStack={techStack} />

          <button
            type="button"
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 mt-5"
            onClick={handleStart}
          >
            Start Interview
            {loadingInterviewState && (
              <svg
                aria-hidden="true"
                role="status"
                className="ml-2 inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-900"
                viewBox="0 0 100 101"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
