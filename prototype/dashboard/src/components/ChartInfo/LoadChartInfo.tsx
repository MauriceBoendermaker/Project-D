import React, { useEffect, useState } from "react";
import {
  fetchTotalLoadDegree,
  TotalDegreeResponse,
  TotalDegree,
} from "api/fetchShipmentData";
import { LoadDegreeChart } from "components/charts/LoadDegreeChart";
import "assets/scss/components/tables/ChartTableCard.scss";

export const LoadDegreeInfo: React.FC = () => {
  const [filteredChartData, setFilteredChartData] = useState<TotalDegree[]>([]);
  const [sortKey, setSortKey] = useState<"degree">("degree");
  const [asc, setAsc] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: TotalDegreeResponse = await fetchTotalLoadDegree();
        if (response.message) {
          setError(response.message);
        } else {
          let data = [...response.data];

          // Apply default sort
          data.sort((a, b) => a.degree - b.degree);

          setFilteredChartData(data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const response: TotalDegreeResponse = await fetchTotalLoadDegree();
        if (response.message) {
          setError(response.message);
          return;
        }

        let filtered = [...response.data];

        if (searchTerm.trim() !== "") {
          const term = parseInt(
            searchTerm.toUpperCase().includes("RIT-")
              ? searchTerm.split("-")[1]
              : searchTerm,
            10
          );
          if (!isNaN(term)) {
            filtered = filtered.filter((t) => t.shipmentId === term);
          }
        }

        filtered.sort((a, b) => {
          const first = a[sortKey];
          const second = b[sortKey];
          return asc ? first - second : second - first;
        });

        setFilteredChartData(filtered);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchAndFilter();
  }, [searchTerm, sortKey, asc]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case "Beladingsgraad oplopend":
        setSortKey("degree");
        setAsc(true);
        break;
      case "Beladingsgraad aflopend":
        setSortKey("degree");
        setAsc(false);
        break;
    }
  };

  return (
    <div className="chart-table-card">
      <div className="chart-section">
        <LoadDegreeChart delayIndex={0} data={filteredChartData} />
      </div>
      <div className="table-section">
        <div className="input-group">
          <input
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek de zending"
          />
          <select className="form-select" onChange={handleSortChange}>
            <option>Beladingsgraad oplopend</option>
            <option>Beladingsgraad aflopend</option>
          </select>
        </div>
        <h2>Beladingsgraad per zending</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Zending ID</th>
                <th>Beladingsgraad (%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredChartData.map((item) => (
                <tr key={item.shipmentId}>
                  <td>{item.shipmentId}</td>
                  <td>{(item.degree * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
