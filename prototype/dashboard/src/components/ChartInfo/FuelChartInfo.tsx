import React, { useEffect, useState } from "react";
import { FuelChart } from "components/charts/FuelUsageChart";
import "assets/scss/components/tables/ChartTableCard.scss";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/brandstof/voertuigen");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                // Optional: ensure each voertuig_id is a string for consistency
                const cleaned = data.map((v: any) => ({
                    voertuig_id: v.voertuig_id,
                    ritten: v.ritten.map((r: any) => ({
                        rit_id: r.rit_id,
                        datum: r.datum,
                        afstand_km: r.afstand_km,
                        brandstof_verbruik_l: r.brandstof_verbruik_l,
                    })),
                }));

                setVoertuigenData(cleaned);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const allRitten = voertuigenData.flatMap((voertuig) =>
        voertuig.ritten.map((rit) => ({
            voertuig_id: voertuig.voertuig_id,
            rit_id: rit.rit_id,
            datum: new Date(rit.datum).toLocaleDateString("nl-NL"), // formatted for Dutch
            afstand_km: rit.afstand_km,
            brandstof_l: rit.brandstof_verbruik_l,
        }))
    );

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
                                <th>Voertuig ID</th>
                                <th>Rit ID</th>
                                <th>Datum</th>
                                <th>Afstand (km)</th>
                                <th>Brandstof (L)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRitten.map((rit) => (
                                <tr key={rit.rit_id}>
                                    <td>{rit.voertuig_id}</td>
                                    <td>{rit.rit_id}</td>
                                    <td>{rit.datum}</td>
                                    <td>{rit.afstand_km} km</td>
                                    <td>{rit.brandstof_l} L</td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};
