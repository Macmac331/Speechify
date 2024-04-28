import { useState, useRef } from "react";
import TranscriptionService from "../service/TranscriptionService";
import ScaleLoader from 'react-spinners/ScaleLoader'
const SpeechRecognition = ({ setTranscript, setShowGenerateButton, showGenerateButton, onClick }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState('');
    const recognitionRef = useRef(null);
    const timeoutRef = useRef(null);
    const [showGenerate, setShowGenerate] = useState(false);

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxSilence = 4000;
        recognition.onstart = () => {
            setIsListening(true);
            setShowGenerate(false)
            setShowGenerateButton(false)
        };

        recognition.onresult = handleRecognitionResult;

        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            clearTimeout(timeoutRef.current);
            recognitionRef.current.onresult = null;
            setShowGenerateButton(true)
            console.log(transcription);
            setShowGenerate(true)
            setTranscript(transcription)
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const handleRecognitionResult = event => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript + '.' ;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        const trimmedFinalTranscript = finalTranscript.trim();
        if (trimmedFinalTranscript !== '') {
            setTranscription(prevTranscription => prevTranscription + ' ' + trimmedFinalTranscript);
            setTranscript(trimmedFinalTranscript);
            console.log(trimmedFinalTranscript);
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(startListening, 1000);
    };

    return (
        <div>
            <div className="flex flex-col items-center mt-16 md:mt-28 mb-">
                <button
                    className="mb-2 overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                    onClick={toggleListening}
                    >{isListening? "" : "Ready?"}
                    {isListening ? (
                        <>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                            <span className="absolute ml-4 text top-2.5 left-6 z-10">Stop</span>
                        </>
                    ) : (
                        <>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                            <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                            <span className="absolute ml-4 text group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 top-2.5 left-6 z-10">Talk!</span>
                        </>
                    )}
                </button>

                
                {isListening ? (
                    <div className="flex flex-row p-2 opacity-70">
                        <span className="font-Poppins mr-2 text-lg">Listening</span>
                        <ScaleLoader className="mb-2"
                            height = {24}
                            color="#78CEFF" />
                    </div>
                    
                ) : (
                    <span className="font-Poppins text-md">Not Listening</span>
                )}
                {showGenerate  && (
                    <div className="mt-8 flex justify-center" onClick ={onClick}>
                        <button 
                            className="bg-[#61FFB0] hover:bg-[#379C6C] hover:text-white h-12 w-40 rounded-md text font-Poppins  "
                            
                        >
                            Generate Result
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeechRecognition;
