interface EditedEmployee {
  naam: string;
  type: string;
  email: string;
  available: boolean;
  voertuig_id?: number | null;
}

interface EditEmployeePopupProps {
  isVisible: boolean;
  //   employeeId: number;
  //   formData: EditedEmployee;
  //   onChange: (updated: EditedEmployee) => void;
  //   onClose: () => void;
  //   onSubmit: (empId: number, data: EditedEmployee) => void;
}

export const EmployeeFormModal: React.FC<EditEmployeePopupProps> = ({
  isVisible,
  //   employeeId,
  //   formData,
  //   onChange,
  //   onClose,
  //   onSubmit,
}) => {
  if (!isVisible) return null;

  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label">Naam</label>
          <input
            type="text"
            className="form-control"
            name="naam"
            value={"name"}
            required
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
          <input type="email" className="form-control" name="email" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Beschikbaar</label>
          <input type="text" className="form-control" disabled />
        </div>

        <button type="submit" className="btn-primary">
          Toevoegen
        </button>
      </form>
    </>
  );
};
