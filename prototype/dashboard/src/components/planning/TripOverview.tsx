import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Rit {
    rit_id: string;
    datum: string;
    afstand_km: number;
    brandstof_verbruik_l: number;
    gemiddeld_verbruik_l_per_100km: number;
}

interface Trip {
    voertuig_id: string;
    kenteken: string;
    merk: string;
    model: string;
    brandstof_type: string;
    ritten: Rit[];
}

export const TripOverview = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedRit, setSelectedRit] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/ritten/overzicht");

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data: Trip[] = await res.json();

                const calendarEvents = data.flatMap((trip) =>
                    trip.ritten.map((rit) => ({
                        title: `${trip.voertuig_id} (${rit.afstand_km} km)`,
                        start: new Date(rit.datum),
                        extendedProps: {
                            rit,
                            voertuig: {
                                voertuig_id: trip.voertuig_id,
                                kenteken: trip.kenteken,
                                merk: trip.merk,
                                model: trip.model,
                                brandstof_type: trip.brandstof_type,
                            },
                        },
                    }))
                );

                setEvents(calendarEvents);
            } catch (error) {
                console.error("Fout bij ophalen ritten:", error);
            }
        };

        fetchData();
    }, []);

    const handleEventClick = (info: any) => {
        setSelectedRit(info.event.extendedProps);
        setShowModal(true);
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="nl"
                firstDay={1}
                events={events}
                eventClick={handleEventClick}
                height="auto"
            />

            {/* Bootstrap Modal */}
            <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex={-1}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                onClick={() => setShowModal(false)}
            >
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Rit details</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            {selectedRit && (
                                <>
                                    <p><strong>Voertuig:</strong> {selectedRit.voertuig.voertuig_id} - {selectedRit.voertuig.kenteken}</p>
                                    <p><strong>Type:</strong> {selectedRit.voertuig.merk} {selectedRit.voertuig.model} ({selectedRit.voertuig.brandstof_type})</p>
                                    <hr />
                                    <p><strong>Rit ID:</strong> {selectedRit.rit.rit_id}</p>
                                    <p><strong>Datum:</strong> {new Date(selectedRit.rit.datum).toLocaleString()}</p>
                                    <p><strong>Afstand:</strong> {selectedRit.rit.afstand_km} km</p>
                                    <p><strong>Verbruik:</strong> {selectedRit.rit.brandstof_verbruik_l} liter</p>
                                    <p><strong>Gem. verbruik:</strong> {selectedRit.rit.gemiddeld_verbruik_l_per_100km} L / 100km</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
