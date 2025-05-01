import React, { useEffect, useState } from "react";
import { TripCostChart } from "components/charts/TripCostChart";
import "assets/scss/components/tables/ChartTableCard.scss";


export const CostChartInfo: React.FC = () => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKostenData = async () => {
            try {
                const voertuigenResponse = await fetch("http://localhost:3000/api/brandstof/voertuigen");
                if (!voertuigenResponse.ok) throw new Error("Fout bij ophalen voertuigen");

                const voertuigen = await voertuigenResponse.json();
                const kostenData: any[] = [];

                for (const voertuig of voertuigen) {
                    for (const rit of voertuig.ritten) {
                        const kostenResponse = await fetch(
                            `http://localhost:3000/api/brandstof/kosten/${voertuig.voertuig_id}/${rit.rit_id}`
                        );
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
    return (
        <div className="chart-table-card">
            <div className="chart-section">
                <TripCostChart />
            </div>
            <div className="table-section">
                <h2>Kosten per rit</h2>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Kosten</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((item) => (
                                <tr key={item.label}>
                                    <td>{item.label}</td>
                                    <td>{item.kosten}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}