import { useState, useEffect } from "react";
import { Popup } from "../misc/Popup";

interface CustomerForm {
  company: string;
  contactperson: string;
  email: string;
  telephoneNumber: string;
  address: string;
  zipCode: string;
  location: string;
}

export const AddCustomer = () => {
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
  const [error, setError] = useState<any>("");
  const [added, setAdded] = useState<boolean>(false);
  const [manualCityOverride, setManualCityOverride] = useState(false);

  const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;

  const [formData, setFormData] = useState<CustomerForm>({
    company: "",
    contactperson: "",
    email: "",
    telephoneNumber: "",
    address: "",
    zipCode: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "zipCode") {
      const formatted = value.toUpperCase();
      if (formatted.trim() === "") {
        setPostcodeValid(null);
      } else {
        setPostcodeValid(postcodeRegex.test(formatted));
      }
      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (
        formData.address &&
        postcodeRegex.test(formData.zipCode) &&
        !manualCityOverride
      ) {
        try {
          const query = `${formData.address}, ${formData.zipCode}, Nederland`;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}`,
            {
              headers: {
                "User-Agent": "ELafeberTransport/1.0 (mauriceboendermaker@gmail.com)",
              },
            }
          );
          const data = await response.json();

          if (data.length > 0) {
            const address = data[0].address;
            const city =
              address.city || address.town || address.village || address.hamlet;

            if (city) {
              setFormData((prev) => ({
                ...prev,
                location: city,
              }));
            }
          }
        } catch (err) {
          console.error("Fout bij ophalen plaatsnaam:", err);
        }
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [formData.address, formData.zipCode, manualCityOverride]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/klanten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.company,
          contactperson: formData.contactperson,
          email: formData.email,
          telephoneNumber: formData.telephoneNumber,
          address: formData.address,
          zipCode: formData.zipCode,
          location: formData.location
        }),
      });

      if (response.status === 201) {
        setAdded(true);
        setFormData({
          company: "",
          contactperson: "",
          email: "",
          telephoneNumber: "",
          address: "",
          zipCode: "",
          location: "",
        });
      } else {
        setError(
          "message" in response
            ? response.message
            : "Fout opgetreden bij het toevoegen van de medewerker"
        );
      }
    } catch (error) {
      setError("Fout opgetreden bij het toevoegen van de medewerker");
    }
  };

  return (
    <div className="container mt-5">
      <a className="btn d-flex align-items-center" href="/klanten/overzicht">
        <i className="fa-solid fa-arrow-left"></i>
        <span className="ms-2">Terug naar overzicht</span>
      </a>
      <div className="row">
        <div className="col-md-6">
          <h2>Nieuwe klant toevoegen</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Klant ID</label>
              <input
                type="number"
                className="form-control"
                placeholder="Automatisch gegenereerd"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bedrijf</label>
              <input
                type="company"
                className="form-control"
                name="company"
                placeholder="Bijv. Lafeber B.V."
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contactpersoon</label>
              <input
                type="name"
                className="form-control"
                name="contactperson"
                placeholder="Bijv. John Doe"
                value={formData.contactperson}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Bijv. example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Telefoonnummer</label>
              <input
                type="tel"
                className="form-control"
                name="telephoneNumber"
                placeholder="Bijv. 0612345678"
                value={formData.telephoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Straatnaam + huisnummer</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                placeholder="Bijv. Dorpsstraat 1"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Postcode</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Bijv. 1234 AB"
                required
              />
              {postcodeValid !== null && (
                <div
                  className={`small ${postcodeValid ? "text-success" : "text-danger"
                    }`}
                >
                  {postcodeValid
                    ? "✓ Geldige postcode"
                    : "✗ Ongeldige postcode"}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Plaatsnaam</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  placeholder=""
                  onChange={handleChange}
                  readOnly={!manualCityOverride}
                  disabled={!manualCityOverride}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setManualCityOverride(!manualCityOverride)}
                >
                  {manualCityOverride ? "Automatisch" : "Handmatig"}
                </button>
              </div>
              {!manualCityOverride && (
                <small className="text-muted">
                  Wordt automatisch ingevuld op basis van adres en postcode.
                </small>
              )}
            </div>

            <button type="submit" className="btn-primary">
              Toevoegen
            </button>
          </form>
        </div>
      </div>
      <Popup
        title={error.length > 0 ? "Toevoegen mislukt" : "Klant toegevoegd!"}
        body={error.length > 0 ? error : "Klant was succesvol toegevoegd"}
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