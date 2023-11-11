import React from 'react'
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"

export default function BarChart({chatData}) {
  return (
    <div>
        <Bar data={chatData}/>
    </div>
  )
}
