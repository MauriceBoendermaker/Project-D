import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface GenericChartProps {
    title: string;
    subtitle?: string;
    chartId: string;
    chartType: "horizontalBar" | "verticalBar" | "placeholder";
}

export const GenericChart: React.FC<GenericChartProps> = ({
    title,
    subtitle,
    chartId,
    chartType,
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [activeToggle, setActiveToggle] = useState<"monthly" | "annually">("annually");

    useEffect(() => {
        if (!chartRef.current || chartType === "placeholder") return;

        const chart = echarts.init(chartRef.current);

        const options: echarts.EChartsOption =
            chartType === "horizontalBar"
                ? {
                    grid: { left: 120, right: 20, top: 20, bottom: 30 },
                    xAxis: {
                        type: "value",
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: {
                            color: "#999",
                            fontFamily: "Montserrat",
                            fontSize: 12,
                        },
                        splitLine: { lineStyle: { color: "#eee" } },
                    },
                    yAxis: {
                        type: "category",
                        data: [
                            "Metric",
                            "Another metric",
                            "Yet another metric",
                            "Maybe a metric",
                            "Not a metric",
                        ],
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: {
                            color: "#333",
                            fontWeight: 500,
                            fontFamily: "Montserrat",
                            fontSize: 13,
                        },
                    },
                    series: [
                        {
                            type: "bar",
                            data: [121799, 50799, 25567, 5789, 16891],
                            itemStyle: {
                                borderRadius: 6,
                                color: (params: any) =>
                                    params.dataIndex === 0 ? "#9B1C1C" : "#F4BABA",
                            },
                            barWidth: 10,
                            label: {
                                show: true,
                                position: "right",
                                color: "#9B1C1C",
                                fontWeight: 600,
                                fontSize: 13,
                                fontFamily: "Montserrat",
                                formatter: (val: any) =>
                                    new Intl.NumberFormat().format(val.value),
                            },
                        },
                    ],
                    tooltip: { show: false },
                }
                : {
                    grid: { left: 40, right: 20, top: 50, bottom: 40 },
                    xAxis: {
                        type: "category",
                        data: ["2021", "2022", "2023", "2024", "2025"],
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: "#eee" } },
                        axisLabel: {
                            color: "#333",
                            fontFamily: "Montserrat",
                            fontSize: 12,
                        },
                    },
                    yAxis: {
                        type: "value",
                        axisLine: { show: false },
                        splitLine: { lineStyle: { color: "#eee" } },
                        axisLabel: {
                            color: "#999",
                            fontFamily: "Montserrat",
                            fontSize: 12,
                        },
                    },
                    series: [
                        {
                            name: "First metric",
                            type: "bar",
                            data: [2.7e6, 3.1e6, 3.5e6, 1.3e6, 3.9e6],
                            barWidth: 20,
                            itemStyle: {
                                borderRadius: [6, 6, 0, 0],
                                color: "#9B1C1C",
                            },
                        },
                        {
                            name: "Another metric",
                            type: "bar",
                            data: [2.2e6, 2.3e6, 3.0e6, 0.4e6, 2.9e6],
                            barWidth: 20,
                            itemStyle: {
                                borderRadius: [6, 6, 0, 0],
                                color: "#F4BABA",
                            },
                        },
                    ],
                    legend: {
                        icon: "circle",
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 14,
                        right: 10,
                        top: 10,
                        textStyle: {
                            color: "#333",
                            fontFamily: "Montserrat",
                            fontSize: 13,
                        },
                    },
                    tooltip: {
                        trigger: "axis",
                        backgroundColor: "#fff",
                        borderColor: "#eee",
                        borderWidth: 1,
                        textStyle: {
                            color: "#333",
                            fontFamily: "Montserrat",
                        },
                    },
                };

        chart.setOption(options);
        const handleResize = () => chart.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            chart.dispose();
            window.removeEventListener("resize", handleResize);
        };
    }, [chartType, chartId]);

    return (
        <div className="generic-chart p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <p className="text-muted mb-1">{subtitle}</p>
                    <h5 className="mb-0">{title}</h5>
                </div>
                {chartType === "horizontalBar" && (
                    <div className="chart-toggle">
                        <span
                            className={activeToggle === "monthly" ? "active" : ""}
                            onClick={() => setActiveToggle("monthly")}
                        >
                            Monthly
                        </span>
                        <span
                            className={activeToggle === "annually" ? "active" : ""}
                            onClick={() => setActiveToggle("annually")}
                        >
                            Annually
                        </span>
                    </div>
                )}
            </div>
            <div id={chartId} ref={chartRef} style={{ height: "280px", width: "100%" }} />
        </div>
    );
};
