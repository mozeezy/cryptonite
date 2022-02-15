import React, { useState, useEffect } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import ChartButton from './ChartButton'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({coin}) => {

  const [chartData, setChartData] = useState();
  const [days, setDays] = useState();
  const { currency } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    Container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20, 
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    axios.get(HistoricalChart(coin.id, days, currency)).then((res) => {
      setChartData(res.data.prices);
    });
  }, [days]);

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];



  return (
  <ThemeProvider theme={darkTheme}>
    <div className={classes.Container}>
    {!chartData ? 
    (<CircularProgress 
    style={{ color: "red"}}
    size={250}
    thickness={1}/>) : 
    (<>
    <Line
    data={{
      labels: chartData.map((coin) => {
        let date = new Date(coin[0]); 
        let time = date.getHours() > 12 
        ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
        : `${date.getHours()} : ${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      }), 
      datasets: [
        {
        label: `Price (Past ${days} Days) in ${currency}`,
        data: chartData.map((coin) => coin[1]),
        borderColor: "red",
        },
      ],
    }}
    options={{
      elements: {
        point: {
          radius: 1,
        },
      },
    }}
    />
    <div style={{
      display: "flex", 
      marginTop: 20, 
      justifyContent: "space-around", 
      width: "100%",
    }}>
      {chartDays.map((day) => 
      <ChartButton
      key={day.value}
      onClick={()=> setDays(day.value)}
      selected={day.value === days}
      >
      {day.label}</ChartButton>)}
    </div>
    </>)}
    </div>
  </ThemeProvider>
  )
}

export default CoinInfo