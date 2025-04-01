import React from 'react';
import { useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const breadcrumb = location.pathname
        .split('/')
        .filter(Boolean)
        .map(capitalize);

    return (
        <section className="row">
            <div className="col breadcrumbs-container">
                <span><a href="/" className="btn-simple">Home</a> <i className="fa-solid fa-chevron-right"></i> <a href={location.pathname} className="btn-simple">{breadcrumb}</a></span>
            </div>
        </section>
    );
}