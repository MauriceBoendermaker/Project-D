// This component is meant to act as a wrapper for all four charts on the main page

import { useState, useEffect } from "react";
import { GenericChart } from "./GenericChart";

export const ChartsWrapper = () => {

    const [zoomedChart, setZoomedChart] = useState<number | null>(null);

    const chartConfigs = [
        { title: "Barchart #1", id: "chart1", type: "horizontalBar" },
        { title: "Barchart #2", id: "chart2", type: "verticalBar" },
        { title: "Barchart #3", id: "chart3", type: "placeholder" },
        { title: "Barchart #4", id: "chart4", type: "placeholder" },
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
                            className={`chart-container ${isZoomed ? "col-12 zoomed" : isHidden ? "d-none" : "col-md-6"
                                }`}
                        >
                            <GenericChart
                                title={cfg.title}
                                subtitle="Pretitel"
                                chartId={cfg.id}
                                chartType={cfg.type as any}
                                delayIndex={i}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
