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
                                    />
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
