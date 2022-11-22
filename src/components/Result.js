import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import getDetailsByHooks from "../hooks/getDetailsByHooks";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJs.register(BarElement, CategoryScale, LinearScale);

export const Result = () => {
  const { id } = useParams();
  const [title, setTitle] = useState([]);

  const [detailsById] = getDetailsByHooks(id);
  useEffect(() => {
    const data = () => {
      if (detailsById.data) {
        setTitle(detailsById.data.data["options"]);
        console.log("----", detailsById.data.data["options"]);
      }
    };
    data();
  }, [detailsById.data]);

  console.log("--", title);
  console.log("--//", title);

  
  let data = {
    labels: title?.map((x) => x.vote),
    datasets: [
      {
        label: "# of Votes",
        data: title?.map((x) => x.vote),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],

        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 10,
      },
      
    },
  };

  return (
    <div className="container">
      <Link to="/homes">
        <button className="btn btn-danger">Back</button>
      </Link>
      {/* {result} */}
      <Bar data={data} height={0} options={options}></Bar>
    </div>
  );
};

export default Result;
