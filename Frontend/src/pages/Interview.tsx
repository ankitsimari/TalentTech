import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../component/Home";
import axios from "axios";
import {
  addInteractionFailure,
  addInteractionRequest,
  addInteractionSuccess,
} from "../redux/interview/action";

const Interview = () => {
  
    const [answer, setAnswer] = useState("");
  
    const { initialPrompt, conversation } = useSelector(
    (store: Store) => store.interviewReducer
  );

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(addInteractionRequest());

      axios
        .post("http://localhost:7700/openai/start-interview", initialPrompt)
        .then((res) => {
            console.log(res.data);
          dispatch(addInteractionSuccess(res.data));
        })
        .catch((err) => {
          dispatch(addInteractionFailure());
        });
    }, []);

  const handleAnswer = (e:any) => {
    setAnswer(e.target.value);
  }

  const handleSubmitAnswer = () => {
    const answerInterraction = {
        role: "user",
        content: answer
    }

    console.log(answerInterraction);
    
    dispatch(addInteractionRequest());
    dispatch(addInteractionSuccess(answerInterraction));
    dispatch(addInteractionRequest());
    axios.post("http://localhost:7700/openai/next-answer", {answer})
    .then((res) => {
        console.log(res.data);
        dispatch(addInteractionSuccess(res.data))
    })
    .catch((err) => {
        dispatch(addInteractionFailure());
    })

    setAnswer("");
  }
  
  return (
    <div>
        <div style={{ height:"60vh", overflowY:"scroll", msOverflowStyle:"none"}}>
            {conversation.length > 0 &&
                conversation.map((ele, index) => {
                return (
                    <div
                    key={index}
                    style={{
                        border: "1px solid grey",
                        borderRadius: "0.5rem",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        padding: "1rem",
                        marginTop: "1rem",
                    }}
                    >
                    <h3 className="text-green-600">{ele.role}</h3>
                    <h4 className="text-gray-700">{ele.content}</h4>
                    </div>
                );
                })}
        </div>

      <div className="mt-10">
        <textarea
          id="message"
          value={answer}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          onChange={handleAnswer}
        ></textarea>

        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
          onClick={handleSubmitAnswer}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default Interview;
