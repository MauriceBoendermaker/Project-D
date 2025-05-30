import { useState } from "react";
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
  const [postcode, setPostcode] = useState("");
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
  const [error, setError] = useState<any>("");
  const [added, setAdded] = useState<boolean>(false);

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

    if (name === "postcode") {
      const formatted = value.toUpperCase();
      setPostcode(formatted);

      if (formatted.trim() === "") {
        setPostcodeValid(null);
      } else {
        setPostcodeValid(postcodeRegex.test(formatted));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adres = `${formData.address}, ${formData.zipCode} ${formData.location}`;

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
          telephoneNumber: formData.address,
          address: adres,
        }),
      });

      if (response.status == 201) {
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
                name="postcode"
                value={postcode}
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
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                placeholder="Bijv. Rotterdam"
                onChange={handleChange}
              />
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
