import { Popup } from "components/misc/Popup";
import { useState } from "react";

interface VehicleForm {
  licensePlate: string;
  brand: string;
  model: string;
  brandstof_type: string;
  max_capaciteit: number;
}

export const AddVehicle = () => {
  const [formData, setFormData] = useState<VehicleForm>({
    licensePlate: "",
    brand: "",
    model: "",
    brandstof_type: "",
    max_capaciteit: 0,
  });

  const [added, setAdded] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [kentekenValid, setKentekenValid] = useState<boolean | null>(null);

  const kentekenRegex =
    /^(?:\d{2}-[A-Z]{2}-[A-Z]{2}|\d{2}-[A-Z]{3}-\d{1}|\d{1}-[A-Z]{3}-\d{2}|[A-Z]{2}-\d{3}-[A-Z]{1}|[A-Z]{1}-\d{3}-[A-Z]{2}|[A-Z]{3}-\d{2}-[A-Z]{1})$/i;

  const formatKenteken = (input: string) => {
    const clean = input.replace(/[^A-Z0-9]/gi, "").toUpperCase();

    if (/^\d{2}[A-Z]{2}[A-Z]{2}$/.test(clean)) {
      return (
        clean.slice(0, 2) + "-" + clean.slice(2, 4) + "-" + clean.slice(4, 6)
      );
    }
    if (/^\d{2}[A-Z]{3}\d{1}$/.test(clean)) {
      return (
        clean.slice(0, 2) + "-" + clean.slice(2, 5) + "-" + clean.slice(5, 6)
      );
    }
    if (/^\d{1}[A-Z]{3}\d{2}$/.test(clean)) {
      return (
        clean.slice(0, 1) + "-" + clean.slice(1, 4) + "-" + clean.slice(4, 6)
      );
    }
    if (/^[A-Z]{2}\d{3}[A-Z]{1}$/.test(clean)) {
      return (
        clean.slice(0, 2) + "-" + clean.slice(2, 5) + "-" + clean.slice(5, 6)
      );
    }
    if (/^[A-Z]{1}\d{3}[A-Z]{2}$/.test(clean)) {
      return (
        clean.slice(0, 1) + "-" + clean.slice(1, 4) + "-" + clean.slice(4, 6)
      );
    }
    if (/^[A-Z]{3}\d{2}[A-Z]{1}$/.test(clean)) {
      return (
        clean.slice(0, 3) + "-" + clean.slice(3, 5) + "-" + clean.slice(5, 6)
      );
    }

    return clean;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "max_capaciteit"
        ? parseInt(value)
        : name === "licensePlate"
        ? formatKenteken(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (name === "licensePlate") {
      const formatted = formatKenteken(value);
      setKentekenValid(
        formatted.trim() !== "" && kentekenRegex.test(formatted)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kentekenRegex.test(formData.licensePlate)) {
      console.log(formData.licensePlate);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/voertuigen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status == 201) {
        setFormData({
          licensePlate: "",
          brand: "",
          model: "",
          brandstof_type: "",
          max_capaciteit: 0,
        });

        setKentekenValid(null);

        setAdded(true);
      } else {
        setError(
          "message" in response
            ? error
            : "Fout opgetreden bij het toevoegen van het voertuig"
        );
      }
    } catch (error) {
      setError("Fout opgetreden bij het toevoegen van het voertuig");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Nieuw voertuig toevoegen</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Voertuig ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Automatisch gegenereerd"
                disabled
              />
            </div>

            <div className="mb-1">
              <label className="form-label">Kenteken</label>
              <input
                type="text"
                className="form-control"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                placeholder="Bijv. 9-XXX-99"
                required
              />
            </div>

            {kentekenValid !== null && (
              <div
                className={`mb-3 small ${
                  kentekenValid ? "text-success" : "text-danger"
                }`}
              >
                {kentekenValid ? "✓ Geldig kenteken" : "✗ Ongeldig kenteken"}
              </div>
            )}

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Merk</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  className="form-control"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Brandstoftype</label>
              <select
                className="form-select"
                name="brandstof_type"
                value={formData.brandstof_type}
                onChange={handleChange}
                required
              >
                <option value="">Selecteer brandstof</option>
                <option value="Diesel">Diesel</option>
                <option value="Benzine">Benzine</option>
                <option value="Elektrisch">Elektrisch</option>
                <option value="Hybride">Hybride</option>
                <option value="Anders">Anders</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Maximale capaciteit (kg)</label>
              <input
                type="number"
                min="0"
                className="form-control"
                name="max_capaciteit"
                value={formData.max_capaciteit}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Toevoegen
            </button>
          </form>
        </div>
      </div>
      <Popup
        title={error.length > 0 ? "Toevoegen mislukt" : "Voertuig toegevoegd!"}
        body={error.length > 0 ? error : "Voertuig was succesvol toegevoegd"}
        firstButton="Sluiten"
        isVisible={error.length > 0 || added}
        onFirstBtnClick={() => {
          setError("");
          setAdded(false);
        }}
      />
    </div>
  );
};
