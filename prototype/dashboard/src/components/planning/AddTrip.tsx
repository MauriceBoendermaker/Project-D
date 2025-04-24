import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

// Leaflet css
import 'leaflet/dist/leaflet.css';

// Custom marker icon image
import markerIcon from '../../assets/images/marker.png';

interface Kost {
    onderhoud: number;
    verzekering: number;
    tolwegen: number;
}

interface Rit {
    rit_id: string;
    datum: string;
    afstand_km: number;
    brandstof_verbruik_l: number;
    duur_minuten: number;
    kosten: Kost;
}

interface Vehicle {
    id: number;
    voertuig_id: string;
    kenteken: string;
    merk: string;
    model: string;
    brandstof_type: string;
}

interface MapProps {
    start: LatLngExpression;
    end: LatLngExpression | null;
    route: LatLngExpression[];
}

export const AddTrip = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [location, setLocation] = useState("");
    const [afstandKm, setAfstandKm] = useState<number>(0);
    const [duurMinuten, setDuurMinuten] = useState<number>(0);
    const [datum, setDatum] = useState<string>("");
    const [brandstofVerbruik, setBrandstofVerbruik] = useState<number>(0);
    const [loadingRoute, setLoadingRoute] = useState(false);
    const startCoords: [number, number] = [52.01152589199725, 4.6951698197121825];
    const [endCoords, setEndCoords] = useState<[number, number] | null>(null);
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

    const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [40, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40],
    });    

    useEffect(() => {
        fetch("http://localhost:3000/api/brandstof/voertuigen")
            .then(res => res.json())
            .then(data => setVehicles(data));
    }, []);

    const handleVehicleChange = (voertuigId: string) => {
        const vehicle = vehicles.find(v => v.voertuig_id === voertuigId);
        setSelectedVehicle(vehicle || null);
    };

    const MapComponent = ({ start, end, route }: MapProps) => {
        if (!end) return null;
    
        return (
            <MapContainer center={start} zoom={10} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={start} icon={customIcon} />
                <Marker position={end} icon={customIcon} />
                {route.length > 0 && <Polyline positions={route} color="blue" />}
            </MapContainer>
        );
    };    

    const calculateDistance = async (address: string) => {
        setLoadingRoute(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
                headers: {
                    "User-Agent": "ELafeberTransport/1.0 (mauriceboendermaker@gmail.com)"
                }
            });
            const data = await res.json();
            if (data.length === 0) return;

            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setEndCoords([lat, lon]);

            const orsRes = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
                method: "POST",
                headers: {
                    "Authorization": "5b3ce3597851110001cf6248688b603bcdbb41979b53ceaa34961203",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coordinates: [[startCoords[1], startCoords[0]], [lon, lat]]
                })
            });

            const route = await orsRes.json();
            if (!route.features || route.features.length === 0) return;

            const summary = route.features[0].properties.summary;
            setAfstandKm(Math.round(summary.distance / 1000));
            setDuurMinuten(Math.round(summary.duration / 60));

            const line = route.features[0].geometry.coordinates.map(([lng, lat]: number[]) => [lat, lng]);
            setRouteCoords(line);
        } catch (error) {
            console.error("Error calculating route:", error);
        }
        setLoadingRoute(false);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (location.trim().length > 5) {
                calculateDistance(location.trim());
            }
        }, 800);

        return () => clearTimeout(delayDebounce);
    }, [location]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h2>Nieuwe rit toevoegen</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Rit ID (automatisch gegenereerd)</label>
                            <input type="text" className="form-control" disabled placeholder="Wordt automatisch gegenereerd" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Datum</label>
                            <input type="date" className="form-control" value={datum} onChange={e => setDatum(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Voertuig</label>
                            <select className="form-select" onChange={e => handleVehicleChange(e.target.value)} required>
                                <option value="">Selecteer voertuig</option>
                                {vehicles.map(v => (
                                    <option key={v.voertuig_id} value={v.voertuig_id}>
                                        {v.voertuig_id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kenteken</label>
                            <input type="text" className="form-control" value={selectedVehicle?.kenteken || ""} readOnly disabled />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Merk</label>
                            <input type="text" className="form-control" value={selectedVehicle?.merk || ""} readOnly disabled />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Model</label>
                            <input type="text" className="form-control" value={selectedVehicle?.model || ""} readOnly disabled />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Adres (bestemming)</label>
                            <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} placeholder="Typ een adres in Nederland" required />
                        </div>

                        {loadingRoute && <div className="text-muted">Afstand en duur worden berekend...</div>}

                        <div className="mb-3">
                            <label className="form-label">Afstand (km)</label>
                            <input type="number" className="form-control" value={afstandKm} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Duur (minuten)</label>
                            <input type="number" className="form-control" value={duurMinuten} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Brandstofverbruik (liter)</label>
                            <input type="number" className="form-control" value={brandstofVerbruik} onChange={e => setBrandstofVerbruik(parseFloat(e.target.value))} />
                        </div>

                        <button type="submit" className="btn btn-primary">Opslaan</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <MapComponent start={startCoords} end={endCoords} route={routeCoords} />
                </div>
            </div>
        </div>
    );
};
