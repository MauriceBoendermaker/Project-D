import { useState } from "react";

export interface EditedEmployee {
  name: string;
  type: string;
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
      console.log(employeeId);
      const response = await fetch(
        `http://localhost:3000/api/medewerkers?Id=${employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        onClose();
      }
    } catch (err) {
      onClose();
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
            <div className="modal-header">
              <h5 className="modal-title mb-0">Medewerker bewerken</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body d-flex justify-content-center align-items-center">
              <form onSubmit={HandleSubmit} className="w-75">
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
                  <select
                    className="form-select"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                  >
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
