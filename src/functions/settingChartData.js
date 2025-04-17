import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2) => {
    const convertDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      // e.g., "Apr 11", "Mar 31"
    };
  
    if (prices2) {
      setChartData({
        labels: prices1.map((price) => convertDate(price[0])),
        datasets: [
          {
            label:"Crypto1",
            data: prices1.map((price) => price[1]),
            borderColor: "#3a80e9",
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            pointRadius: 0,
            yAxisID: "crypto1",
          }, 
          {
            label:"Crypto2",
            data: prices2.map((price) => price[1]),
            borderColor: "#61c96f",
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            pointRadius: 0,
            yAxisID: "crypto2",
          },
        ],
      });
    } else {
      setChartData({
        labels: prices1.map((price) => convertDate(price[0])),
        datasets: [
          {
            data: prices1.map((price) => price[1]),
            borderColor: "#3a80e9",
            borderWidth: 2,
            fill: true,
            backgroundColor: "rgba(58, 128, 233,0.1)",
            tension: 0.25,
            pointRadius: 0,
            yAxisID: "crypto1",
          },
        ],
      });
    }
   
  };
  
  
  