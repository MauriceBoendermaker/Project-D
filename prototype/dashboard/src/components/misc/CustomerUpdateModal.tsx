import { useState } from "react";

export interface EditedCustomer {
    company: string;
    contactPerson: string;
    email: string;
    telephoneNumber: string;
    address: string;
    zipCode: string;
    location: string;
}

interface EditCustomerPopupProps {
    isVisible: boolean;
    customerId: number;
    initialFormData: EditedCustomer;
    onClose: () => void;
}

export const CustomerFormModal: React.FC<EditCustomerPopupProps> = ({
    isVisible,
    customerId,
    initialFormData,
    onClose,
}) => {
    const [formData, setFormData] = useState<EditedCustomer>(initialFormData);
    const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
    const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;

    if (!isVisible) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (postcodeValid === false) {
            return;
        }
        try {
            console.log(customerId);
            const response = await fetch(
                `http://localhost:3000/api/klanten?Id=${customerId}`,
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
                            <h5 className="modal-title mb-0">Klant bewerken</h5>
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
                                    <label className="form-label">Bedrijf</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company"
                                        placeholder="Bijv. Lafeber"
                                        value={formData.company}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contact Persoon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="contactPerson"
                                        placeholder="Bijv. John Doe"
                                        required
                                        value={formData.contactPerson}
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
                                        required
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
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        placeholder="Bijv. Dorpsstraat 1"
                                        value={formData.address}
                                        required
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
                                        required
                                        onChange={handleChange}
                                        placeholder="Bijv. 1234 AB"
                                    />
                                    {postcodeValid !== null && (
                                        <div
                                            className={`small ${postcodeValid ? "text-success" : "text-danger"}`}
                                        >
                                            {postcodeValid
                                                ? "✓ Geldige postcode"
                                                : "✗ Ongeldige postcode"}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Plaats</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" disabled={postcodeValid === false}>
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
