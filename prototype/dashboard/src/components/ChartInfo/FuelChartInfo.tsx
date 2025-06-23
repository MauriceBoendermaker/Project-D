import React, { useEffect, useState } from "react";
import { FuelChart } from "components/charts/FuelUsageChart";
import "assets/scss/components/tables/ChartTableCard.scss";
import { Trip, fetchTripData } from "api/fetchTripData";

type Rit = {
  rit_id: string;
  datum: string;
  afstand_km: number;
  brandstof_verbruik_l: number;
};

type Voertuig = {
  voertuig_id: string;
  ritten: Rit[];
};

export const FuelUsageInfo: React.FC = () => {
  const [tripData, setTripData] = useState<Trip[]>([]);
  const [filteredTripData, setFilteredTripData] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [voertuigenData, setVoertuigenData] = useState<Voertuig[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTripData = async () => {
      try {
        const data = await fetchTripData();
        setTripData(data);
        setFilteredTripData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    getTripData();
    console.log(JSON.stringify(tripData));
  }, []);

  useEffect(() => {
    let filtered = tripData;

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
        filtered = filtered.filter((t) => t.id === term);
      }
    }

    setFilteredTripData(filtered);
  }, [searchTerm, startDate, endDate, tripData]);
  return (
    <div className="chart-table-card">
      <div className="chart-section">
        <FuelChart delayIndex={0} chartData={filteredTripData} />
      </div>
      <div className="table-section">
        <h2>Brandstofverbruik per rit</h2>
        <div className="input-group">
          <input
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek de rit RIT-"
          ></input>
        </div>
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
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Rit ID</th>
                <th>Voertuig ID</th>
                <th>Datum</th>
                <th>Afstand (km)</th>
                <th>Brandstof (L)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTripData.map((rit) => (
                <tr key={rit.id}>
                  <td>RIT-{rit.id}</td>
                  <td>TRK-{rit.vehicleId}</td>
                  <td>
                    {new Date(rit.date).toLocaleDateString("nl-NL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{rit.distanceKm} km</td>
                  <td>{rit.fuelUsage} L</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
