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


const Pie: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [chartOptions, setChartOptions] = useState<echarts.EChartsOption>({});

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchDataAsync();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const AvgShipmentValue = averageShipmentValue(data);
    const totalValue = totalShipmentValue(data);
    const totalShipmentCapacity = totalCapacity(data) - 112250;
    const totalActiveShipments = totalActive(data);
    const totalCancelledShipments = totalCancelled(data);

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
        position: "left",
      },

      legend: {
        show: true,
        type: "scroll",
      },
      series: [
        {
          type: "pie",
          radius: "65%",

          data: [
            {
              value: AvgShipmentValue,
              name: "Average Shipment value",
            },
            { value: totalValue, name: "Total Shipment value" },
            { value: totalShipmentCapacity, name: "Total Shipment Capacity" },
            { value: totalActiveShipments, name: "Total Active" },
            { value: totalCancelledShipments, name: "Total Cancelled" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }, [data]);

  return (
    <ReactECharts
      option={chartOptions}
      style={{
        height: "1200px",
        width: "1800px",
      }}
    />
  );
};

export default Pie;
