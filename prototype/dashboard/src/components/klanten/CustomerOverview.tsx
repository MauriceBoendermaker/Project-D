import { useEffect, useState } from "react";
import { Popup } from "../misc/Popup";
import { EditedCustomer, CustomerFormModal } from "components/misc/CustomerUpdateModal";

interface Customer {
    customerId: number;
    company: string;
    contactperson: string;
    email: string;
    telephoneNumber: string;
    address: string;
    zipcode: string;
    location: string;
}


export const CustomerOverview = () => {
    const [reloadKey, setReloadKey] = useState(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>("");

    const [deleted, setDeleted] = useState<boolean>(false);


    const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false);
    const [Id, setId] = useState<number>(-1);
    const [formData, setFormData] = useState<EditedCustomer>({
        company: "",
        contactPerson: "",
        email: "",
        telephoneNumber: "",
        address: ""
    });

    const handleClose = () => {
        setReloadKey((prev) => prev + 1);
        setShowCustomerForm(false);
    };

    const HandleEdit = (customer: Customer) => {
        console.log(customer.customerId);
        setId(customer.customerId);
        setFormData({
            company: customer.company,
            contactPerson: customer.contactperson,
            email: customer.email,
            telephoneNumber: customer.telephoneNumber,
            address: customer.address
        });
        setShowCustomerForm(true);
    };

    const HandleDelete = async (customerId: number) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/klanten/${customerId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                setError(
                    "message" in response
                        ? response.message
                        : "Fout opgetreden tijdens het verwijderen."
                );
            } else {
                setDeleted(true);
            }

            setCustomers((prev) =>
                prev?.filter((customer) => customer.customerId !== customerId)
            );
        } catch (error) {
            setError("Fout opgetreden tijdens het verwijderen.");
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/klanten");

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const response = await res.json();
                const data: Customer[] = response.data;
                setCustomers(data);
                if (isMounted) {
                    setCustomers(data);
                    setLoading(false);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [reloadKey]);

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p>Error loading customers: {error}</p>;

    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <h2 className="mb-0">Customer Overview</h2>
                        <a
                            className="btn d-flex align-items-center"
                            href="/klanten/voeg-klant-toe"
                        >
                            <i className="fas fa-user-plus me-2"></i>
                            Voeg klant toe
                        </a>
                    </div>
                    <div className="employees-table">
                        <div className="table-section">
                            <div className="overflow-x-auto">


                                <table style={{ width: "100%" }}>
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th>Bedrijf</th>
                                            <th>Contact Persoon</th>
                                            <th>Email</th>
                                            <th>Telefoon nummer</th>
                                            <th>Adres</th>
                                            <th>Plaats</th>
                                            <th>Postcode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((e) => (
                                            <tr key={e.customerId} className="hover:bg-gray-50">
                                                <td>{e.company}</td>
                                                <td>{e.contactperson}</td>
                                                <td>{e.email}</td>
                                                <td>{e.telephoneNumber}</td>
                                                <td>{e.address}</td>
                                                <td>{e.location}</td>
                                                <td>{e.zipcode}</td>
                                                <td>
                                                    <button onClick={() => HandleDelete(e.customerId)}>
                                                        <i className="fas fa-user-minus me-2">
                                                            <span className="ms-2">verwijderen</span>
                                                        </i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button>
                                                        <i
                                                            className="fa-solid fa-user-pen"
                                                            onClick={() => {
                                                                console.log("Customer in list: ");
                                                                console.log(e as Customer);

                                                                HandleEdit(e);
                                                            }}
                                                        >
                                                            <span className="ms-2">Bewerken</span>
                                                        </i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup
                title={
                    error.length > 0 ? "Verwijderen mislukt" : "Klant verwijderd!"
                }
                body={error.length > 0 ? error : "Klant was succesvol verwijderd"}
                firstButton="Sluiten"
                isVisible={error.length > 0 || deleted}
                onFirstBtnClick={() => {
                    setDeleted(false);
                    setError("");
                }}
            />
            <CustomerFormModal
                isVisible={showCustomerForm}
                customerId={Id}
                initialFormData={formData}
                onClose={handleClose}
            />
        </div>
    );
};
