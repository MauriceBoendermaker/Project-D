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
  const [filteredChartData, setFilteredChartData] = useState<TripCost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
            setFilteredChartData(json.data);
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

  useEffect(() => {
    let filtered = chartData;

    if (startDate && endDate) {
      filtered = filtered.filter((trip) => {
        const tripDate = new Date(trip.date);
        return (
          tripDate.getTime() >= startDate.getTime() &&
          tripDate.getTime() <= endDate.getTime()
        );
      });
    }

    if (searchTerm.trim() !== "") {
      const term = parseInt(
        searchTerm.toUpperCase().includes("RIT-")
          ? searchTerm.split("-")[1]
          : searchTerm,
        10
      );

      if (!isNaN(term)) {
        filtered = filtered.filter((t) => t.tripId === term);
      }
    }

    setFilteredChartData(filtered);
  }, [searchTerm, startDate, endDate, chartData]);
  return (
    <div className="chart-table-card">
      <div className="chart-section">
        <TripCostChart delayIndex={0} data={filteredChartData} />
      </div>
      <div className="table-section">
        <h2>Kosten per rit</h2>
        <div className="input-group">
          <input
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek de rit RIT-"
          ></input>

          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={(e) => setStartDate(e.target.valueAsDate)}
              required
            />
            ___
            <input
              type="date"
              className="form-control"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={(e) => setEndDate(e.target.valueAsDate)}
              required
            />
          </div>
        </div>

        {/* <div
          className="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input
            type="checkbox"
            className="btn-check"
            id="btncheck1"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" htmlFor="btncheck1">
            Checkbox 1
          </label>
        </div> */}

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
              {filteredChartData.map((tripcost) => (
                <tr key={crypto.randomUUID()}>
                  <td>TRK-{tripcost.vehicleId}</td>
                  <td>RIT-{tripcost.tripId}</td>
                  <td>
                    {new Date(tripcost.date).toLocaleDateString("nl-NL", {
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
