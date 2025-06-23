import React, { useEffect, useState } from "react";
import {
  fetchTotalLoadDegree,
  TotalDegreeResponse,
  TotalDegree,
} from "api/fetchShipmentData";
import { LoadDegreeChart } from "components/charts/LoadDegreeChart";
import "assets/scss/components/tables/ChartTableCard.scss";

export const LoadDegreeInfo: React.FC = () => {
  const [chartData, setChartData] = useState<TotalDegree[]>([]);
  const [filteredChartData, setFilteredChartData] = useState<TotalDegree[]>([]);

  const [sortKey, setSortKey] = useState<"degree">("degree");
  const [asc, setAsc] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalLoadDegree: TotalDegreeResponse =
          await fetchTotalLoadDegree();

        console.warn(totalLoadDegree);
        if (totalLoadDegree.message != null) {
          setError(totalLoadDegree.message);
        } else {
          setChartData(totalLoadDegree.data);
          setFilteredChartData(totalLoadDegree.data);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = chartData;

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
      let first = a[sortKey];
      let second = b[sortKey];

      if (asc) {
        return first < second ? 1 : -1;
      } else {
        return first > second ? 1 : -1;
      }
    });

    setFilteredChartData(filtered);
  }, [searchTerm, sortKey, asc]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
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
          ></input>
          <select className="form-select" onChange={(e) => handleSortChange(e)}>
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
