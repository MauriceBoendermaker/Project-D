// Import placeholder profile image
import profileImage from '../../assets/images/profile-image-placeholder@4x.png';

export const Nav = () => {
    return (
        <div className="container-fluid navbar-parent">
            <nav className="container navbar">
                <div className="row">
                    {/* Logo container */}
                    <div className="col-auto logo-container">
                        <a href="/">
                            Office<span>Calendar<b>.</b></span>
                        </a>
                    </div>

                    {/* Navigation container */}
                    <div className="col-auto nav-container position-absolute top-50 start-50 translate-middle">
                        <nav>
                            <a href="/">Home</a>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                        </nav>
                    </div>

                    {/* Login status container */}
                    <div className="col-auto login-status-container">
                        <span className="login-status-text"><a target='_blank' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        {localStorage.getItem('CurrentUserEmail') || "Please login to continue"}</a></span>
                        <img src={profileImage} alt='' width={40} height={40} />
                    </div>
                </div>
            </nav>
        </div>
    );
}