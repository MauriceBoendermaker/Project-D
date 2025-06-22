import {
  FUEL_CHART_TITLE,
  LOAD_DEGREE_TITLE,
  TRIP_COST_TITLE,
} from "components/ChartTitles";
import { useAuth } from "components/Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SideNav = () => {
  const navigate = useNavigate();
  const IconClassNames: { [Key: number]: [string, string, string] } = {
    1: ["fa-solid fa-gas-pump", FUEL_CHART_TITLE, "/verbruik"],
    2: ["fa-solid fa-euro-sign", TRIP_COST_TITLE, "/benzinekosten"],
    3: ["fa-solid fa-percent", LOAD_DEGREE_TITLE, "/ladingsgraad"],
    4: ["fa-solid fa-question", "title 4", "/help"],
  };
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) setCollapsed(false);
    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [collapsed]);

  const handleZoom = (link: string, index: number) => {
    navigate(link);
    const event = new CustomEvent("zoomChart", { detail: index });
    window.dispatchEvent(event);
  };

  return (
    <div className={`side-navbar-parent ${collapsed ? "collapsed" : ""}`}>
      <div className="inner-sidebar d-flex flex-column justify-content-between h-100">
        <div className="top-section">
          <div className="nav-buttons d-flex flex-column align-items-center gap-4 mt-5 pt-4">
            {[1, 2, 3, 4].map((num, i) => (
              <button
                key={i}
                onClick={() => handleZoom(IconClassNames[num][2], i)}
                className="graph-button"
                title={IconClassNames[num][1]}
              >
                <i className={IconClassNames[num][0]}></i>
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <button
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className={`fas fa-chevron-left ${collapsed ? "rotate" : ""}`}></i>
        </button>
      )}
    </div>
  );
};
