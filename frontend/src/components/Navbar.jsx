import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import SidebarDrawer from './SidebarDrawer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { IconGear, IconUser, IconSearch, IconShield, IconCreditCard } from './SvgIcons';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="tech-navbar">
        <div className="tech-navbar-container">
          {/* Left: Hamburger Drawer Toggle & Stretched Logo */}
          <div className="navbar-left-group">
            <button
              type="button"
              className="btn-sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Navigation Drawer"
              title="Меню навигации"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Stretched High-End Logo */}
            <Link to="/" className="tech-logo-stretched">
              <div className="logo-gear-box-glowing">
                <IconGear size={24} />
              </div>
              <div className="logo-text-stretched">
                <span className="brand-title">{t('brandName')}</span>
                <span className="brand-sub">{t('brandSubtitle')}</span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Shortcuts (Desktop) */}
          <nav className="tech-nav-center-desktop">
            <Link
              to="/payment"
              className={`nav-link-item ${location.pathname === '/payment' ? 'active' : ''}`}
            >
              <IconCreditCard size={17} />
              <span>{t('navOnlinePayment') || 'Онлайн Оплата'}</span>
            </Link>

            <Link
              to="/track"
              className={`nav-link-item ${location.pathname === '/track' ? 'active' : ''}`}
            >
              <IconSearch size={17} />
              <span>{t('navTrackOrder') || 'Отследить заказ'}</span>
            </Link>

            <Link
              to="/workshops"
              className={`nav-link-item ${location.pathname === '/workshops' ? 'active' : ''}`}
            >
              <IconGear size={17} />
              <span>{t('navWorkshops') || 'Мастерские'}</span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="tech-nav-actions">
            <LanguageSelector />

            <Link to="/submit" className="btn btn--blue-header">
              {t('navSubmitLead')}
            </Link>

            {isAuthenticated ? (
              <div className="master-profile-pill">
                <Link to="/dashboard" className="master-link">
                  <IconUser size={16} /> {user?.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-logout-icon" title="Выход из аккаунта">
                  <IconShield size={14} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="master-login-link" title={t('navMasterLogin')}>
                <IconUser size={18} />
                <span className="login-txt-hide">Кабинет</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Collapsible Side Drawer */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenPayment={() => navigate('/payment')}
      />
    </>
  );
}
