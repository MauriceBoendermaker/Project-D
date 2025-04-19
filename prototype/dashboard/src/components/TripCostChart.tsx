import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export const TripCostChart: React.FC = () => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKostenData = async () => {
            try {
                const voertuigenResponse = await fetch('http://localhost:3000/api/brandstof/voertuigen');
                if (!voertuigenResponse.ok) throw new Error('Fout bij ophalen voertuigen');

                const voertuigen = await voertuigenResponse.json();

                const kostenData: any[] = [];

                for (const voertuig of voertuigen) {
                    for (const rit of voertuig.ritten) {
                        const kostenResponse = await fetch(`http://localhost:3000/api/brandstof/kosten/${voertuig.voertuig_id}/${rit.rit_id}`);
                        if (kostenResponse.ok) {
                            const tekst = await kostenResponse.text();        

                            const matches = tekst.match(/(\d+)(?=\s*Euro)/);
                            const kosten = matches ? parseFloat(matches[1]) : 0;
                            
                            kostenData.push({
                                label: `${voertuig.voertuig_id} - ${rit.rit_id}`,
                                kosten,
                            });
                            
                        } else {
                            console.warn(`Geen data voor ${voertuig.voertuig_id}/${rit.rit_id}`);
                        }
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
        title: {
            text: 'Benzinekosten per rit',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: chartData.map(item => item.label),
        },
        yAxis: {
            type: 'value',
            name: 'Kosten (Euro)',
        },
        series: [
            {
                name: 'Kosten in Euro',
                type: 'bar',
                data: chartData.map(item => item.kosten),
                itemStyle: {
                    color: '#5470C6',
                },
            },
        ],
    };

    return (
        <div>
            {loading && <div>Laden van data...</div>}
            {error && <div>Fout: {error}</div>}
            {!loading && !error && chartData.length > 0 && (
                <ReactECharts option={chartOptions} style={{ height: '500px' }} />
            )}
        </div>
    );
};

