
export interface Trip {
  id: number;
  vehicleId: number;
  date: string;
  distanceKm: number;
  time: number;
  fuelUsage: number;
  destinationId: number;
  customerId: number;
  driverId: number;
  createdAt: string;
}

export const fetchTripMonth = async () => {
  const response = await fetch("http://localhost:3000/api/brandstof/ritten/");
  if (!response.ok) throw new Error("Network response was not ok");
  const result = await response.json();
  const trips: Trip[] = result.data

  const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const recentTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    return tripDate >= oneMonthAgo;
    });
  return recentTrips;
};