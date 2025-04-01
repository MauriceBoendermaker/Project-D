export const Footer = () => {
    return (
        <div className="container-fluid footer-parent">
            <footer className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-auto text-center">
                        <p>&copy; {new Date().getFullYear()} - Logistiek Dashboard</p>
                        <p>Made by&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/yassyass2">
                                Yassine
                            </a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/MauriceBoendermaker">
                                Maurice
                            </a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/Thijs-1051036">
                                Thijs
                            </a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/JoostdeRijcke">
                                Joost
                            </a>
                            &nbsp;en&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/mark-175">
                                Mark
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}