import { useEffect, useState } from "react";
import { Popup } from "../misc/Popup";
import {
  EditedEmployee,
  EmployeeFormModal,
} from "components/misc/EmployeeFormModal";
interface Employee {
  id: number;
  name: string;
  type: string;
  email: string;
  available: boolean;
  VehicleId?: number;
  CreatedAt: string;
}

interface EmployeeApiResponse {
  data: Employee[];
  message: string;
}

export const Employees = () => {
  const [currentEmployees, setEmployees] = useState<Employee[]>();
  const [error, SetError] = useState<any>("");
  const [deleted, setDeleted] = useState<boolean>(false);
  const [showEmployeesForm, setShowEmployeesForm] = useState<boolean>(false);
  const [Id, setId] = useState<number>(-1);
  const [formData, setFormData] = useState<EditedEmployee>({
    name: "",
    role: "",
    email: "",
    vehicleId: -1,
  });

  const HandleEdit = (employee: Employee) => {
    console.log(employee.id);
    setId(employee.id);
    setFormData({
      name: employee.name,
      role: employee.type,
      email: employee.email,
      vehicleId: employee.VehicleId,
    });
    setShowEmployeesForm(true);
  };

  const HandleDelete = async (Id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medewerkers/${Id}`,
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

      setEmployees((prev) => prev?.filter((employee) => employee.id !== Id));
    } catch (error) {
      SetError("Fout opgetreden tijdens het verwijderen.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/medewerkers");
        if (response.ok) {
          const employees: EmployeeApiResponse = await response.json();
          console.log(employees);
          setEmployees(employees.data);
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
                    {currentEmployees?.map((e: Employee) => (
                      <tr key={e.id}>
                        <td>{e.name}</td>
                        <td>{e.type}</td>
                        <td>{e.email}</td>
                        <td>
                          <button onClick={() => HandleDelete(e.id)}>
                            <i className="fas fa-user-minus me-2">
                              <span className="ms-2">verwijderen</span>
                            </i>
                          </button>
                        </td>
                        <td>
                          <button>
                            <i
                              className="fa-solid fa-user-pen"
                              onClick={() => {
                                console.log("Employee in list: ");
                                console.log(e as Employee);

                                HandleEdit(e);
                              }}
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
      <EmployeeFormModal
        isVisible={showEmployeesForm}
        employeeId={Id}
        initialFormData={formData}
        onClose={() => setShowEmployeesForm(false)}
      />
    </div>
  );
};
