import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import stylesheets
import './assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import misc components
import { Breadcrumbs } from './components/misc/Breadcrumbs';
import { Nav } from './components/nav/Nav';
import { SideNav } from './components/nav/SideNav';
import { Footer } from './components/misc/Footer';

// Import components
import { ChartsWrapper } from './components/ChartsWrapper';
import FuelChart from "./components/FuelChart"


const App: React.FC = () => {
    return (
        <Router>
            <Nav />
            <SideNav />

            <main className="container main-content g-0 flex-1">
                <Breadcrumbs />

                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<ChartsWrapper />} />
                    <Route path="/testing" element={<FuelChart />} />

                    <Route
                        path="/404"
                        element={
                            <section>
                                <div className="g-0 pt-4">
                                    <h3>
                                        <strong>Error 404 - Page Not Found</strong>
                                    </h3>
                                </div>
                            </section>
                        }
                    />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    );
};

export default App;
