import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { fetchDataAsync } from "../data/fetchData";
import {
  averageShipmentValue,
  totalActive,
  totalCapacity,
  totalShipmentValue,
  totalCancelled,
} from "../data/dataCalculation";

const Page: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<echarts.EChartsOption>({});

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchDataAsync();
      setData(jsonData);
      console.log(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const AvgShipmentValue = averageShipmentValue(data);
    const totalValue = totalShipmentValue(data);
    const totalShipmentCapacity = totalCapacity(data) - 112250;
    const totalActiveShipments = totalActive(data);
    const totalCancelledShipments = totalCancelled(data);

    console.log(data);
    setChartOptions({
      title: {},
      tooltip: {},
      xAxis: {
        type: "category",
        data: [],
        boundaryGap: true,
      },
      yAxis: {
        type: "value",
        name: "Main Metrics",
        position: "left",
      },

      legend: {
        show: true,
        type: "scroll",
      },
      series: [
        {
          name: "Average Shipment value",
          type: "bar",
          data: [AvgShipmentValue, 0],
        },
        {
          name: "Total Shipment value",
          type: "bar",
          data: [0, totalValue],
        },
        {
          name: "Total Shipment Capacity",
          type: "bar",
          data: [0, 0, totalShipmentCapacity],
        },
        {
          name: "Total Active",
          type: "bar",
          data: [0, 0, 0, totalActiveShipments],
        },
        {
          name: "Total Cancelled",
          type: "bar",
          data: [0, 0, 0, 0, totalCancelledShipments],
        },
      ],
    });
  }, [data]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{ height: "1200px", width: "1500px" }}
    />
  );
};

export default Page;
