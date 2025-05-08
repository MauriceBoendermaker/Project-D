import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
interface Employee {
  medewerker_id: number;
  naam: string;
  type: string;
  email: string;
  beschikbaar: boolean;
  voertuig_id?: number | null;
  created_at: string;
}

export const Employees = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentEmployees, setEmployees] = useState<Employee[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, SetError] = useState<any>("");

  const HandleDelete = async (medewerker_id: number) => {
    try {
      await fetch(`http://localhost:3000/api/medewerkers/${medewerker_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmployees((prev) =>
        prev?.filter((employee) => employee.medewerker_id !== medewerker_id)
      );
    } catch (error) {
      SetError("Fout opgetreden tijdens het verwijderen.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/medewerkers");
        if (response.ok) {
          const employees: Employee[] = await response.json();
          setEmployees(employees);
        } else {
          SetError("message" in response && response.message);
        }
      } catch {
        SetError("Fout opgetreden tijdenst het ophalen van de data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <h2 className="mb-0">Medewerkerslijst</h2>
        <a
          className="btn d-flex align-items-center"
          href="/admin/voeg-medewerker-toe"
        >
          <i className="fas fa-user-plus me-2"></i>
          Nieuwe medewerker
        </a>
        </div>
        <div className="employees-table">
        <div className="table-section">
          <div className="overflow-x-auto">
          <table style={{ width: "100%" }}>
            <thead>
            <tr>
              <th>Naam</th>
              <th>Rol</th>
              <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {currentEmployees?.map((e) => (
              <tr key={e.medewerker_id}>
              <td>{e.naam}</td>
              <td>{e.type}</td>
              <td>{e.email}</td>
              <td>
                <button onClick={() => HandleDelete(e.medewerker_id)}>
                <i className="fas fa-user-minus me-2">
                  verwijderen
                </i>
                </button>
              </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};
