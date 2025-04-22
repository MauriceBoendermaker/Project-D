import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    const capitalize = (s: string) =>
        s
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');

    const paths = location.pathname.split('/').filter(Boolean);

    const breadcrumbs = paths.map((segment, index) => {
        const path = '/' + paths.slice(0, index + 1).join('/');
        return {
            label: capitalize(segment),
            path,
        };
    });

    return (
        <section className="row">
            <div className="col breadcrumbs-container">
                <span>
                    <Link to="/" className="btn-simple">Home</Link>
                    {breadcrumbs.map((crumb, i) => (
                        <span key={crumb.path}>
                            {' '}
                            <i className="fa-solid fa-chevron-right"></i>{' '}
                            <Link to={crumb.path} className="btn-simple">
                                {crumb.label}
                            </Link>
                        </span>
                    ))}
                </span>
            </div>
        </section>
    );
}
