import { useEffect, useState } from "react";

interface Customer {
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
    const [error, setError] = useState<string | null>(null);

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
                                        {customers.map((customer, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td>{customer.bedrijf}</td>
                                                <td>{customer.contactpersoon}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.telefoonnummer}</td>
                                                <td>{customer.adres}</td>
                                                <td>{customer.plaatsnaam}</td>
                                                <td>{customer.postcode}</td>
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
