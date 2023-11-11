import React from 'react'
import {Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"

export default function LineChart({chatData}) {
  return (
    <div >
        <Line data={chatData}/>
    </div>
  )
}
