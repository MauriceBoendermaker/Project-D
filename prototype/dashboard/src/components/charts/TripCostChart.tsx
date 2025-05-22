import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { StyledChartWrapper } from "../StyledChartWrapper";
import { TRIP_COST_TITLE } from "components/ChartTitles";

interface TripCostChartProps {
  delayIndex?: number;
}

export interface Trip {
  id: number;
  tripNumber: string;
  date: string; // ISO date string, can also be Date if parsed
  distanceKm: number;
  time: number; // Assuming this is duration in minutes
  destinationId: number;
  customerId: number;
  driverId: number;
  createdAt: string; // ISO date string
}

export type TripResponse = {
  message: string;
  data: Trip[];
};

export const TripCostChart: React.FC<TripCostChartProps> = ({
  delayIndex = 0,
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKostenData = async () => {
      try {
        const rittenResponse = await fetch(
          "http://localhost:3000/api/brandstof/ritten"
        );
        if (!rittenResponse.ok) throw new Error("Fout bij ophalen voertuigen");

        const ritten: TripResponse = await rittenResponse.json();
        const kostenData: any[] = [];

        for (const rit of ritten.data) {
          const voertuigId = "TRK-" + (rit.id - 1);
          const kostenResponse = await fetch(
            `http://localhost:3000/api/brandstof/kosten/${voertuigId}/${rit.id}`
          );
          if (kostenResponse.ok) {
            const tekst = await kostenResponse.text();
            const matches = tekst.match(/€\s*(\d+)/);
            const kosten = matches ? parseFloat(matches[1]) : 0;
            kostenData.push({
              label: `${voertuigId} - ${rit.id}`,
              kosten,
            });
          } else {
            console.warn(`Geen data voor ${voertuigId}/${rit.id}`);
          }
        }

        setChartData(kostenData);
        setLoading(false);
      } catch (err: any) {
        console.error("Fout bij ophalen:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKostenData();
  }, []);
  const chartOptions = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: chartData.map((item) => String(item.label)),
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
        data: chartData.map((item) => item.kosten),
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
