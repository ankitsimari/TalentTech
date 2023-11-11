import React, { useEffect, useState } from "react";
import BarChart from "./Chart/BarChart";
import PieChart from "./Chart/PieChart";
import LineChart from "./Chart/LineChart";
import PolarChart from "./Chart/PolarChart";

const Analytics = () => {
  const name = ["Subject", "Communication", "Interview"];
  const colors = ["#FC6183", "#81a05f", "#FBCA57"];
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

  return (
    <div>
      <div className="d-block m-auto ms-3">
        <span className="flex gap-4 mt-5">
          <div
            className="shadow p-4"
            style={{ width: "60%" }}
            data-aos="fade-right"
          >
            <BarChart chatData={userData} />
          </div>
          <div
            className="shadow p-4"
            style={{ width: "33%" }}
            data-aos="fade-left"
          >
            <PieChart chatData={userData} />
          </div>
        </span>
        <span className="flex gap-4 mt-5">
          <div
            className="shadow p-4"
            style={{ width: "60%" }}
            data-aos="fade-right"
          >
            <LineChart chatData={userData} />
          </div>
          <div
            className="shadow p-4"
            style={{ width: "33%" }}
            data-aos="fade-left"
          >
            <PolarChart chatData={userData} />
          </div>
        </span>
      </div>
      {/* <LineChart chatData={userData} /> */}
 
    </div>
  );
};

export default Analytics;
