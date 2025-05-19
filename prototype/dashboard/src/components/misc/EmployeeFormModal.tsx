import { useState } from "react";

export interface EditedEmployee {
  name: string;
  role: string;
  email: string;
  vehicleId?: number;
}

interface EditEmployeePopupProps {
  isVisible: boolean;
  employeeId: number;
  initialFormData: EditedEmployee;
  onClose: () => void;
}

export const EmployeeFormModal: React.FC<EditEmployeePopupProps> = ({
  isVisible,
  employeeId,
  initialFormData,
  onClose,
}) => {
  const [formData, setFormData] = useState<EditedEmployee>(initialFormData);
  if (!isVisible) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/medewerkers/${employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
      }
    } catch (err) {
      // handle error
    } finally {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-background" />
      <div
        className="modal show d-block modal-wrapper"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content custom-modal-content bg-opacity-30 backdrop-blur-sm">
            <div className="d-flex justify-content-center align-items-center flex-column mt-5">
              <h1 className="text-center mb-4">Medewerker bewerken</h1>
              <form onSubmit={(e) => HandleSubmit(e)} className="w-50">
                <div className="mb-3">
                  <label className="form-label">Naam</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="type" required>
                    <option value="">Selecteer type</option>
                    <option value="chauffeur">Chauffeur</option>
                    <option value="planner">Planner</option>
                    <option value="administratief medewerker">
                      Administratief medewerker
                    </option>
                    <option value="overig">Overig</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Opslaan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
