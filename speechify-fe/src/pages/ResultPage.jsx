import { useState, useEffect, useRef } from "react"
import PuffLoader from 'react-spinners/PuffLoader'
import styled, { keyframes } from 'styled-components';
import TranscriptionService from "../service/TranscriptionService";
import Chart from 'chart.js/auto'
import AnalyzerService from "../service/AnalyzerService";
import RadarChart from "../components/RadarChart";
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
    const [scores, setScores] = useState([])
            
    const fetchData = async () => {
        try {
            setIsLoading(true);
            // Get Summary 
            const summaryResponse = await TranscriptionService.GetSummary(token);
            if (!summaryResponse) {
                console.log("Error fetching data");
                setIsLoading(false);
                setIsSuccessful(false);
                return;
            }
            setSummary(summaryResponse.summary);
            console.log(summaryResponse.summary);
            setIsLoading(false);
            setIsSuccessful(true);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsSuccessful(false);
        }
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
                labels: ['Language', 'Clarity', 'Complexity', 'Relevance ', 'Any'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [8, 1, 5, 7, 0],
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
    useEffect(() =>{
        fetchData();

    },[])
    useEffect(() => {
        createChart();
    }, [summary]);
    
    
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
                <div className="flex flex-wrap h-[88vh] w-full lg:w-screen">
                    <div className="lg:w-[50vw] w-full lg:hidden">
                        <div className="w-full lg:w-full xl:w-full lg:h-1/2 h-auto  p-4 flex items-center flex-col">
                            <h1 className="text-black text-3xl font-bold font-Poppins">Summary</h1>
                            <p className="p-5 text-xl font-Poppins lg:px-16 lg:pt-4 lg:mt-2 text-black tracking-normal">{summary}</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 xl:w-1/2 h-[83vh] md:h-full p-4 flex justify-center">
                        <div className="w-[90vw] lg:w-[48vw] bg-gradient-to-bl from-[#31186C] to-[#49a3a8] rounded-2xl  flex flex-col items-center h-full">
                            <h1 className="text-3xl font-Poppins text-center font-bold pt-4 pb-4 text-white tracking-wide">Statistics</h1>
                            <div className="h-[70vh] w-[80vw] lg:w-[48vw]">                            
                                <canvas ref={chartRef} />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[50vw] w-full">
                        <div className="hidden w-full lg:w-full xl:w-full lg:h-1/2 h-auto  p-4 lg:flex lg:items-center lg:flex-col">
                            <h1 className="text-black text-3xl font-bold font-Poppins">Summary</h1>
                            <p className="p-5 text-xl font-Poppins lg:px-16 lg:pt-4 lg:mt-2 text-black tracking-normal">{summary}</p>
                        </div>
                        <div className="w-full lg:w-full xl:w-full lg:h-1/2 h-auto  p-4 flex items-center flex-col">
                            <h1 className="text-black text-3xl font-bold font-Poppins tracking-normal">Suggestions</h1>
                            <p className="p-5 text-xl font-Poppins lg:px-16 lg:pt-4 lg:mt-2 text-black tracking-normal">{}</p>
                        </div>
                    </div>
                </div>

                ) : (
                <>
                <div className="h-[88vh] w-screen flex justify-center items-center">
                    <div>
                        <h1>Error analyzing you speech</h1>
                    </div>
                </div>
                </>)
            )}
        </>
    )
}

export default ResultPage