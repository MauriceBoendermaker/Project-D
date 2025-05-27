import { useEffect, useState } from "react";

interface Customer {
    klant_id: number;
    bedrijf: string;
    contactpersoon: string;
    email: string;
    telefoonnummer: string;
    adres: string;
    postcode: string;
    plaatsnaam: string;
}

export const CustomerOverview = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>("");

    const [deleted, setDeleted] = useState<boolean>(false);

    const HandleDelete = async (klant_id: number) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/klanten/${klant_id}`,
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
                prev?.filter((customer) => customer.klant_id !== klant_id)
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

                const data: Customer[] = await res.json();
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
    }, []);

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
                                            <tr key={e.klant_id} className="hover:bg-gray-50">
                                                <td>{e.bedrijf}</td>
                                                <td>{e.contactpersoon}</td>
                                                <td>{e.email}</td>
                                                <td>{e.telefoonnummer}</td>
                                                <td>{e.adres}</td>
                                                <td>{e.plaatsnaam}</td>
                                                <td>{e.postcode}</td>
                                                <td>
                                                    <button onClick={() => HandleDelete(e.klant_id)}>
                                                        <i className="fas fa-user-minus me-2">
                                                            <span className="ms-2">verwijderen</span>
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
        </div>
    );
};
