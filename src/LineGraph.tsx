import {useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import "./Graph.css"

const defaultOptions = {
    chart: {
        id: "basic-bar",
        toolbar: {
            show: false
        }
    },
    xaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: [ '#ffffff' ],
                fontSize: '16px',
                cssClass: 'something',
            },
            formatter: (value: string) => `${value}°C`
        }
    },
    grid: {
        show: true,
        borderColor: '#ffffff',
        strokeDashArray: 10,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: true
            },
            min: 0,
            max: 100
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        width: 5
    }
};

interface LineGraphProps {
    initialTemp: number;
    getNextTemp: (prevTemp: number[]) => number;
    title: string;
    colour: string;
}

function LineGraph(props: LineGraphProps) {
    const {initialTemp, getNextTemp, title, colour} = props;

    const [temp, setTemp] = useState(new Array(20).fill(initialTemp));

    // use this only to test before NZXT CAM launches the api
    useEffect(() => {
        const timer = setInterval(() => {
            const nextTempSetter = (prevTemp: number[]) => {
                const nextTemp = getNextTemp(prevTemp);
                return [...prevTemp.slice(1), nextTemp];
            }

            setTemp(nextTempSetter);
        }, 300);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="App">
            <div className="title">{title}</div>
            <Chart className="chart"
                // @ts-ignore
                   options={{
                       ...defaultOptions,
                       colors: [colour]
                   }}
                   series={[{
                       name: `${title}`,
                       data: temp
                   }]}
                   type="line"
                   theme="dark"/>
        </div>
    )
}

export default LineGraph
