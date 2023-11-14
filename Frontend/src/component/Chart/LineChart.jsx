// LineChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chatData, options }) => {
  return <Line data={chatData} options={options} />;
};

export default LineChart;



