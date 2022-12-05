import type { NextPage } from 'next';
import styles from './Visitors.module.scss';
import {useState} from "react";

import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'
ChartJS.register(...registerables);

export const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];


const Visitors: NextPage = () => {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),

        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#f0331a",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Zoo's Visitors</h3>
      {/*<img*/}
      {/*  src="https://www.shutterstock.com/image-vector/set-colourful-business-charts-diagram-260nw-1388414240.jpg"*/}
      {/*  alt=""*/}
      {/*/>*/}
      {/*Chart*/}
        <Bar
            className={styles.chart}
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />

    </div>
  );
};

export default Visitors;
