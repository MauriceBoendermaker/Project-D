import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Rit {
    ritId: number;
    ritNummer: string;
    datum: string;
    afstandKm: number;
    duurMinuten: number;
    voertuigId: number;
    kenteken: string;
    merk: string;
    model: string;
    brandstofType: string;
}

export const TripOverview = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedRit, setSelectedRit] = useState<Rit | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/ritten/overzicht");

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data: Rit[] = await res.json();

                if (isMounted) {
                    const calendarEvents = data.map((rit) => ({
                        title: `${rit.ritNummer} (${rit.afstandKm} km)`,
                        start: new Date(rit.datum),
                        extendedProps: { rit },
                    }));

                    setEvents(calendarEvents);
                }
            } catch (error) {
                console.error("Fout bij ophalen ritten:", error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleEventClick = (info: any) => {
        setSelectedRit(info.event.extendedProps.rit);
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
                                    <p><strong>Voertuig:</strong> {selectedRit.kenteken}</p>
                                    <p><strong>Type:</strong> {selectedRit.merk} {selectedRit.model}</p>
                                    <hr />
                                    <p><strong>Rit nummer:</strong> {selectedRit.ritNummer}</p>
                                    <p><strong>Datum:</strong> {new Date(selectedRit.datum).toLocaleString()}</p>
                                    <p><strong>Afstand:</strong> {selectedRit.afstandKm} km</p>
                                    <p><strong>Duur:</strong> {selectedRit.duurMinuten} minuten</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
