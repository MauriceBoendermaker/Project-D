import { color } from "echarts";
import EChartsReact, { EChartsOption } from "echarts-for-react";


interface ChartProps {
  chartId: number;
  title: string;
  options: EChartsOption;
}
export const Chart = () => {
  const option: EChartsOption = {
    animation: true,
    animationDuration: 800,
    animationDelay: 100,
    animationEasing: "cubicOut",
    xAxis: {
      name: "Shipment",
      type: "category",
      data: ["S001", "S002", "S003", "S004"],

      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#999",
        fontFamily: "Montserrat",
        fontSize: 12,
      },
      splitLine: { lineStyle: { color: "#eee" } },
    },
    yAxis: {
      min: 0,
      max: 100,
      name: "Load Degree (%)",
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: "#333",
        fontWeight: 500,
        fontFamily: "Montserrat",
        fontSize: 13,
      },
    },
    series: [
      {
        name: "Load Degree",
        color: "#9B1C1C",
        type: "bar",
        data: [75, 60, 90, 45],
        itemStyle: {
          borderRadius: 6,
          color: (params: any) =>
            params.dataIndex === 0 ? "#9B1C1C" : "#F4BABA",
        },
        barWidth: 10,
        label: {
          show: true,
          position: "right",
          color: "#9B1C1C",
          fontWeight: 600,
          fontSize: 13,
          fontFamily: "Montserrat",
          formatter: (val: any) => new Intl.NumberFormat().format(val.value),
        },
      },
    ],
    tooltip: {},
    legend: { show: true, bottom: true },
  };
  return (
    //   <div className="chart-content">
    //   <div
    //     id={chartId}
    //     ref={chartRef}
    //     style={{ height: "280px", width: "100%" }}
    //   />
    // </div>
    <>
      <div>
        <EChartsReact option={option} />
      </div>
    </>
  );
};
