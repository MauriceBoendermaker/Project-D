import React, { useEffect, useState } from "react";
import { TripCostChart } from "components/charts/TripCostChart";
import "assets/scss/components/tables/ChartTableCard.scss";

export interface TripCost {
  tripNumber: string;
  vehicleNumber: string;
  date: string;
  cost: number;
}

export type TotalCostResponse = {
  message: string;
  data: TripCost[];
};

export const CostChartInfo: React.FC = () => {
  const [chartData, setChartData] = useState<TripCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKostenData = async () => {
      try {
        const ApiResponse = await fetch(
          "http://localhost:3000/api/brandstof/totalekosten"
        );

        if (ApiResponse.ok) {
          const json: TotalCostResponse = await ApiResponse.json();
          if (json.message == null) {
            setChartData(json.data);
          } else {
            setError(json.message);
          }
        }
      } catch (e) {
        console.error(e);
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
                <th>Voertuig ID</th>
                <th>Rit ID</th>
                <th>Datum</th>
                <th>Kosten</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item) => (
                <tr key={crypto.randomUUID()}>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.tripNumber}</td>
                  <td>{new Date(item.date).toLocaleDateString("nl-NL")}</td>
                  <td>€ {item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
