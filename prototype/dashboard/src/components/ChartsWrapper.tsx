// This component is meant to act as a wrapper for all four charts on the main page

import { useState, useEffect } from "react";
import { FuelChart } from "./charts/FuelUsageChart";
import { TripCostChart } from "./charts/TripCostChart";
import { LoadDegreeChart } from "./charts/LoadDegreeChart";
import { MonthlyNumbers } from "./charts/MonthlyNumbers";

export const ChartsWrapper = () => {
  const [zoomedChart, setZoomedChart] = useState<number | null>(null);

  const chartConfigs = [
    { type: "fuel", id: "fuelChart" },
    { type: "tripCost", id: "tripChart" },
    { type: "Beladingsgraad", id: "beladingsgraadChart" },
    {type: "MonthlyNumbers", id: "Monthly"},
  ];

  useEffect(() => {
    const onZoom = (e: any) => {
      setZoomedChart((prev) => (prev === e.detail ? null : e.detail));
    };

    window.addEventListener("zoomChart", onZoom);
    return () => window.removeEventListener("zoomChart", onZoom);
  }, []);

  return (
    <section className="charts-wrapper container-fluid">
      <div className="chart-grid row g-4">
        {chartConfigs.map((cfg, i) => {
          const isZoomed = zoomedChart === i;
          const isHidden = zoomedChart !== null && zoomedChart !== i;

          return (
            <div
              key={cfg.id}
              className={`chart-container ${
                isZoomed ? "col-12 zoomed" : isHidden ? "d-none" : "col-md-6"
              }`}
            >
              {cfg.type === "fuel" ? (
                <FuelChart delayIndex={i} chartData={[]} />
              ) : cfg.type === "tripCost" ? (
                <TripCostChart delayIndex={i} data={[]} />
              ) : cfg.type === "Beladingsgraad" ? (
                <LoadDegreeChart delayIndex={i} data={[]} />
              ) : cfg.type === "MonthlyNumbers" ? (
                <MonthlyNumbers delayIndex={i} Data={[]} />
              ) : <MonthlyNumbers delayIndex={i} Data={[]} />}
            </div>
          );
        })}
      </div>
    </section>
  );
};
