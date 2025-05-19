import { useState } from "react";

interface CustomerForm {
  bedrijf: string;
  contactpersoon: string;
  email: string;
  telefoonnummer: string;
  adres: string;
  postcode: string;
  plaatsnaam: string;
}

export const AddCustomer = () => {
  const [postcode, setPostcode] = useState("");
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
  const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;

  const [formData, setFormData] = useState<CustomerForm>({
    bedrijf: "",
    contactpersoon: "",
    email: "",
    telefoonnummer: "",
    adres: "",
    postcode: "",
    plaatsnaam: "",
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

    const adres = `${formData.adres}, ${formData.postcode} ${formData.plaatsnaam}`;

    try {
      await fetch("http://localhost:3000/api/klanten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bedrijf: formData.bedrijf,
          contactpersoon: formData.contactpersoon,
          email: formData.email,
          telefoonnummer: formData.telefoonnummer,
          adres: adres,
        }),
      });

      setFormData({
        bedrijf: "",
        contactpersoon: "",
        email: "",
        telefoonnummer: "",
        adres: "",
        postcode: "",
        plaatsnaam: "",
      });
    } catch (error) {
      console.error("Fout bij opslaan:", error);
    }
  };

  return (
    <div className="container mt-5">
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
                name="bedrijf"
                value={formData.bedrijf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contactpersoon</label>
              <input
                type="name"
                className="form-control"
                name="contactpersoon"
                value={formData.contactpersoon}
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
                name="telefoonnummer"
                value={formData.telefoonnummer}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Straatnaam + huisnummer</label>
              <input
                type="text"
                className="form-control"
                name="adres"
                value={formData.adres}
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
                  className={`small ${
                    postcodeValid ? "text-success" : "text-danger"
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
                name="plaatsnaam"
                value={formData.plaatsnaam}
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
    </div>
  );
};
