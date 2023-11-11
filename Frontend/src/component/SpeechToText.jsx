
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";


const SpeechToText = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    console.log(transcript)

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

                </div>
            </div>
        </div>
    );
};

export default SpeechToText;

