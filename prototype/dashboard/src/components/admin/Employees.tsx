import { useEffect, useState } from "react";
import { Popup } from "../misc/Popup";
import { EmployeeFormModal } from "components/misc/EmployeeFormModal";
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
  const [currentEmployees, setEmployees] = useState<Employee[]>();
  const [error, SetError] = useState<any>("");
  const [deleted, setDeleted] = useState<boolean>(false);
  const [showEmployeesForm, setShowEmployeesForm] = useState<boolean>(false);

  const HandleEdit = () => {
    setShowEmployeesForm(true);
  };

  const HandleDelete = async (medewerker_id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medewerkers/${medewerker_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        SetError(
          "message" in response
            ? response.message
            : "Fout opgetreden tijdens het verwijderen."
        );
      } else {
        setDeleted(true);
      }

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
        const response = await fetch("http://localhost:3000/api/medewerkers");
        if (response.ok) {
          const employees: Employee[] = await response.json();
          setEmployees(employees);
        } else {
          SetError("message" in response && response.message);
        }
      } catch {
        SetError("Fout opgetreden tijdens het ophalen van de data.");
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
                              <span className="ms-2">verwijderen</span>
                            </i>
                          </button>
                        </td>
                        <td>
                          <button>
                            <i
                              className="fa-solid fa-user-pen"
                              onClick={() => HandleEdit()}
                            >
                              <span className="ms-2">Bewerken</span>
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
      <Popup
        title={
          error.length > 0 ? "Verwijderen mislukt" : "Medewerker verwijderd!"
        }
        body={error.length > 0 ? error : "Medewerker was succesvol verwijderd"}
        firstButton="Sluiten"
        isVisible={error.length > 0 || deleted}
        onFirstBtnClick={() => {
          setDeleted(false);
          SetError("");
        }}
      />
      <EmployeeFormModal isVisible={showEmployeesForm} />
    </div>
  );
};
