import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import SidebarDrawer from './SidebarDrawer';
import SubmitDeviceModal from './SubmitDeviceModal';
import PaymentModal from './PaymentModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { IconGear, IconUser, IconSearch, IconShield, IconCreditCard } from './SvgIcons';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="tech-navbar">
        <div className="tech-navbar-container">
          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            className="btn-sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open Sidebar Menu"
            title="Меню навигации"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

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

          {/* Right Actions */}
          <div className="tech-nav-actions">
            <LanguageSelector />

            <button
              type="button"
              className="btn-track-icon"
              onClick={() => setShowPaymentModal(true)}
              title="Онлайн Оплата (Click / Payme / РФ)"
            >
              <IconCreditCard size={18} />
            </button>

            <Link to="/track" className="btn-track-icon" title={t('trackTitle')}>
              <IconSearch size={18} />
            </Link>

            <button
              type="button"
              className="btn btn--blue-header"
              onClick={() => setShowSubmitModal(true)}
            >
              {t('navSubmitLead')}
            </button>

            {isAuthenticated ? (
              <div className="master-profile-pill">
                <Link to="/dashboard" className="master-link">
                  <IconUser size={16} /> {user?.name?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-logout-icon" title="Выход">
                  <IconShield size={14} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="master-login-link" title={t('navMasterLogin')}>
                <IconUser size={18} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Collapsible Side Drawer */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenPayment={() => setShowPaymentModal(true)}
      />

      {/* Global Submit Modal */}
      {showSubmitModal && (
        <SubmitDeviceModal onClose={() => setShowSubmitModal(false)} />
      )}

      {/* Global Online Payment Modal */}
      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </>
  );
}
