import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { StyledChartWrapper } from "../StyledChartWrapper";
import { FUEL_CHART_TITLE } from "components/ChartTitles";
import { Trip, fetchTripData } from "api/fetchTripData";

interface FuelChartProps {
  delayIndex?: number;
  chartData: Trip[];
}

export const FuelChart: React.FC<FuelChartProps> = ({
  delayIndex = 0,
  chartData = [],
}) => {
  const [data, setData] = useState<Trip[] | null>(chartData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTripData = async () => {
      if (chartData.length > 0) {
        setData(chartData);
      } else {
        try {
          const data = await fetchTripData();
          setData(data);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    getTripData();
  }, [chartData]);

  const processedData = data
    ? Object.values(
        data.reduce((acc: any, rit: Trip) => {
          const voertuig_id = rit.vehicleId;
          const afstand_km = rit.distanceKm;
          const brandstof_verbruik_l = rit.fuelUsage;

          if (!acc[rit.vehicleId]) {
            acc[voertuig_id] = {
              voertuig_id,
              totalAfstand: 0,
              totalBrandstof: 0,
              count: 0,
            };
          }

          acc[voertuig_id].totalAfstand += afstand_km;
          acc[voertuig_id].totalBrandstof += brandstof_verbruik_l;
          acc[voertuig_id].count++;

          return acc;
        }, {})
      ).map((item: any) => ({
        voertuig_id: item.voertuig_id,
        gemiddeldeAfstand:
          Math.round((item.totalAfstand / item.count) * 10) / 10,
        gemiddeldeBrandstof:
          Math.round((item.totalBrandstof / item.count) * 10) / 10,
      }))
    : [];

  const barWidth = chartData.length == 1 ? 30 : "auto";

  const chartOptions = {
    tooltip: {},
    legend: {
      data: ["Gemiddelde Afstand in km", "Gemiddelde Brandstof in L"],
    },
    xAxis: {
      type: "category",
      data: processedData.map((item: any) => `TRK-${item.voertuig_id}`),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Gemiddelde Afstand in km",
        type: "bar",
        barWidth: barWidth,
        data: processedData.map((item: any) => item.gemiddeldeAfstand),
        itemStyle: {
          color: "#95191D",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
      {
        name: "Gemiddelde Brandstof in L",
        type: "bar",
        barWidth: barWidth,
        data: processedData.map((item: any) => item.gemiddeldeBrandstof),
        itemStyle: {
          color: "#FFA0A3",
          barBorderRadius: [5, 5, 0, 0],
        },
      },
    ],
  };

  return (
    <StyledChartWrapper
      title={
        <a
          href="http://localhost:5000/verbruik"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {FUEL_CHART_TITLE}
        </a>
      }
      delayIndex={delayIndex}
    >
      {data ? (
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
