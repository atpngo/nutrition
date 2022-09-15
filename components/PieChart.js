import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart({values}) {

    const [data, setData] = useState(values);

    useEffect(() => {
        setData(values);
    }, [values])

  return <>
    <Pie data={{
        labels: ['Protein', 'Fats', 'Carbs'],
        datasets: [
        {
            label: 'Grams',
            data: values,
            backgroundColor: [
            '#06D6A0',
            '#FBC813',
            '#BD4291',
            ],
            borderWidth: 0,
        },
        ],
    }} 
    options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        }
    }}/>
</>;
}
