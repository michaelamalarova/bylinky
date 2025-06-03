import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css'
import '../styles/index.css'

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNavActive, setIsNavActive] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    const handleToggle = () => {
        setIsNavActive(!isNavActive);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">MyApp</div>
                    <div className={"nav-links"}>
                        <Link to="/">{t('navbar.home')}</Link>
                        <Link to="/about">{t('navbar.about')}</Link>
                        <Link to="/contact">{t('navbar.contact')}</Link>
                        {isAuthenticated ? (
                        <>
                            <Link to="/profile">{t('navbar.profile')}</Link>
                            <button onClick={handleLogout} className="logout-button">{t('label.logOut')}</button>
                        </>
                        ) : (
                        <>
                            <Link to="/login">{t('label.logIn')}</Link>
                            <Link to="/register">{t('label.registration')}</Link>
                        </>
                        )}
                    </div>
                    <div className="hamburger" onClick={handleToggle}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </nav>
            {isNavActive && <div className="overlay" onClick={handleToggle}></div>}
            <dialog className={`nav-dialog ${isNavActive ? 'active' : ''}`}>
                <div className={"nav-dialog-links"}>
                    <Link to="/">{t('navbar.home')}</Link>
                    <Link to="/about">{t('navbar.about')}</Link>
                    <Link to="/contact">{t('navbar.contact')}</Link>
                    {isAuthenticated ? (
                    <>
                        <Link to="/profile">{t('navbar.profile')}</Link>
                        <button onClick={handleLogout} className="logout-button-dialog">{t('label.logOut')}</button>
                    </>
                    ) : (
                    <>
                        <Link to="/login">{t('label.login')}</Link>
                        <Link to="/register">{t('label.registration')}</Link>
                    </>
                    )}
                </div>
                
            </dialog>
        </>
    );
  };

  export default Navbar