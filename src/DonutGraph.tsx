import {useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import "./Graph.css"
import "./DonutGraph.css"

const labels = ['Free', 'Used'];

const defaultOptions = {
    dataLabels: {
        enabled: true,
        formatter: (val: number, {seriesIndex}: {seriesIndex: number}) => `${labels[seriesIndex]}: ${val}%`,
        style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 200
        },
    },
    labels: labels,
    stroke: {
        width: 0, // Set the stroke width to 0 to remove the outline
    },
    legend: {
        show: false
    }
};

interface DonutGraphProps {
    initialUsage: number;
    getNextUsage: () => number;
    title: string;
    colours: string[];
}

function DonutGraph(props: DonutGraphProps) {
    const {initialUsage, getNextUsage, title, colours} = props;

    const [usage, setUsage] = useState(initialUsage);

    // use this only to test before NZXT CAM launches the api
    useEffect(() => {
        const timer = setInterval(() => {
            setUsage(getNextUsage());
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="App">
            <div className="title title-donut">{title}</div>
            <Chart className="chart chart-donut"
                // @ts-ignore
                   options={{
                       ...defaultOptions,
                       colors: colours
                   }}
                   series={[100-usage, usage]}
                   type="donut"
                   theme="dark"/>
        </div>
    )
}

export default DonutGraph
