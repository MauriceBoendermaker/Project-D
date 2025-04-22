import React, { useState, useRef } from 'react';
import oiaUiaGif from '../../assets/images/oia-uia.gif';

export const Footer = () => {
    const [showPopup, setShowPopup] = useState(false);
    const clickCount = useRef(0);
    const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
    const displayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSecretClick = () => {
        clickCount.current += 1;

        if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
        clickTimerRef.current = setTimeout(() => {
            clickCount.current = 0;
        }, 1000);

        if (clickCount.current === 3) {
            setShowPopup(true);
            clickCount.current = 0;

            if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
            displayTimerRef.current = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    return (
        <div className="container-fluid footer-parent position-relative">
            <footer className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-auto footer-bottom-row text-center">
                        <p onClick={handleSecretClick} style={{ cursor: 'pointer' }}>
                            &copy; {new Date().getFullYear()} - E. Lafeber Internationaal Transporten B.V.
                        </p>
                        <p>
                            Gemaakt door&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/yassyass2">Yassine</a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/MauriceBoendermaker">Maurice</a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/Thijs-1051036">Thijs</a>,&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/JoostdeRijcke">Joost</a>
                            &nbsp;en&nbsp;
                            <a className="btn-link" target="_blank" href="https://github.com/mark-175">Mark</a>
                        </p>
                    </div>
                </div>
            </footer>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        // backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <img
                        src={oiaUiaGif}
                        alt="oia uia"
                        style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '12px' }}
                    />
                </div>
            )}
        </div>
    );
}
