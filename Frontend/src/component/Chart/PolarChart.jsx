import React from 'react'
import {PolarArea} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"

export default function PolarChart({chatData}) {
  return (
    <div>
        <PolarArea data={chatData}/>
    </div>
  )
}
