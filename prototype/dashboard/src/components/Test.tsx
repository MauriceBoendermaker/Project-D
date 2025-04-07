import {
  fetchTotalLoadDegree,
  TotalDegree,
  TotalDegreeResponse,
} from "api/fetchShipmentData";
import React, { useEffect, useState } from "react";

type xAxisData = {
  data: string[];
};
type Series = {
  data: number[];
};
type chartData = xAxisData & Series;
export const Test = () => {
  const [LoadDegreeData, setLDData] = useState<TotalDegree[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTLD = async () => {
      try {
        const response: TotalDegreeResponse = await fetchTotalLoadDegree();

        if ("message" in response) {
          setError(response.message);
        } else {
          setLDData(response.response);
        }
      } catch (e) {
        setError(`Unexpected error: ${e}`);
      }
    };

    fetchTLD();
  }, []);

//   const xData: xAxisData = {data: }

  return (
    <div>
      Error: {error}
      <div>
        data:
        <ul>
          {LoadDegreeData?.map((TLD) => {
            return (
              <li key={TLD.shipmentId}>
                Load Degree of Shipment {TLD.shipmentId}: {TLD.loadDegree * 100}
                %
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
