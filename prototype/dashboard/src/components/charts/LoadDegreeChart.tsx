import {
  fetchTotalLoadDegree,
  TotalDegreeResponse,
  error,
  TotalDegree,
} from "api/fetchShipmentData";
import { LOAD_DEGREE_TITLE } from "components/ChartTitles";
import { StyledChartWrapper } from "components/StyledChartWrapper";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import React, { useEffect, useState } from "react";
interface LoadDegreeChartProps {
  delayIndex?: number;
  data: TotalDegree[];
}

export const LoadDegreeChart = ({
  delayIndex,
  data = [],
}: LoadDegreeChartProps) => {
  const [chartData, setChartData] = useState<TotalDegree[]>(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKostenData = async () => {
      if (data.length > 0) {
        setChartData(data);
      } else {
        try {
          const totalLoadDegree: TotalDegreeResponse =
            await fetchTotalLoadDegree();

          if (totalLoadDegree.message != null) {
            setError(totalLoadDegree.message);
          } else {
            setChartData(totalLoadDegree.data);
          }
          setLoading(false);
        } catch (err: any) {
          console.error("Fout bij ophalen:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchKostenData();
  }, [data]);

  const barWidth = chartData.length == 1 ? 30 : "auto";
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
        barWidth: barWidth,

        data: chartData.map((item: TotalDegree) =>
          (item.degree * 100).toFixed(2)
        ),
        itemStyle: {
          color: "#95191D",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
      {
        type: "bar",
        barWidth: barWidth,
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
      title={
        <a
          href="http://localhost:5000/ladingsgraad"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {LOAD_DEGREE_TITLE}
        </a>
      }
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
