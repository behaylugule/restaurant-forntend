// components/LineChart.js
"use client"; // This directive marks the component for client-side rendering in Next.js App Router

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }: { chartData: any }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: "Book for the Last 6 months",
      },
    },
  };

  return (
    <div className='w-full'>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LineChart;