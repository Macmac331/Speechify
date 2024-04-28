import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RadarChart = ({ scores }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !scores) return;

        const { complexity, clarity } = scores;

        const ctx = chartRef.current.getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Language', 'Clarity', 'Complexity', 'Relevance', 'Grammar'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [8, clarity, complexity, 7, 0],
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
        
    Chart.defaults.color = '#fff';
    Chart.defaults.font.size = 12
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [scores]);

    return <canvas ref={chartRef} />;
};

export default RadarChart;
