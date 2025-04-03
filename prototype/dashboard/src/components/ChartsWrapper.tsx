// This component is meant to act as a wrapper for all four charts on the main page

import { GenericChart } from "./GenericChart";

const chartContents = [
    { title: "Barchart top left #1", chartId: "chart1", type: "horizontalBar" },
    { title: "Barchart top left #2", chartId: "chart2", type: "verticalBar" },
    { title: "Barchart top left #3", chartId: "chart3", type: "placeholder" },
    { title: "Barchart top left #4", chartId: "chart4", type: "placeholder" },
];

export const ChartsWrapper = () => {
    return (
        <section className="charts-wrapper container-fluid">
            <div className="chart-grid row g-4">
                {chartContents.map((content, i) => (
                    <div className="col-md-6" key={content.chartId}>
                        <GenericChart
                            title={content.title}
                            subtitle="Pretitel"
                            chartId={content.chartId}
                            chartType={content.type as any}
                            delayIndex={i}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
