import React, { useEffect, useState } from "react";
import { StyledChartWrapper } from "../StyledChartWrapper";
import { MONTHLY_NUMBERS_TITLE } from "components/ChartTitles";
import { Trip, fetchTripMonth, mostCommonVehicleId} from "api/fetchTripMonth";

interface MonthlyNumbersProps {
    delayIndex?: number;
    Data: Trip[];
}

export type TripResponse = {
    message: string;
    data: any[];
};

export const MonthlyNumbers: React.FC<MonthlyNumbersProps> = ({ delayIndex = 0, Data = [], }) => {
    const [monthlyData, setmonthlyData] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTripData = async () => {
            if (Data.length > 0) {
                setmonthlyData(Data);
            } else {
                try {
                    const data = await fetchTripMonth();
                    setmonthlyData(data);
                    setLoading(false)
                } catch (err: any) {
                    setError(err.message);
                }
            }
        };
        getTripData();
    }, [Data]);

    return (
        <StyledChartWrapper
            title={
                <a
                    href="http://localhost:5000"
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    {MONTHLY_NUMBERS_TITLE}
                </a>
            }
            delayIndex={delayIndex}
        >
            {loading && <div>Laden van data...</div>}
            {error && <div>Fout: {error}</div>}
            {!loading && !error && monthlyData.length > 0 && (
                <div>
                    <p>Totale ritten: {monthlyData.length}</p>
                    <p>Totale afstand gereden: {monthlyData.reduce((sum, trip) => sum + trip.distanceKm, 0)} KM</p>
                    <p>Meest gebruikte voertuig deze maand: TRK-{mostCommonVehicleId(monthlyData)}</p>
                </div>
            )}
        </StyledChartWrapper>
    );
};
