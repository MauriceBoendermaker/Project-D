// // This component is meant to act as a wrapper for all four charts on the main page

import { GenericChart } from "./GenericChart";

export const ChartsWrapper = () => {
    return (
        <section className="charts-wrapper container-fluid">
            <div className="chart-grid row g-4">
                <div className="col-md-6">
                    <GenericChart
                        title="Barchart top left #1"
                        subtitle="Pretitel"
                        chartId="chart1"
                        chartType="horizontalBar"
                    />
                </div>
                <div className="col-md-6">
                    <GenericChart
                        title="Barchart top left #2"
                        subtitle="Pretitel"
                        chartId="chart2"
                        chartType="verticalBar"
                    />
                </div>
                <div className="col-md-6">
                    <GenericChart
                        title="Barchart top left #3"
                        subtitle="Pretitel"
                        chartId="chart3"
                        chartType="placeholder"
                    />
                </div>
                <div className="col-md-6">
                    <GenericChart
                        title="Barchart top left #4"
                        subtitle="Pretitel"
                        chartId="chart4"
                        chartType="placeholder"
                    />
                </div>
            </div>
        </section>
    );
};
