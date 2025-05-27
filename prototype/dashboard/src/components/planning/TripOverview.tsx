import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Trip {
  tripId: number;
  date: string;
  distanceKm: number;
  time: number;
  vehicleId: number;
  licensePlate: string;
  brand: string;
  model: string;
  fuelType: string;
}

interface RitApiResponse {
  message: string;
  data: Trip[];
}

export const TripOverview = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedRit, setSelectedRit] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ritten/overzicht");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const Trips: RitApiResponse = await res.json();
        if (isMounted) {
          const calendarEvents = Trips.data.map((rit) => ({
            title: `RIT-${rit.tripId} (${rit.distanceKm} km)`,
            start: new Date(rit.date),
            extendedProps: { rit },
          }));

          console.warn(calendarEvents);

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
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rit details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedRit && (
                <>
                  <p>
                    <strong>Voertuig:</strong> {selectedRit.licensePlate}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedRit.brand}{" "}
                    {selectedRit.model}
                  </p>
                  <hr />
                  <p>
                    <strong>Rit nummer:</strong> RIT-{selectedRit.tripId}
                  </p>
                  <p>
                    <strong>Datum:</strong>{" "}
                    {new Date(selectedRit.date).toLocaleString()}
                  </p>
                  <p>
                    <strong>Afstand:</strong> {selectedRit.distanceKm} km
                  </p>
                  <p>
                    <strong>Duur:</strong> {selectedRit.time} minuten
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
