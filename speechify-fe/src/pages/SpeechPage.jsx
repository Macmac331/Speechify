import React, { useState, useEffect } from "react";
import ImpromptuData from '../data/ImpromptuTopics.json'
import InterviewQuestions from '../data/InterviewQuestions.json'
import SpeechRecognition from "../components/SpeechRecognition";
import {useNavigate} from 'react-router-dom'
import TranscriptionService from "../service/TranscriptionService";
import { setCategory } from "../session/UserSession";
const SpeechPage = () => {
    const category = String(sessionStorage.getItem('category'))
    const [randomQuestion, setRandomQuestion] = useState('')
    const [questions, setQuestions] = useState([])
    const [transcript, setTranscript] = useState('');
    const navigate = useNavigate()
    const [showGenerateButton, setShowGenerateButton] = useState(false);
    const token = String(localStorage.getItem('token'));
    const [questionCat, setQuestionCat] = useState([]);
    const [allQuestions, setAllQuestions] = useState({})
    const [usedCat, setUsedCat] = useState('');
    const [alertUser, setAlertUser] = useState(false);

    useEffect(() => {
        setTranscript('');
        const fetchData = async () => {
            try {
                let data = [];
                switch (category) {
                    case "Interview":
                        data = InterviewQuestions
                        break;
                    case "Impromptu":
                        data = ImpromptuData
                        break;
                    case 'Prepared-speech':
                        setRandomQuestion('');
                        setUsedCat('');
                        return;
                    default:
                        throw new Error('Invalid category');
                }

                const questionCat = Object.keys(data);
                const questionAll = Object.values(data)
                const randomCatIndex = Math.floor(Math.random() * questionCat.length);
                const randomCat = questionCat[randomCatIndex]
                const questionsInCategory = data[randomCat];
                const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
                setAllQuestions(questionAll)
                setQuestions(questionsInCategory);
                setQuestionCat(questionCat)
                setRandomQuestion(randomQuestion)
                setAllQuestions(data)
                setUsedCat(randomCat)
            } catch (error) {
                console.log(error);
            }
        };
        if (category) {
            fetchData();
        }
    }, [category]);

    const handleNextClick = () => {
        const randomCatIndex = Math.floor(Math.random()  * questionCat.length);
        const randomCat = questionCat[randomCatIndex];
        const questionsInCategory = allQuestions[randomCat];
        const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];
        setRandomQuestion(randomQuestion)
        setUsedCat(randomCat)
    };
    const handleGenerateClick = () => {
        if(transcript === ""){
            setAlertUser(true)
            console.log("error");
        }else{
            TranscriptionService.SendTranscribedText(transcript, usedCat, token);
            navigate(`/speech/category/${category}/result`); 
        }
    };
    const clearAlert = () => {
        setAlertUser(false);
    };
    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setTranscript(value);
    };
    return (
        <div className="h-[88vh] w-screen flex item-center">

            <div className="flex flex-col w-full justify-center">
                <div className="flex flex-col items-center justify-center lg:mb-2">
                    <h1 className="mb-2 md:mb-2 text-3xl font-Poppins font-bold">
                        {category}
                    </h1>

                    {alertUser &&(
                        <p className="p-4 bg-red-100 font-Poppins text-md rounded-md mt-5 mb-2">No Transcript found</p>
                    )}
                    <div className={`text-center w-[80vw] md:w-[40vw] p-4 rounded-md ${category !=='Prepared-speech' ? 'bg-blue-400' :''}`}>
                        <h1 className=" font-Poppins text-2xl">{randomQuestion}</h1>
                    </div>
                    <p onClick={handleNextClick} className={`mt-2 font-Poppins text-xl underline cursor-pointer`}>{category !== 'Prepared-speech' ? 'Next' : ''}</p>
                </div>
                <SpeechRecognition 
                    setTranscript={setTranscript} 
                    showGenerateButton={showGenerateButton} 
                    setShowGenerateButton={setShowGenerateButton} 
                    onClick={handleGenerateClick} 
                    clearAlert={clearAlert}
                    onTextareaChange={handleTextareaChange}/>
            </div>
        </div>
    );
};

export default SpeechPage;
