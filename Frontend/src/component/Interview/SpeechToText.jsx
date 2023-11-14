import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useSpeechSynthesis } from "react-speech-kit";
import Chat from "./Chat";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [text, setText] = useState();
  const { speak } = useSpeechSynthesis();
  const [roles, setRoles] = useState("");
  const [sound, setsound] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const videoRef = useRef(null); // Reference to the video element

  // const data = useSelector((state=>state.interviewReducer.conversation));
  // console.log(data)

  // Chat-start

  const [answer, setAnswer] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);

  const { initialPrompt, conversation, isLoading } = useSelector(
    (store) => store.interviewReducer
  );

  /**
   const { initialPrompt, conversation, isLoading } = useSelector(
    (store: Store) => store.interviewReducer
  );
   */

  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.interviewReducer.conversation);
  
  useEffect(() => {
    if (conversation.length === 0) {
      handleSkeleton();
      dispatch(addInteractionRequest());

      // Open the camera when the page loads
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          dispatch(addInteractionFailure());
        });

      axios
        .post(`${baseURL}/openai/start-interview`, initialPrompt)
        .then((res) => {
          console.log(res.data);
          dispatch(addInteractionSuccess(res.data));
          handleSkeleton();
        })
        .catch((err) => {
          dispatch(addInteractionFailure());
        });
    }

    // Close the camera when navigating away from the component
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        videoRef.current.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // You can use 'auto' or 'smooth' for smooth scrolling
    });
  }, [conversation]);

  useEffect(() => {
    const a = data.map((e) => e.role);
    let content = data.map((e) => e.content);
    setRoles(a[content.length - 1]);
    setsound(content[content.length - 1]);
  }, [data]);
  useEffect(() => {
    if (roles == "assistant" && sound) {
      speak({ text: sound });
      console.log("spoked");
      setsound("");
    }
  }, [sound, roles]);

  const startListening = () =>
  SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
const { transcript, browserSupportsSpeechRecognition } =
  useSpeechRecognition();

if (!browserSupportsSpeechRecognition) {
  return null;
}

  const handleAnswer = () => {

    setAnswer(transcript);

  };

  const handleSkeleton = () => {
    setShowSkeleton((prev) => !prev);
  };


  const handleSubmitAnswer = () => {
    handleSkeleton();
  
    const answerInterraction = {
      role: "user",
      content: transcript, // Use transcript directly here
    };
  
    dispatch(addInteractionRequest());
    dispatch(addInteractionSuccess(answerInterraction));
    handleSkeleton();
  
    axios
      .post(`${baseURL}/openai/next-answer`, { answer: transcript })
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
    axios
      .post(`${baseURL}/openai/end-interview`)
      .then((res) => {
        console.log(res.data);
        dispatch(addInteractionSuccess(res.data));
        handleSkeleton();
      })
      .catch((err) => {
        dispatch(addInteractionFailure());
      });
  };

  // Chat-end




  //   console.log(data.map((e)=>e.role))

  //    use transcript to get audio to String


  // console.log(transcript)

  // here we can put whatever we want as audio in place of the transcript
  const handleOnClick = () => {
    if (roles == "assistant") {
      speak({ text: sound });
    }
  };

  //   if(roles=="assistant"&& sound){
  //     speak({text:sound});
  //     console.log("spoked")
  //     setsound("")
  // }
  console.log(roles, "role");
  console.log(sound, "sound");
  return (
    <div className="flex"> 
      <div className="p-7 w-2/5">
        <h2 className="text-3xl text-center mb-3">Transcript</h2>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "auto" }}
          autoPlay
        />
        {/* from "transcript we can get audio-text" */}
        {/* <div
          className="main-content h-8 tracking-wide text-lg w-full min-h-full h-auto px-8 py-8 bg-slate-200 rounded-md shadow leading-relaxed"
          onClick={() => setTextToCopy(transcript)}
        >
          {transcript}
        </div> */}

        {/* <div className="mt-4">
          <button
            className="text-customColor mr-4 rounded-md border border-solid py-4 px-6 cursor-pointer border-customColor focus:bg-customColor focus:text-white hover:bg-customColor font-bold hover:text-white hover:shadow-md"
            onClick={startListening}
          >
            Start Listening
          </button>
          <button
            className="text-customColor border border-solid border-customColor rounded-md py-4 px-6 focus:bg-customColor focus:text-white hover:bg-customColor font-bold cursor-pointer hover:text-white hover:shadow-md"
            onClick={SpeechRecognition.stopListening}
          >
            Stop Listening
          </button>
          <button
            className="text-customColor border border-solid border-customColor rounded-md py-4 px-6 focus:bg-customColor focus:text-white hover:bg-customColor font-bold cursor-pointer hover:text-white hover:shadow-md"
            onClick={() => {
              handleOnClick();
            }}
          >
            Listen
          </button>
        </div> */}
      </div>

      <div className="w-3/5">
        <DIV
          style={{ height: "60vh", overflowY: "scroll" }}
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
                  <h3
                    className={
                      ele.role == "assistant"
                        ? "text-red-700"
                        : "text-green-700 "
                    }
                  >
                    {ele.role}
                  </h3>
                  <h4 className="text-black ">{ele.content}</h4>
                </div>
              );
            })}
          {showSkeleton && <Skeleton count={2} className="mt-5" />}
        </DIV>

        <div className="mt-10">
          <textarea
            id="message"
            value={transcript}
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
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
            onClick={startListening}
          >
            Start Listening
          </button>
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-2"
            onClick={SpeechRecognition.stopListening}
          >
            Stop Listening
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
  );
};

export default SpeechToText;

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
