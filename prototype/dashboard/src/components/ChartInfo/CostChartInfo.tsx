import React, { useEffect, useState } from "react";
import { TripCostChart } from "components/charts/TripCostChart";
import "assets/scss/components/tables/ChartTableCard.scss";

export interface TripCost {
  tripId: number;
  vehicleId: number;
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
              {chartData.map((tripcost) => (
                <tr key={crypto.randomUUID()}>
                  <td>TRK-{tripcost.vehicleId}</td>
                  <td>RIT-{tripcost.tripId}</td>
                  <td>
                    {new Date("2024-06-01").toLocaleDateString("nl-NL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>€ {tripcost.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
