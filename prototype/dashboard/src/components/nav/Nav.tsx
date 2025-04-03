// Import images
import profileImage from '../../assets/images/profile-image-placeholder@4x.png';
import logoImage from '../../assets/images/lafeber logo transparant 1@2x.png';

export const Nav = () => {
    return (
        <div className="container-fluid navbar-parent">
            <nav className="container-fluid navbar d-flex align-items-center">
                {/* Logo */}
                <div className="logo-container me-3">
                    <a target='_blank' href="https://www.elafeber.nl/">
                        <img src={logoImage} alt='' width={75} height={75} />
                    </a>
                </div>

                {/* Center nav link */}
                <div className="nav-container position-absolute top-50 start-50 translate-middle">
                    <nav>
                        <a href="/">Home</a>
                    </nav>
                </div>

                {/* Profile (flush right) */}
                <div className="login-status-container d-flex align-items-center gap-2 ms-auto">
                    <img src={profileImage} alt='' width={40} height={40} />
                    <div className="profile-placeholder d-flex flex-column gap-1">
                        <div className="rounded-pill bg-white bg-opacity-75" style={{ width: '60px', height: '10px' }}></div>
                        <div className="rounded-pill bg-white bg-opacity-50" style={{ width: '90px', height: '10px' }}></div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
