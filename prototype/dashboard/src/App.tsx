import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import stylesheets
import "./assets/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// Import misc components
import { Breadcrumbs } from "./components/misc/Breadcrumbs";
import { Nav } from "./components/nav/Nav";
import { SideNav } from "./components/nav/SideNav";
import { Footer } from "./components/misc/Footer";

// Import components
import { ChartsWrapper } from "./components/ChartsWrapper";
import { FuelUsageInfo } from "./components/ChartInfo/FuelChartInfo";
import { LoadDegreeInfo } from "./components/ChartInfo/LoadChartInfo";
import { CostChartInfo } from "./components/ChartInfo/CostChartInfo";
import { LoginForm } from "components/Login";
import { PrivateLayout } from "components/PrivateLayout";
import { AuthProvider } from "components/Context/AuthContext";
import { TripOverview } from "./components/planning/TripOverview";

import { AddTrip } from "./components/planning/AddTrip";
import { AddVehicle } from "./components/admin/AddVehicle";
import { AddEmployee } from "./components/admin/AddEmployee";
import { AddCustomer } from "./components/klanten/AddCustomer";
import { Employees } from "components/admin/Employees";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <SideNav />

        <main className="container main-content g-0 flex-1">
          <Breadcrumbs />

          <Routes>
            {/* Login route */}
            <Route path="/login" element={<LoginForm />} />

            <Route element={<PrivateLayout />}>
              {/* Planning routes */}
              <Route
                path="/planning/toon-rit-overzicht"
                element={<TripOverview />}
              />
              <Route path="/planning/voeg-rit-toe" element={<AddTrip />} />

              {/* Beheer routes */}
              <Route path="/admin/voeg-voertuig-toe" element={<AddVehicle />} />
              <Route
                path="/admin/voeg-medewerker-toe"
                element={<AddEmployee />}
              />
              <Route path="/admin/Medewerkers" element={<Employees />} />

              {/* Klanten routes */}
              <Route path="/klanten/voeg-klant-toe" element={<AddCustomer />} />

              {/* Public routes */}
              <Route path="/" element={<ChartsWrapper />} />
              <Route path="/verbruik" element={<FuelUsageInfo />} />
              <Route path="/benzinekosten" element={<CostChartInfo />} />
              <Route path="/ladingsgraad" element={<LoadDegreeInfo />} />

              <Route
                path="/404"
                element={
                  <section>
                    <div className="g-0 pt-4">
                      <h3>
                        <strong>Error 404 - Pagina niet gevonden</strong>
                      </h3>
                    </div>
                  </section>
                }
              />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
