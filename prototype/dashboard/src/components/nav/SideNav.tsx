import { useState, useEffect } from "react";

export const SideNav = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (collapsed) {
            document.body.classList.add("sidebar-collapsed");
        } else {
            document.body.classList.remove("sidebar-collapsed");
        }
    }, [collapsed]);

    const handleZoom = (index: number) => {
        const event = new CustomEvent("zoomChart", { detail: index });
        window.dispatchEvent(event);
    };

    return (
        <div className={`side-navbar-parent ${collapsed ? "collapsed" : ""}`}>
            <div className="inner-sidebar d-flex flex-column justify-content-between h-100">
                <div className="top-section">
                    <div className="nav-buttons d-flex flex-column align-items-center gap-4 mt-5 pt-4">
                        {[1, 2, 3, 4].map((num, i) => (
                            <button key={i} onClick={() => handleZoom(i)} className="graph-button">
                                <i className="fas fa-chart-bar fa-lg"></i>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                className="collapse-button"
                onClick={() => setCollapsed(!collapsed)}
            >
                <i className={`fas fa-chevron-left ${collapsed ? "rotate" : ""}`}></i>
            </button>
        </div>
    );
};