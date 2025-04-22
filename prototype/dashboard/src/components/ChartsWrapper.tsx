// This component is meant to act as a wrapper for all four charts on the main page

import { useState, useEffect } from "react";
import { FuelChart } from "./charts/FuelUsageChart";
import { TripCostChart } from "./charts/TripCostChart";

export const ChartsWrapper = () => {

    const [zoomedChart, setZoomedChart] = useState<number | null>(null);

    const chartConfigs = [
        { type: "fuel", id: "fuelChart"},
        { type: "tripCost", id: "tripChart"},
        { type: "tripCost", id: "tripChart1"},
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
                            className={`chart-container ${isZoomed ? "col-12 zoomed" : isHidden ? "d-none" : "col-md-6"}`}
                        >
                            {cfg.type === "fuel" ? (
                                <FuelChart delayIndex={i} />
                            ) : cfg.type === "tripCost" ? (
                                <TripCostChart delayIndex={i} />
                            ) : cfg.type === "tripCost" ? (
                                <FuelChart delayIndex={i} />
                            ) : cfg.type === "tripCost"
                            }
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
