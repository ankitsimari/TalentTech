import React, { useEffect, useState } from "react";
import BarChart from "../component/Chart/BarChart";
import PieChart from "../component/Chart/PieChart";
import LineChart from "../component/Chart/LineChart";
import PolarChart from "../component/Chart/PolarChart";

const Analytics = () => {
  const [chart,setChart] = useState("bar")
  const name = ["Subject", "Communication", "Interview"];
  const colors = ["#7a3ff3", "black", "rgb(247,190,56)"];
  const Length = [9, 5, 7];

  const [userData, setUserData] = useState({
    labels: name,
    datasets: [
      {
        label: "Skills",
        data: Length,
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const data = {
    labels: ["Interview 1", "Interview 2", "Interview 3"],
    datasets: [
      {
        label: "Subject",
        data: [10, 20, 15],
        backgroundColor: colors,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Communication",
        data: [5, 15, 10],
        backgroundColor: colors,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Communication",
        data: [8, 12, 11],
        backgroundColor: colors,
        borderWidth: 2,
        fill: false,
      }

    ],
  };

  return (
    <div>

      <select value={chart} className="ms-8 px-3 py-2 border-2 font-bold border-solid text-customColor border-customColor" onChange={(e)=>setChart(e.target.value)}>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
        
      <div className="">
          <div
            className="shadow p-4"
            style={{ width: "80%" }}
            data-aos="fade-right"
          >
            {chart=="bar"?<BarChart chatData={data} /> : <LineChart chatData={data} />}
            
          </div>
     
            

     
      </div>
      {/* <LineChart chatData={userData} /> */}
    </div>
  );
};

export default Analytics;
