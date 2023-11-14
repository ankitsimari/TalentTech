import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../pages/Home";
import axios from "axios";
import {
  addInteractionFailure,
  addInteractionRequest,
  addInteractionSuccess,
} from "../../redux/interview/action";
import { baseURL } from "../../redux/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import Cookies from "js-cookie";

const Chat = () => {
  const [answer, setAnswer] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const token = Cookies.get("token");

  const { initialPrompt, conversation, isLoading } = useSelector(
    (store: Store) => store.interviewReducer
  );

  /**
   const { initialPrompt, conversation, isLoading } = useSelector(
    (store: Store) => store.interviewReducer
  );
   */

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    
    if(conversation.length == 0) {
      
      handleSkeleton();
      dispatch(addInteractionRequest());
      axios
        .post(`${baseURL}/openai/start-interview`, initialPrompt,  {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(addInteractionSuccess(res.data));
          handleSkeleton();
        })
        .catch((err) => {
          dispatch(addInteractionFailure());
        });
    }
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // You can use 'auto' or 'smooth' for smooth scrolling
    });
  }, [conversation]);

  const handleAnswer = (e: any) => {
    setAnswer(e.target.value);
  };

  const handleSkeleton = () => {
    setShowSkeleton((prev) => !prev);
  }

  const handleSubmitAnswer = () => {
    handleSkeleton();

    const answerInterraction = {
      role: "user",
      content: answer,
    };

    // console.log(answerInterraction);

    dispatch(addInteractionRequest());
    dispatch(addInteractionSuccess(answerInterraction));
    handleSkeleton();
    dispatch(addInteractionRequest());
    handleSkeleton();
    
    axios
      .post(`${baseURL}/openai/next-answer`, { answer },  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addInteractionSuccess(res.data));
        handleSkeleton();
      })
      .catch((err) => {
        dispatch(addInteractionFailure());
      });

    setAnswer("");
  };

  const handleEndInterview = () => {
    handleSkeleton();
    const endInterviewMessage = {
      role: "user",
      content: "I would like to end the interview.",
    };

    dispatch(addInteractionRequest());
    dispatch(addInteractionSuccess(endInterviewMessage));
    handleSkeleton();
    dispatch(addInteractionRequest());
    handleSkeleton();

    console.log("token", token);

    axios
      .post(`${baseURL}/openai/end-interview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addInteractionSuccess(res.data));
        handleSkeleton();
      })
      .catch((err) => {
        console.log(err);
        dispatch(addInteractionFailure());
      });
  };

  return (
    <div>
      <DIV
        style={{ height: "58vh", overflowY: "scroll" }}
        ref={chatContainerRef}
        id="style-2"
        className="scrollbar"
      >
        {conversation.length > 0 &&
          conversation.map((ele, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid grey",
                  borderRadius: "0.5rem",
                  boxShadow: "hsla(0, 0%, 0%, 0.24) 0px 3px 8px",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <h3 className={ele.role == "assistant"? "text-red-700" : "text-green-700 "}>{ele.role}</h3>
                <h4 className="text-black ">{ele.content}</h4>
              </div>
            );
          })}
        {showSkeleton && <Skeleton count={2} className="mt-5" />}
      </DIV>

      <div className="mt-10">
        <textarea
          id="message"
          value={answer}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          onChange={handleAnswer}
        ></textarea>

        <div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
            onClick={handleSubmitAnswer}
          >
            Submit Answer
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleEndInterview}
          >
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const DIV = styled.div`
  .scrollbar {
    margin-left: 30px;
    float: left;
    height: 300px;
    width: 65px;
    background: #f5f5f5;
    overflow-y: scroll;
    margin-bottom: 25px;
  }

  #style-2::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  #style-2::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  #style-2::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d62929;
  }
`;
