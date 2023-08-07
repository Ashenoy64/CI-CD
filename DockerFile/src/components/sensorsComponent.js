import { set } from "firebase/database";
import React, { useState } from 'react';
import "../css/sensorComponent.css";

function SensorComponent(props)
{

  let c="green"
  
  if(props.percentage>=90);
  else if (props.percentage >= 10) c="yellow";
  else c="red";
  if(props.status === "Error")
  c="red"

  const [color, setcolor] = useState(c);
  
  return (
    <div className="w-44 rounded-2xl p-8 bg-gray-300 h-64 shadow-sm shadow-black">
      <p className="m-4">
        <span className=" font-medium">Name: </span>
        <span> {props.name}</span>
      </p>
      <p className="m-4">
        <span className=" font-medium">Status: </span>{" "}
        <span style={{ color:(props.percentage<=10 || props.status=="Error")?"red":props.percentage<90?"yellow":"green" }}> {props.status}</span>
      </p>
      {props.status !== "Error" && (
        <>
          <div className="m-4">
            <span className=" font-medium">Percentage: </span>
            <div className="container">
              <div
                className="skill"
                style={{
                  width:props.percentage + "%",
                  backgroundColor:(props.percentage<=10 || props.status=="Error")?"red":props.percentage<90?"yellow":"green",
                  height: "10px",
                }}
              ></div>
            </div>
            {props.percentage}%
          </div>
        </>
      )}
    </div>
  )
}


export default SensorComponent;
