import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/zending";

export type error = {
  message: string;
};

// Fetch all shipments
export type Zending = {
  Id: number;
  VehicleNumber: string;
  Destination: string;
  MaxCapacityKg: number;
  CurrentLoadKg: number;
  EmptyKilometers: number;
};

export async function fetchAllShipments(): Promise<Zending[]> {
  const response = await fetch(API_URL);
  const data: Zending[] = await response.json();

  return data;
}

// Fetch the max capacity of a certain shipment

type MaxCapacity = { maxCapacity: number };

export async function fetchMaxCapacityAsync(
  shipmentId: number
): Promise<number> {
  try {
    const response = await fetch(
      API_URL + `/maxcapaciteit?ZendingId=${shipmentId}`
    );

    if (!response.ok) {
      console.error(response.json());
      return -1;
    }
    const data: MaxCapacity = await response.json();
    console.log(data);
    return data.maxCapacity;
  } catch (e) {
    console.error(e);
    return -1;
  }
}

// Fetch the loadDegree of a certain shipments (using the Id of the shipment)

type LoadDegree = { loadDegree: number };
export async function fetchLoadDegree(shipmentId: number): Promise<number> {
  try {
    const response = await fetch(
      API_URL + `/beladingsgraad?ZendingId=${shipmentId}`
    );

    if (!response.ok) {
      console.error(response.json());
      return -1;
    }
    const data: LoadDegree = await response.json();
    console.log(data);
    return data.loadDegree;
  } catch (e) {
    console.error(e);
    return -1;
  }
}
// Fetch the average loadDegree of all shipments
export async function fetchAverageLoadDegree(): Promise<number> {
  try {
    const response = await fetch(API_URL + `/beladingsgraad/gemiddeld`);

    if (!response.ok) {
      console.error(response.json());
      return -1;
    }
    const data: LoadDegree = await response.json();
    console.log(data);
    return data.loadDegree;
  } catch (e) {
    console.error(e);
    return -1;
  }
}

// Fetch the total empty miles of all shipments
type EmptyMiles = {
  emptyMiles: number;
};

export async function fetchTotalEmptyMiles(): Promise<number> {
  try {
    const response = await fetch(API_URL + `onbenutte-kilometers`);

    if (!response.ok) {
      console.error(response.json());
      return -1;
    }
    const data: EmptyMiles = await response.json();
    console.log(data);
    return data.emptyMiles;
  } catch (e) {
    console.error(e);
    return -1;
  }
}
// Fetch Total Load Degree
export type TotalDegree = {
  shipmentId: number;
  degree: number;
};

export type TotalDegreeResponse = {
  message: string;
  data: TotalDegree[];
};
export async function fetchTotalLoadDegree(): Promise<TotalDegreeResponse> {
  const response = await fetch(API_URL + "/beladingsgraad/totaal");
  if (response.ok) {
    const data: TotalDegreeResponse = await response.json();
    console.log(data);
    return data;
  } else {
    return { message: "Failed to fetch data", data: [] };
  }
}
