import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const FuelChart: React.FC = () => {
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
        const totaleAfstand = voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.afstand_km, 0);
        const totaleBrandstof = voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.brandstof_verbruik_l, 0);
        const gemiddeldVerbruik = Math.round((voertuig.ritten.reduce((sum: number, rit: any) => sum + rit.gemiddeld_verbruik_l_per_100km, 0) / voertuig.ritten.length) * 10) / 10;

        return {
            voertuig_id: voertuig.voertuig_id,
            totaleAfstand,
            totaleBrandstof,
            gemiddeldVerbruik,
        };
    }) : [];

    const chartOptions = {
        title: {
            text: 'Brandstof gebruik per voertuig',
        },
        tooltip: {},
        legend: {
            data: ['Totale Afstand in km', 'Totale Brandstof in L', 'Gemiddeld Verbruik in L'],
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
                name: 'Totale Afstand in km',
                type: 'bar',
                data: processedData.map((item: any) => item.totaleAfstand),
            },
            {
                name: 'Totale Brandstof in L',
                type: 'bar',
                data: processedData.map((item: any) => item.totaleBrandstof),
            },
            {
                name: 'Gemiddeld Verbruik in L',
                type: 'bar',
                data: processedData.map((item: any) => item.gemiddeldVerbruik),
            },
        ],
    };

    return (
        <div>
            <h1>Brandstof gebruik per voertuig</h1>
            {data ? (
                <ReactECharts option={chartOptions} />
            ) : (
                <div>Loading chart...</div>
            )}
        </div>
    );
};

export default FuelChart;
