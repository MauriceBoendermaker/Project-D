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
    const [voertuigenData, setVoertuigenData] = useState<Voertuig[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [tripData, setTripData] = useState<Trip[]>([]);

    useEffect(() => {
        const getTripData = async () => {
            try {
            const data = await fetchTripData();
            setTripData(data);
            } catch (err: any) {
            setError(err.message);
            }
        };
        getTripData();
        console.log(JSON.stringify(tripData))
    },[]);

    return (
        <div className="chart-table-card">
            <div className="chart-section">
                <FuelChart />
            </div>
            <div className="table-section">
                <h2>Brandstofverbruik per rit</h2>
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
                            {tripData.map((rit) => (
                                <tr key={rit.id}>
                                    <td>RIT-{rit.id}</td>
                                    <td>TRK-{rit.vehicleId}</td>
                                    <td>{rit.date}</td>
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
