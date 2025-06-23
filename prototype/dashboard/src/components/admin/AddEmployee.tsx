import { useEffect, useState } from "react";
import { Popup } from "../misc/Popup";
import { useNavigate } from "react-router-dom";

interface EmployeeForm {
  name: string;
  type: string;
  email: string;
  beschikbaar: boolean;
}

export const AddEmployee = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmployeeForm>({
    name: "",
    type: "",
    email: "",
    beschikbaar: true,
  });

  const navigate = useNavigate();

  const handleNavigate = () => navigate("/admin/Medewerkers");
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
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/medewerkers/toevoegen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 201) {
        setFormData({
          name: "",
          type: "",
          email: "",
          beschikbaar: true,
        });
        setAdded(true);
      } else {
        console.error(`foutcode bij medewerker toevoegen: ${response.status}`);
        setError(`foutcode bij medewerker toevoegen: ${response.status}`);
      }
    } catch (error) {
      setError("Fout opgetreden bij het toevoegen bij de medewerker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <a className="btn d-flex align-items-center" href="/admin/Medewerkers">
        <i className="fa-solid fa-arrow-left"></i>
        <span className="ms-2">Terug naar overzicht</span>
      </a>
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
                name="name"
                value={formData.name}
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

            <button type="submit" className="btn-primary" disabled={loading}>
              Toevoegen
            </button>
          </form>
        </div>

        <Popup
          title={
            error.length > 0
              ? "Medewerker toevoegen mislukt"
              : "Medewerker toegevoegd!"
          }
          body={
            error.length > 0
              ? error
              : "De medewerker is succesvol toegevoegd. Bekijk uw mail inbox voor een wachtwoord."
          }
          isVisible={error.length > 0 || added}
          onFirstBtnClick={() => {
            setAdded(false);
            setError("");
          }}
          onSecondBtnClick={handleNavigate}
          firstButton="Sluiten"
          secondButton="Terug naar het overzicht"
        />
      </div>
    </div>
  );
};
