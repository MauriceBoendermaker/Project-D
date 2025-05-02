import {
  fetchTotalLoadDegree,
  TotalDegreeResponse,
  error,
  TotalDegree,
} from "api/fetchShipmentData";
import { ChartsWrapper } from "components/ChartsWrapper";
import { StyledChartWrapper } from "components/StyledChartWrapper";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import React, { useEffect, useState } from "react";
interface LoadDegreeChartProps {
  delayIndex?: number;
}

export const LoadDegreeChart = ({ delayIndex }: LoadDegreeChartProps) => {
  const [chartData, setChartData] = useState<TotalDegree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKostenData = async () => {
      try {
        const totalLoadDegree: TotalDegreeResponse =
          await fetchTotalLoadDegree();
        if ("message" in totalLoadDegree) setError(totalLoadDegree.message);
        else {
          setChartData(totalLoadDegree.response);
        }
        setLoading(false);
      } catch (err: any) {
        console.error("Fout bij ophalen:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKostenData();
  }, []);

  const chartOptions: EChartsOption = {
    tooltip: {},
    xAxis: {
      name: "Zending",
      nameLocation: "middle",
      type: "category",
      nameGap: 50,
      data: chartData.map((item: TotalDegree) => String(item.shipmentId)),
    },
    yAxis: {
      name: "Beladingsgraad (%)",
      type: "value",
    },
    series: [
      {
        name: "Zending",
        type: "bar",
        data: chartData.map((item: TotalDegree) =>
          (item.loadDegree * 100).toFixed(2)
        ),
        itemStyle: {
          color: "#95191D",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
      {
        type: "bar",
        data: chartData.map(() => 0),
        itemStyle: {
          color: "#FFA0A3",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
    ],
  };

  console.log("Chart data:", JSON.stringify(chartData));

  return (
    <StyledChartWrapper
      title="Beladingsgraad per zending"
      delayIndex={delayIndex}
    >
      {chartData.length > 0 ? (
        <ReactECharts
          option={chartOptions}
          style={{ height: 300, width: "100%" }}
        />
      ) : (
        <div>Laden van data...</div>
      )}
    </StyledChartWrapper>
  );
};
