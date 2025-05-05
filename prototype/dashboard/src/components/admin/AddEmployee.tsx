import { useState } from "react";

interface EmployeeForm {
  naam: string;
  type: string;
  email: string;
  beschikbaar: boolean;
}

export const AddEmployee = () => {
  const [formData, setFormData] = useState<EmployeeForm>({
    naam: "",
    type: "",
    email: "",
    beschikbaar: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/medewerkers/toevoegen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201){
        setFormData({
          naam: "",
          type: "",
          email: "",
          beschikbaar: true,
        });
      }
      else{
        console.error(`foutcode bij medewerker toevoegen: ${response.status}`)
      }
    } catch (error) {
      console.error("Fout bij opslaan:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Nieuwe medewerker toevoegen</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Medewerker ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Automatisch gegenereerd"
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Naam</label>
              <input
                type="text"
                className="form-control"
                name="naam"
                value={formData.naam}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
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
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Beschikbaar</label>
              <input
                type="text"
                className="form-control"
                value={formData.beschikbaar ? "Ja" : "Nee"}
                disabled
              />
            </div>

            <button type="submit" className="btn-primary">
              Opslaan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
