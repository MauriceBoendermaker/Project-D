import React, { useEffect, useState } from "react";
interface Employee {
  medewerker_id: number;
  naam: string;
  type: string;
  email: string;
  beschikbaar: boolean;
  voertuig_id?: number | null;
  created_at: string;
}

export const DeleteEmployee = () => {
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
        <div className="col-md-6">
          <h2>Medewerker verwijderen</h2>
          <div>
            {loading && "Aan het laden"}
            {error && error}
          </div>
          <div>
            Naam, Rol, Email
            <ul>
              {currentEmployees?.map((employee) => (
                <div>
                  <li key={employee.medewerker_id}>
                    {employee.naam} {employee.type} {employee.email}
                    <button
                      className="btn-primary"
                      onClick={() => HandleDelete(employee.medewerker_id)}
                    >
                      Verwijderen
                    </button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
