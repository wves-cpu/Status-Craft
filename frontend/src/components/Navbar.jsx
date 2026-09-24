import { Link, NavLink, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { IconGear, IconUser, IconSearch } from './SvgIcons';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="tech-navbar">
      <div className="tech-navbar-container">
        {/* Real Logo */}
        <Link to="/" className="tech-logo">
          <div className="logo-gear-box">
            <IconGear size={22} />
          </div>
          <div className="logo-text">
            <span className="brand-title">{t('brandName')}</span>
            <span className="brand-sub">{t('brandSubtitle')}</span>
          </div>
        </Link>

        {/* Dedicated Standalone Nav Links */}
        <nav className="tech-nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navHome')}
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navServices')}
          </NavLink>
          <NavLink to="/prices" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navPrices')}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navAbout')}
          </NavLink>
          <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navReviews')}
          </NavLink>
          <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>
            {t('navContacts')}
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="tech-nav-actions">
          <LanguageSelector />

          <Link to="/track" className="btn-track-icon" title={t('trackTitle')}>
            <IconSearch size={18} />
          </Link>

          <Link to="/submit" className="btn btn--blue-header">
            {t('navSubmitLead')}
          </Link>

          {isAuthenticated ? (
            <div className="master-profile-pill">
              <Link to="/dashboard" className="master-link">
                <IconUser size={16} /> {user?.name?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="btn-logout-icon" title="Logout">
                🚪
              </button>
            </div>
          ) : (
            <Link to="/auth" className="master-login-link" title={t('navMasterLogin')}>
              🔑
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
