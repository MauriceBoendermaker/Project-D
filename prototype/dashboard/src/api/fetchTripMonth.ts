export const mostCommonVehicleId = (trips: Trip[]): string | null => {
  const frequencyMap: Record<string, number> = {};

  for (const trip of trips) {
    frequencyMap[trip.vehicleId] = (frequencyMap[trip.vehicleId] || 0) + 1;
  }

  let maxCount = 0;
  let mostFrequent: string | null = null;

  for (const [vehicleId, count] of Object.entries(frequencyMap)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequent = vehicleId;
    }
  }

  return mostFrequent;
};

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

export const averageSpeed = (trips: Trip[]): number => {
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distanceKm, 0);
  const totalTime = trips.reduce((sum, trip) => sum + trip.time/60, 0);

  return totalTime > 0 ? totalDistance / totalTime : 0;
};