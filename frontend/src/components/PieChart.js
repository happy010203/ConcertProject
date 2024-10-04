import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [chartData, setChartData] = useState({
        labels: ['Category 1', 'Category 2', 'Category 3'],
        datasets: [
            {
                label: 'Categories',
                data: [30, 50, 20], // 初始數據
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    });

    useEffect(() => {
        // 模擬從資料庫讀取數據並更新圖表
        fetch('/api/data') // 假設這裡是讀取資料庫數據的 API
            .then((response) => response.json())
            .then((data) => {
                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Categories',
                            data: data.values, // 動態更新數據
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                });
            });
    }, []);

    return <Pie data={chartData} />;
}

export default PieChart;
