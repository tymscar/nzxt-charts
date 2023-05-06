// import { MonitoringData, Cpu} from "@nzxt/web-integrations-types/v1";
import LineGraph from "./LineGraph";
import DonutGraph from "./DonutGraph";
import "./App.css"
import {useEffect, useState} from "react";

// use these only to test before NZXT CAM launches the api
const getNextTempOffset = () => Math.floor(Math.random() * 7 - 3);
const getNextUsage = () => Math.floor(Math.random() * 100);

const getGraphToRender = (index: number) => {
  switch (index) {
    case 0:
      return <LineGraph
          title="CPU Temp"
          initialTemp={30}
          getNextTemp={(prevTemp: number[]) => getNextTempOffset() + prevTemp[prevTemp.length - 1]}
          colour={'#0071c5'}
      />
    case 1:
      return <LineGraph
          title="GPU Temp"
          initialTemp={30}
          getNextTemp={(prevTemp: number[]) => getNextTempOffset() + prevTemp[prevTemp.length - 1]}
          colour={'#76b900'}
      />
    case 2:
      return <DonutGraph
          title="Ram usage"
          initialUsage={30}
          getNextUsage={() => getNextUsage()}
          colours={['#76b900', '#ED1C24']}
      />
  }

}

function App() {

  const [graphIndex, setGraphIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGraphIndex((prevState => (prevState + 1) % 3));
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <div className="App">
            {getGraphToRender(graphIndex)}
      </div>
  )
}

export default App
