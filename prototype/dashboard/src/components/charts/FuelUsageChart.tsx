import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { StyledChartWrapper } from "../StyledChartWrapper";

interface FuelChartProps {
    delayIndex?: number;
}

export const FuelChart: React.FC<FuelChartProps> = ({ delayIndex = 0 }) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/brandstof/voertuigen");
                if (!response.ok) throw new Error("Network response was not ok");
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const processedData = data
        ? data.map((voertuig: any) => {
            const gemiddeldeAfstand = Math.round(
                (voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.afstand_km, 0) /
                    voertuig.ritten.length) * 10
            ) / 10;
            const gemiddeldeBrandstof = Math.round(
                (voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.brandstof_verbruik_l, 0) /
                    voertuig.ritten.length) * 10
            ) / 10;

            return {
                voertuig_id: voertuig.voertuig_id,
                gemiddeldeAfstand,
                gemiddeldeBrandstof,
            };
        })
        : [];

    const chartOptions = {
        tooltip: {},
        legend: {
            data: ["Gemiddelde Afstand in km", "Gemiddelde Brandstof in L"],
        },
        xAxis: {
            type: "category",
            data: processedData.map((item: any) => item.voertuig_id),
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: "Gemiddelde Afstand in km",
                type: "bar",
                data: processedData.map((item: any) => item.gemiddeldeAfstand),
                itemStyle: {
                    color: "#95191D",
                    barBorderRadius: [5, 5, 0, 0],
                },
            },
            {
                name: "Gemiddelde Brandstof in L",
                type: "bar",
                data: processedData.map((item: any) => item.gemiddeldeBrandstof),
                itemStyle: {
                    color: "#FFA0A3",
                    barBorderRadius: [5, 5, 0, 0],
                },
            },
        ],
    };

    return (
        <StyledChartWrapper title="Brandstof verbruik per voertuig" delayIndex={delayIndex}>
            {data ? (
                <ReactECharts option={chartOptions} style={{ height: 300, width: "100%" }} />
            ) : (
                <div>Loading chart...</div>
            )}
        </StyledChartWrapper>
    );
};
