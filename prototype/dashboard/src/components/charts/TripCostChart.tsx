import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { StyledChartWrapper } from "../StyledChartWrapper";
import { TRIP_COST_TITLE } from "components/ChartTitles";
import {
  TotalCostResponse,
  TripCost,
} from "components/ChartInfo/CostChartInfo";

interface TripCostChartProps {
  delayIndex?: number;
}

export type TripResponse = {
  message: string;
  data: TripCost[];
};

export const TripCostChart: React.FC<TripCostChartProps> = ({
  delayIndex = 0,
}) => {
  const [chartData, setChartData] = useState<TripCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKostenData = async () => {
      try {
        const ApiResponse = await fetch(
          "http://localhost:3000/api/brandstof/totalekosten"
        );

        if (ApiResponse.ok) {
          const json: TotalCostResponse = await ApiResponse.json();
          if (json.message == null) {
            setChartData(json.data);
            setLoading(false);
          } else {
            setError(json.message);
            setLoading(false);
          }
        } else {
          setError("API response was not ok.");
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setError("Er is een fout opgetreden bij het ophalen van de data.");
        setLoading(false);
      }
    };
    fetchKostenData();
  }, []);
  const chartOptions = {
    tooltip: {},
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      name: "Kosten (Euro)",
      min: 0,
    },
    series: [
      {
        name: "Kosten in Euro",
        type: "bar",
        data: chartData.map((item) => item.cost),
        itemStyle: {
          color: "#95191D",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
    ],
  };

  return (
    <StyledChartWrapper
      title={
        <a
          href="http://localhost:5000/benzinekosten"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {TRIP_COST_TITLE}
        </a>
      }
      delayIndex={delayIndex}
    >
      {loading && <div>Laden van data...</div>}
      {error && <div>Fout: {error}</div>}
      {!loading && !error && chartData.length > 0 && (
        <ReactECharts
          option={chartOptions}
          style={{ height: 300, width: "100%" }}
        />
      )}
    </StyledChartWrapper>
  );
};
