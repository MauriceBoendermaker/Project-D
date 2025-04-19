import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export const FuelChart: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/brandstof/voertuigen', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Process data to calculate values
    const processedData = data ? data.map((voertuig: any) => {
        const gemiddeldeAfstand = Math.round((voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.afstand_km, 0) / voertuig.ritten.length) * 10) / 10;
        const gemiddeldeBrandstof = Math.round((voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.brandstof_verbruik_l, 0) / voertuig.ritten.length) * 10) / 10;

        return {
            voertuig_id: voertuig.voertuig_id,
            gemiddeldeAfstand,
            gemiddeldeBrandstof,
        };
    }) : [];

    const chartOptions = {
        title: {
            text: 'Brandstof verbruik per voertuig',
        },
        tooltip: {},
        legend: {
            data: ['Gemiddelde Afstand in km', 'Gemiddelde Brandstof in L',
                ],
        },
        xAxis: {
            type: 'category',
            data: processedData.map((item: any) => item.voertuig_id),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Gemiddelde Afstand in km',
                type: 'bar',
                data: processedData.map((item: any) => item.gemiddeldeAfstand),
            },
            {
                name: 'Gemiddelde Brandstof in L',
                type: 'bar',
                data: processedData.map((item: any) => item.gemiddeldeBrandstof),
            },
        ],
    };

    return (
        <div>
            {data ? (
                <ReactECharts option={chartOptions} />
            ) : (
                <div>Loading chart...</div>
            )}
        </div>
    );
};

