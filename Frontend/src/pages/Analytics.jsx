import React, { useEffect, useState } from "react";
import BarChart from "../component/Chart/BarChart";
import PieChart from "../component/Chart/PieChart";
import LineChart from "../component/Chart/LineChart";
import PolarChart from "../component/Chart/PolarChart";
import { useSelector } from "react-redux";

const Analytics = () => {
  const [chart,setChart] = useState("bar")
  const name = ["Subject", "Communication", "Interview"];
  // const colors = ["#7a3ff3", "black", "rgb(247,190,56)"];
  const Length = [9, 5, 7];

  // const [userData, setUserData] = useState({
  //   labels: name,
  //   datasets: [
  //     {
  //       label: "Skills",
  //       data: Length,
  //       backgroundColor: colors,
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  const res = useSelector((state=>state.authReducer.user.scores))
  console.log(res)

  const Interviews = res.map((e,i)=> `Interview-${i+1}`)
  const Subjects = res.map((e)=>e.Subject_Matter);
  const Communications = res.map((e)=>e.Communication);
  const Interview_skills = res.map((e)=>e.Interview);
  console.log(Interview_skills)


  const colors = {
    Subject: "#7a3ff3",
    Communication: "black",
    Interview: "rgb(247,190,56)",
  };
  
 
const data = {
  labels: Interviews,
  datasets: [
    {
      label: "Subject",
      data: Subjects,
      backgroundColor: colors.Subject,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Communication",
      data: Communications,
      backgroundColor: colors.Communication,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Interview",
      data: Interview_skills,
      backgroundColor: colors.Interview,
      borderWidth: 2,
      fill: false,
    },
  ],
};

const LineData = {
  labels: Interviews,
  datasets: [
    {
      label: "Subject",
      data: Subjects,
      borderColor: colors.Subject,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Communication",
      data: Communications,
      borderColor: colors.Communication,
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Interview",
      data: Interview_skills,
      borderColor: colors.Interview,
      borderWidth: 2,
      fill: false,
    },
  ],
};

const options = {
  scales: {
    y: {
      min: 1,
      max: 10,
    },
  },
};

console.log("Options:", options); // Log options to the console
  
  return (
    <div className="p-5">

      <select value={chart} className="ms-8 px-3 py-2 border-2 font-bold border-solid text-customColor border-customColor" onChange={(e)=>setChart(e.target.value)}>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
        
      <div className="flex justify-center mt-8">
          <div
            className="shadow p-4"
            style={{ width: "80%" }}
            data-aos="fade-right"
          >
            {chart=="bar"?<BarChart chatData={data} options={options} /> : <LineChart chatData={LineData} options={options} />}
            
          </div>
     
            

     
      </div>
      {/* <LineChart chatData={userData} /> */}
    </div>
  );
};

export default Analytics;