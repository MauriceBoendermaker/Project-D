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
    const changeChartData = () => {
      if (searchTerm == "") {
        setFilteredChartData(chartData);
      } else {
        const term = parseInt(searchTerm, 10);

        if (!isNaN(term)) {
          const row: TotalDegree | undefined = chartData.find(
            (t) => t.shipmentId == term
          );
          if (row != undefined) {
            setFilteredChartData([row]);
          } else {
            setFilteredChartData(chartData);
            console.log("Rit niet gevonden");
          }
        } else console.log("term is not a number");
      }
    };
    changeChartData();
  }, [searchTerm]);

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
