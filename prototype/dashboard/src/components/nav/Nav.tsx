import { useLocation } from "react-router-dom";

// Import images
import profileImage from "../../assets/images/profile-image-placeholder@4x.png";
import logoImage from "../../assets/images/lafeber logo transparant 1@2x.png";

import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomAlert } from "components/misc/CustomAlert";

export const Nav = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutAlert(true);
    navigate("/login");
  };

  useEffect(() => {
    if (showLogoutAlert) {
      const timeout = setTimeout(() => {
        setShowLogoutAlert(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showLogoutAlert]);


  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <div className="container-fluid navbar-parent">
        <nav className="container-fluid navbar d-flex align-items-center">
          {/* Logo */}
          <div className="logo-container me-3">
            <a target="_blank" href="https://www.elafeber.nl/">
              <img src={logoImage} alt="" width={75} height={75} />
            </a>
          </div>

          {/* Center nav link */}
          {isLoggedIn && (
            <div className="nav-container position-absolute top-50 start-50 translate-middle">
              <nav>
                <a href="/" className={currentPath === "/" ? "active" : ""}>
                  Home
                </a>
                <div className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${currentPath.startsWith("/planning") ? "active" : ""
                      }`}
                    href="/planning"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Planning
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className={`dropdown-item ${currentPath === "/planning/toon-rit-overzicht"
                          ? "active"
                          : ""
                          }`}
                        href="/planning/toon-rit-overzicht"
                      >
                        <i className="fa-solid fa-calendar-days me-2"></i>
                        Toon rit overzicht
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a
                        className={`dropdown-item ${currentPath === "/planning/voeg-rit-toe"
                          ? "active"
                          : ""
                          }`}
                        href="/planning/voeg-rit-toe"
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        Voeg rit toe
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${currentPath.startsWith("/admin") ? "active" : ""
                      }`}
                    href="/admin"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Beheer
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className={`dropdown-item ${currentPath === "/admin/voeg-voertuig-toe"
                          ? "active"
                          : ""
                          }`}
                        href="/admin/voeg-voertuig-toe"
                      >
                        <i className="fas fa-truck me-2"></i>
                        Voeg voertuig toe
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item ${currentPath === "/admin/voeg-medewerker-toe"
                          ? "active"
                          : ""
                          }`}
                        href="/admin/Medewerkers"
                      >
                        <i className="fas fa-user-tie me-2"></i>
                        Medewerkers
                      </a>
                    </li>
                  </ul>
                </div>
                <a href="/klanten/overzicht" className={currentPath === "/klanten/overzicht" ? "active" : ""}>
                  Klanten
                </a>

              </nav>
            </div>
          )}
          {/* Profile (flush right) */}
          <div className="login-status-container d-flex align-items-center gap-2 ms-auto">
            <img src={profileImage} alt="" width={40} height={40} />
            <div className="profile-placeholder d-flex flex-column gap-1">
              <div
                className="rounded-pill bg-white bg-opacity-75"
                style={{ width: "60px", height: "10px" }}
              ></div>
              <div
                className="rounded-pill bg-white bg-opacity-50"
                style={{ width: "90px", height: "10px" }}
              ></div>
            </div>
          </div>
          {isLoggedIn && (
            <button
              className="btn logout-btn text-decoration-none d-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <i className="fas fa-right-from-bracket"></i>
              <span>Logout</span>
            </button>
          )}
        </nav >
        {showLogoutAlert && (
          <CustomAlert type="alert alert-warning" message="U bent uitgelogd!" />
        )
        }
      </div >
    </>
  );
};
