import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import epochToHuman from "./scripts/epochToHuman";
import AnimatedNumbers from "react-animated-numbers";


const App = () => {
  //"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=Country_Region%20%3D%20'POLAND'&outFields=Country_Region,Confirmed,Last_Update&returnGeometry=false&outSR=4326&f=json"

  //const [data, setData] = useState([]);
  const [covidCases, setCovidCases] = useState();

  useEffect(() => {
    axios
      .get(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=Country_Region%20%3D%20'POLAND'&outFields=Country_Region,Confirmed,Last_Update&returnGeometry=false&outSR=4326&f=json"
      )
      .then((response: AxiosResponse) => {
        console.log(response.data);
        //const a = Object.values(response.data)
        //setData(response.data); 
        setCovidCases(response.data["features"][0]["attributes"]["Confirmed"]);
        localStorage.setItem("covidCases", covidCases);
      });
  }, []);

  function print() {
    if(!localStorage.getItem("covidCases"))
    console.log()
    console.log((covidCases || '').toLocaleString());
  }

  return (
    <div className="bg-slate-500 m-8">
      <h1 className="text-6xl font-bold text-center ">Covid cases in Poland: </h1>
      <div className="text-7xl text-center select-none">
        <AnimatedNumbers
          includeComma
          animateToNumber={(covidCases ||  0)}
          configs={[
            { mass: 1, tension: 220, friction: 100 },
            { mass: 1, tension: 180, friction: 130 },
            { mass: 1, tension: 280, friction: 90 },
            { mass: 1, tension: 180, friction: 135 },
            { mass: 1, tension: 260, friction: 100 },
            { mass: 1, tension: 210, friction: 190 },
          ]}
        />
      {/* {covidCases.toLocaleString()} */}

      </div>
      <br></br>
      <button
        onClick={() => print()}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Sheeesh
      </button>
    </div>
  );
};

export default App;
