import React, { useEffect, useState } from "react";
import { fetchTotalLoadDegree, TotalDegreeResponse, TotalDegree } from "api/fetchShipmentData";
import { LoadDegreeChart } from "components/charts/LoadDegreeChart";
import "assets/scss/components/tables/ChartTableCard.scss";

export const LoadDegreeInfo: React.FC = () => {
    const [chartData, setChartData] = useState<TotalDegree[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalLoadDegree: TotalDegreeResponse = await fetchTotalLoadDegree();
                if ("message" in totalLoadDegree) {
                    setError(totalLoadDegree.message);
                } else {
                    setChartData(totalLoadDegree.response);
                }
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-table-card">
            <div className="chart-section">
                <LoadDegreeChart />
            </div>
            <div className="table-section">
                <h2>Beladingsgraad per zending</h2>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Zending ID</th>
                                <th>Beladingsgraad (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chartData.map((item) => (
                                <tr key={item.shipmentId}>
                                    <td>{item.shipmentId}</td>
                                    <td>{(item.loadDegree * 100).toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
