import { useState, useEffect, useRef } from "react"
import PuffLoader from 'react-spinners/PuffLoader'
import styled, { keyframes } from 'styled-components';
import TranscriptionService from "../service/TranscriptionService";
import Chart from 'chart.js/auto'
import AnalyzerService from "../service/AnalyzerService";

import { setSummaryLocal, setScoresLocal, getCategory } from "../session/UserSession";
import { useNavigate } from "react-router-dom";
const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const BlinkingText = styled.p`
  animation: ${blinkAnimation} 3s linear infinite;
`;

const ResultPage = () => {
    const chartRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [summary, setSummary] = useState('');
    const token = String(localStorage.getItem('token'));
    const [isSuccessful, setIsSuccessful] = useState(false);
    const renderAfterCalled = useRef(false)
    const [complexity, setComplexity] = useState(0);
    const [clarity, setClarity] = useState(0);
    const [relevance, setRelevance] = useState(0);
    const [sentiment, setSentiment] = useState(0);
    const [hateSpeech, setHateSpeech] = useState([]);
    const [offensiveSpeech, setOffensiveSpeech] = useState([]);
    const [originalSent, setOriginalSent] = useState([]);
    const [correctSent, setCorrectSent] = useState([]);
    const navigate = useNavigate();
    const category = getCategory('category').toString()
    const [scores, setScores] = useState({
        language : 0,
        clarity : 0,
        complexity : 0,
        relevance : 0,
        sentiment : 0
    });
    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Get Summary 
            const summaryResponse = await TranscriptionService.GetSummary(token);
            const score = await AnalyzerService.getScores(token);
            const hateSpeechData = await TranscriptionService.GetHateSpeech(token);
            const sentences = await AnalyzerService.getWrongGrammar(token)
            if (!summaryResponse && !score) {
                console.log("Error fetching data");
                setIsLoading(false);
                setIsSuccessful(false);
                return;
            }
            setSummary(summaryResponse.summary);
            setOffensiveSpeech(hateSpeechData.offensive_language_sentences);
            setHateSpeech(hateSpeechData.hate_speech_sentences)
            setClarity(score.clarity);
            setSentiment(score.sentiment)
            setComplexity(score.complexity);
            setRelevance(score.relevance);
            setOriginalSent(sentences.sentence)
            setCorrectSent(sentences.corrected_sentence)
            console.log(score.clarity, score.relevance, score.complexity, score.language, score.sentiment);
            console.log(summaryResponse.summary);
            setSummaryLocal(summaryResponse.summary);

            setScores({
                language : score.language,
                clarity : score.clarity,
                complexity : score.complexity,
                relevance : score.relevance,
                sentiment : score.sentiment
            })
            console.log(scores)
            setScoresLocal(score)
            setIsLoading(false);
            setIsSuccessful(true);

        } catch (err) {
            console.log(err);
            setIsSuccessful(false);
        }finally {
            setIsLoading(false);
        }
    }

    const allSpeech = [...hateSpeech, ...offensiveSpeech];
    const handleBack = () => {
        navigate(`/speech/category/${category}`)
    }
    const createChart = () => {
        if (!chartRef.current) return;

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }
    
        // Create Chart
        const ctx = chartRef.current.getContext('2d');
        chartRef.current.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Attitude', 'Clear', 'Understandability', 'Importance ', 'Any'],
                datasets: [{

                    data: [sentiment, clarity, complexity, relevance, 0],
                    borderColor: 'rgb(86,190,79, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: 'white',
                        }
                    }
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        ticks: {
                            display: false,
                            color: "white",
                            beginAtZero: true
                        },
                        grid: {
                            display: true,
                        },
                    },
                },
                elements: {
                    line: {
                        backgroundColor: 'rgb(86,190,79,0.3 )',
                    },
                }
            }
        });
    }
    const highlightDifferences = (original, corrected) => {
        const capitalizedOriginal = original.charAt(0).toUpperCase() + original.slice(1);
        const capitalizedCorrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
        
        const originalWords = capitalizedOriginal.split(' ');
        const correctedWords = capitalizedCorrected.split(' ');
    
        let highlightedSentence = '';
    
        for (let i = 0; i < originalWords.length; i++) {
            if (originalWords[i] !== correctedWords[i]) {
                highlightedSentence += `<span style="color: red; font-weight: bold"><del>${originalWords[i]}</del></span> <span style="color: black; font-weight: bold"> ${correctedWords[i]}</span> `;
            } else {
                highlightedSentence += originalWords[i] + ' ';
            }
        }
    
        return highlightedSentence.trim();
    };
    
    
    
    useEffect(() => {            
        if (!renderAfterCalled.current) {
            fetchData();
        }
        renderAfterCalled.current = true;
    }, []);
    

    useEffect(()=>{
        createChart();
    },[summary]);
    
    Chart.defaults.color = '#fff';
    Chart.defaults.font.size = 12
    return(
        <>
            {isLoading? (
            <div className="h-[88vh] w-full flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <PuffLoader
                        size={120}
                        speedMultiplier={0.8}
                        color="#36d7b7"
                    />
                    <BlinkingText className="text-center mt-4 text-xl font-Poppins">Analyzing your speech</BlinkingText>
                </div>
            </div>
            ): (
                isSuccessful ? (
                <div className="flex flex-wrap h-[88vh] w-full lg:w-screen ">
                    <div className="lg:w-[50vw] w-full lg:hidden ">
                        <div className="w-full lg:w-full xl:w-full lg:h-1/2 h-auto p-4 flex items-center flex-col ">
                            <h1 className="text-black text-3xl font-bold font-Poppins">Summary</h1>
                            <p className="p-5 text-md md:text-xl font-Poppins px-2 lg:px-6 lg:pt-4 lg:mt-2 text-black tracking-normal">{summary}</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 xl:w-1/2 h-[83vh] md:h-full p-4 flex justify-center">
                        <div className="w-[90vw] lg:w-[48vw] bg-gradient-to-bl from-[#31186C] to-[#49a3a8] rounded-2xl  flex flex-col items-center h-full">
                            <h1 className="text-3xl font-Poppins text-center font-bold pt-4 pb-4 text-white tracking-wide">Speech Scores</h1>
                            <div className="h-[70vh] w-[80vw] lg:w-[48vw]">                            
                                <canvas ref={chartRef} />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[50vw] w-full">
                        <div className="hidden w-full lg:w-full xl:w-full lg:h-[35vh] h-auto p-4 lg:flex lg:items-center lg:flex-col ">
                            <h1 className="text-black text-3xl font-bold font-Poppins">Summary</h1>
                            <p className="p-5 text-md md:text-xl font-Poppins px-2 lg:px-6 lg:pt-4 lg:mt-2 text-black tracking-normal">{summary}</p>
                        </div>
                        <div className="w-full lg:w-full xl:w-full lg:h-1/2 h-auto flex items-center flex-col rounded-lg ">
                            <h1 className="text-black text-3xl font-bold font-Poppins tracking-normal pt-4">Suggestions</h1>
                            <div className="p-4 lg:p-0">
                                {(hateSpeech.length > 0 || offensiveSpeech.length > 0) && (
                                    <div className="flex flex-col items-start mt-2 pl-4 p-4 lg-p-0">
                                        <p className="text-xl font-Poppins lg:px-6 lg:pt-4 lg:mt-2 text-red-500 font-bold tracking-normal">{"Hate Speech Detected (Remove):"}</p>
                                        {allSpeech.map((speech, index) => (
                                            <p key={index} className="text-md md:text-xl font-Poppins lg:px-6 lg:pt-4 lg:mt-2 mt-2 text-black">{allSpeech.length == 1? `${speech}`: `${index + 1}. ${speech}`}</p>
                                        ))}
                                    </div>
                                )}
                                {originalSent.length > 0 &&(
                                    <div className="flex flex-col items-start pl-4 p-4 lg-p-0">
                                        <p className="text-xl font-Poppins lg:px-6 text-red-500 font-bold tracking-normal">{"Incorrect Grammar Detected:"}</p>
                                        {originalSent.map((sentence, index) => (
                                            <p key={index} className="text-md md:text-xl font-Poppins lg:px-6 lg:pt-4 lg:mt-2 mt-2 text-black">
                                            {originalSent.length == 1 ? '':  `  ${index + 1}. `}
                                                <span dangerouslySetInnerHTML={{ __html: highlightDifferences(sentence, correctSent[index]) }} />
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                ) : (
                <>
                <div className="h-[88vh] w-screen flex justify-center items-center">
                    <div className="px-5 flex item-center justify-center flex-col">
                        <h1 className="font-Poppins  text-lg lg:text-3xl font-bold text-red-500" style={{ WebkitTextStroke: '0.1px rgba(0, 0, 0, 0.1)',  color: '#b81f14', textShadow: '1px 1px 1px #FFF' }}>
                            Error analyzing your speech
                        </h1>

                        <div className="flex items-center self-center justify-center mt-5 p-2 lg:w-[150px] rounded-md bg-cyan-300 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-10px]" onClick={handleBack}>
                            <p onClick={handleBack} className="cursor-pointer font-Poppinstext-lg ">Try Again</p>
                        </div>
                    </div>
                </div>
                </>)
            )}
        </>
    )
}

export default ResultPage