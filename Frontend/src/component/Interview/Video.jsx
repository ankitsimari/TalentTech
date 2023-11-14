
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useSpeechSynthesis } from 'react-speech-kit';

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addInteractionFailure,
  addInteractionRequest,
  addInteractionSuccess,
} from "../../redux/interview/action";
import { baseURL, store } from "../../redux/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import Cookies from "js-cookie";

const Video = () => {
    const [textToCopy, setTextToCopy] = useState();
    const {speak} = useSpeechSynthesis();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });


    const [answer, setAnswer] = useState("");
    const [showSkeleton, setShowSkeleton] = useState(false);
    const token = Cookies.get("token");
  
    const { initialPrompt, conversation, isLoading } = useSelector(
      (store) => store.interviewReducer
    );
    const { user } = useSelector((store) => store.authReducer)
  
    /**
     const { initialPrompt, conversation, isLoading } = useSelector(
      (store: Store) => store.interviewReducer
    );
     */


    // const data = useSelector((store) => store.interviewReducer.conversation);
    // useEffect(() => {
    //     const a = data.map((e) => e.role);
    //     let content = data.map((e) => e.content);
    //     setRoles(a[content.length - 1]);
    //     setsound(content[content.length - 1]);
    //   }, [data]);
    //   useEffect(() => {
    //     if (roles == "assistant" && sound) {
    //       speak({ text: sound });
    //       console.log("spoked");
    //       setsound("");
    //     }
    //   }, [sound, roles]);
  
    const chatContainerRef = useRef(null);
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
  
    const handleAnswer = (e) => {
      setAnswer(e.target.value);
    };
  
    const handleSkeleton = () => {
      setShowSkeleton((prev) => !prev);
    }
  
    const handleSubmitAnswer = () => {
        setAnswer(transcript)
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
        .post(`${baseURL}/openai/end-interview`, {email: user.email}, {
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
  




//    use transcript to get audio to String
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    console.log(transcript)

    // here we can put whatever we want as audio in place of the transcript
    const handleOnClick = () => {
        speak({text:transcript})
      }


    return (
        <div>
            <div className="p-7">
                <h2 className='text-3xl text-center mb-3'>kuch v bol likh dega</h2>

              {/* from "transcript we can get audio-text" */}
                <div className="main-content tracking-wide text-lg w-full min-h-full h-auto px-8 py-8 bg-slate-200 rounded-md shadow leading-relaxed" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="mt-4">
{/* 
                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button> */}
                    <button className= 'text-customColor mr-4 rounded-md border border-solid py-4 px-6 cursor-pointer border-customColor focus:bg-customColor focus:text-white hover:bg-customColor font-bold hover:text-white hover:shadow-md' onClick={startListening}>Start Listening</button>
                    <button  className= 'text-customColor border border-solid border-customColor rounded-md py-4 px-6 focus:bg-customColor focus:text-white hover:bg-customColor font-bold cursor-pointer hover:text-white hover:shadow-md' onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button  className= 'text-customColor border border-solid border-customColor rounded-md py-4 px-6 focus:bg-customColor focus:text-white hover:bg-customColor font-bold cursor-pointer hover:text-white hover:shadow-md' onClick={()=>{handleOnClick()}}>Listen</button>

                </div>
            </div>

            <div>
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
                className="flex align-middle"
                style={{
                  border: "1px solid grey",
                  borderRadius: "0.5rem",
                  boxShadow: "hsla(0, 0%, 0%, 0.24) 0px 3px 8px",
                  padding: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div className = {ele.role == "assistant"? "bg-stone-900 rounded-md py-1 px-2 text-white mr-2 h-max w-20" : "bg-violet-800 rounded-md py-1 px-6 text-white mr-2 h-max"} >
                  <h3 >{ele.role}</h3>
                </div>
                <h4 className="text-black">{ele.content}</h4>
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
            </div>
        </div>
    );
};

export default Video;



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