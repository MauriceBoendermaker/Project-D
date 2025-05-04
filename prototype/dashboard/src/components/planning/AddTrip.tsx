import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../../assets/images/marker.png";
import { METHODS } from "http";

interface PostRitProps {
  voertuig_id: number;
  datum: string; // ISO-datumstring
  afstand_km: number;
  duur_minuten: number;
  brandstof_verbruik_l: number;
  bestemming_id: number;
  klant_id: number;
  chauffeur_id: number;
}
interface Kost {
  onderhoud: number;
  verzekering: number;
  tolwegen: number;
}

interface Vehicle {
  voertuigId: number;
  kenteken: string;
  merk: string;
  model: string;
  brandstofType: string;
}

interface MapProps {
  start: [number, number];
  end: [number, number] | null;
  route: [number, number][];
  customIcon: L.Icon;
}

const suppressLeafletErrors = () => {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    const message = args[0]?.toString?.() ?? "";

    if (
      message.includes("el is undefined") &&
      message.includes("_onZoomTransitionEnd")
    ) {
      return;
    }

    originalConsoleError(...args);
  };
};

export const AddTrip = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [straat, setStraat] = useState("");
  const [postcode, setPostcode] = useState("");
  const [stad, setStad] = useState("");
  const [afstandKm, setAfstandKm] = useState<number>(0);
  const [duurMinuten, setDuurMinuten] = useState<number>(0);
  const [datum, setDatum] = useState<string>("");
  const [loadingRoute, setLoadingRoute] = useState(false);
  const startCoords: [number, number] = [52.01152589199725, 4.6951698197121825];
  const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);
  const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    suppressLeafletErrors();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/voertuigen")
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, []);

  const handleVehicleChange = (voertuigId: string) => {
    const vehicle = vehicles.find(
      (v) => v.voertuigId.toString() === voertuigId
    );
    setSelectedVehicle(vehicle || null);
  };

  const MapComponent = ({ start, end, route, customIcon }: MapProps) => {
    const mapRef = useRef<L.Map>(null);

    useEffect(() => {
      const map = mapRef.current;
      if (!map || !end) return;

      setTimeout(() => {
        try {
          map.invalidateSize();
          map.fitBounds([start, end], { padding: [50, 50] });
        } catch (error) {
          console.error(
            "Error: fitBounds failed, fallback to setView()",
            error
          );
          map.setView(end, 14);
        }
      }, 300);
    }, [end?.[0], end?.[1]]);

    return (
      <MapContainer
        center={start}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
        ref={mapRef as any}
        zoomAnimation={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={start} icon={customIcon} />
        {end && <Marker position={end} icon={customIcon} />}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    );
  };

  const calculateDistance = async (fullAddress: string) => {
    setLoadingRoute(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          fullAddress
        )}`,
        {
          headers: {
            "User-Agent":
              "ELafeberTransport/1.0 (mauriceboendermaker@gmail.com)",
          },
        }
      );
      const data = await res.json();
      if (data.length === 0) return;

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setEndCoords([lat, lon]);

      const orsRes = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-hgv/geojson",
        {
          method: "POST",
          headers: {
            Authorization:
              "5b3ce3597851110001cf6248688b603bcdbb41979b53ceaa34961203",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [
              [startCoords[1], startCoords[0]],
              [lon, lat],
            ],
          }),
        }
      );

      const route = await orsRes.json();
      if (!route.features || route.features.length === 0) return;

      const summary = route.features[0].properties.summary;
      setAfstandKm(Math.round(summary.distance / 1000));
      setDuurMinuten(Math.round(summary.duration / 60));

      const line = route.features[0].geometry.coordinates.map(
        ([lng, lat]: number[]) => [lat, lng]
      );
      setRouteCoords(line);
    } catch (error) {
      console.error("Fout met het berekenen van de route:", error);
    }
    setLoadingRoute(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (straat && postcode && stad) {
        const address = `${straat}, ${postcode} ${stad}, Nederland`;
        calculateDistance(address);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [straat, postcode, stad]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "postcode") {
      const formatted = value.toUpperCase();
      setPostcode(formatted);

      if (formatted.trim() === "") {
        setPostcodeValid(null);
      } else {
        setPostcodeValid(postcodeRegex.test(formatted));
      }
    } else if (name === "straat") {
      setStraat(value);
    } else if (name === "stad") {
      setStad(value);
    } else if (name === "datum") {
      setDatum(value);
    } else if (name === "voertuig") {
      handleVehicleChange(value);
    }
  };

  const handleSubmit = async () => {
    {
      const Rit: PostRitProps = {
        voertuig_id: selectedVehicle?.voertuigId ?? 0,
        datum: datum,
        afstand_km: afstandKm,
        duur_minuten: duurMinuten,
        brandstof_verbruik_l: 0,
        bestemming_id: 0,
        chauffeur_id: 0,
        klant_id: 0,
      };
      try {
        const repsone = await fetch("http://localhost:3000/api/ritten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Rit),
        });
        if (repsone.status == 201) {
          console.log("Added");
        }
      } catch {
        console.log("Failed");
      }

      /*{
  "voertuig_id": 0,
  "datum": "2025-05-01T15:52:39.416Z",
  "afstand_km": 0,
  "duur_minuten": 0,
  "brandstof_verbruik_l": 0,
  "bestemming_id": 0,
  "klant_id": 0,
  "chauffeur_id": 0
}*/
    }
  };

  return (
    <div className="add-trip-container container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Nieuwe rit toevoegen</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="mb-3">
              <label className="form-label">Rit ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Automatisch gegenereerd"
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Datum</label>
              <input
                type="date"
                className="form-control"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Voertuig</label>
              <select
                className="form-select"
                onChange={(e) => handleVehicleChange(e.target.value)}
                required
              >
                <option value="">Selecteer voertuig</option>
                {vehicles.map((v) => (
                  <option key={v.voertuigId} value={v.voertuigId}>
                    {v.merk} {v.model} [{v.kenteken}]
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Kenteken</label>
              <input
                type="text"
                className="form-control"
                value={selectedVehicle?.kenteken || ""}
                readOnly
                disabled
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Merk</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedVehicle?.merk || ""}
                  readOnly
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedVehicle?.model || ""}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Straat + huisnummer</label>
              <input
                type="text"
                className="form-control"
                value={straat}
                onChange={(e) => setStraat(e.target.value)}
                placeholder="Bijv. Dorpsstraat 1"
                required
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
              <label className="form-label">Stad</label>
              <input
                type="text"
                className="form-control"
                value={stad}
                onChange={(e) => setStad(e.target.value)}
                placeholder="Bijv. Rotterdam"
                required
              />
            </div>

            {loadingRoute && (
              <div className="text-muted">
                <b>Afstand en duur worden berekend...</b>
                <br />
                <br />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Afstand (km)</label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={afstandKm}
                readOnly
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duur (minuten)</label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={duurMinuten}
                readOnly
                disabled
              />
            </div>

            <button type="submit" className="btn-primary">
              Opslaan
            </button>
          </form>
        </div>
        <div className="map-container col-md-6">
          <MapComponent
            start={startCoords}
            end={endCoords}
            route={routeCoords}
            customIcon={customIcon}
          />
        </div>
      </div>
    </div>
  );
};
