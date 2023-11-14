import { useState } from "react";
import Chat from "../component/Interview/Chat";
import { BsFillChatFill, BsCameraVideoFill } from "react-icons/bs";
import { AiTwotoneAudio } from "react-icons/ai";
import Audio from "../component/Interview/Audio";
import Video from "../component/Interview/Video";
import styled from "styled-components"
import SpeechToText from "../component/Interview/SpeechToText";

const Interview = () => {
  const [interviewState, setInterviewState] = useState("chat");

  const handleInterviewMode = (e:any) => {
    const { name } = e.target;
    // console.log(name);
    setInterviewState(name);
    
  }

  return (
    <div className="p-5" >
      <div className="flex items-center justify-center mb-2">
        <BUTTON
          type="button"
          name="chat"
          onClick={handleInterviewMode}
          className="interview-button"
        >
          <BsFillChatFill className="w-5 h-5 " />
        </BUTTON>

        <BUTTON
          type="button"
          name="video"
          onClick={handleInterviewMode}
          className="interview-button"
        >
          <BsCameraVideoFill className="w-5 h-5 " />
        </BUTTON>
      </div>

      {interviewState === "chat" && <Chat />}
      {interviewState === "video" && <SpeechToText />}

    </div>
  );
};

export default Interview;

const BUTTON = styled.button `
  background-color: #7c3aed;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;
  margin: 0 0.5rem;

  .interview-button:hover {
    background-color: #6120d1;
  }

  .interview-button:active {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`