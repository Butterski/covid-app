import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import epochToHuman from "./scripts/epochToHuman";
import AnimatedNumbers from "react-animated-numbers";

const App = () => {
  //"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=Country_Region%20%3D%20'POLAND'&outFields=Country_Region,Confirmed,Last_Update&returnGeometry=false&outSR=4326&f=json"

  const [date, setDate] = useState([]);
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
        setDate(response.data["features"][0]["attributes"]["Last_Update"]);
      });
  }, []);

  function reload() {
    let temp = covidCases;
    setCovidCases(null);
    setTimeout(() => {
      setCovidCases(temp);
    }, 100);
  }

  return (
    <div className="bg-slate-500 h-screen flex justify-center items-center">
      <div className="bg-slate-600 h-2/4 p-4 rounded-xl sm:h-2/5 drop-shadow-2xl border-4 border-gray-800">
        <h1 className="text-4xl sm:text-6xl font-bold text-center ">
          Covid cases in Poland:{" "}
        </h1>
        <br></br>
        <div className="text-6xl sm:text-7xl select-none flex justify-center my-4">
          <AnimatedNumbers
            includeComma
            animateToNumber={covidCases || 0}
            configs={[
              { mass: 1, tension: 220, friction: 100 },
              { mass: 1, tension: 180, friction: 130 },
              { mass: 1, tension: 280, friction: 90 },
              { mass: 1, tension: 180, friction: 135 },
              { mass: 1, tension: 260, friction: 100 },
              { mass: 1, tension: 210, friction: 130 },
            ]}
          />
        </div>
        <br></br>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => reload()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded justify-center"
          >
            Reload
          </button>
        </div>

        <abbr
          title={epochToHuman(date as any).toString()}
          className="underline decoration-solid absolute bottom-1 right-2 cursor-help"
        >
          Last Updated
        </abbr>
      </div>
    </div>
  );
};

export default App;
