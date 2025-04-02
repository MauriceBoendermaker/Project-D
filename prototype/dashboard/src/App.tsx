import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Breadcrumbs } from './components/misc/Breadcrumbs';
import { Nav } from './components/nav/Nav';
import { Footer } from './components/misc/Footer';

import './assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    return (
        <Router>
            <Nav />

            <main className="container main-content g-0 flex-1">
                <Breadcrumbs />
                <Routes>
                    {/* Public routes */}
                    {/* <Route path="/" element={<Login />} /> */}

                    <Route
                        path="/404"
                        element={
                            <div className="g-0 pt-4">
                                <h3>
                                    <strong>Error 404 - Not Found</strong>
                                </h3>
                            </div>
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
