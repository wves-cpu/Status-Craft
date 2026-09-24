import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  IconGear,
  IconWrench,
  IconSettings,
  IconGem,
  IconUsers,
  IconStar,
  IconPhone,
  IconSearch,
  IconUser,
  IconShield,
} from './SvgIcons';
import './SidebarDrawer.css';

export default function SidebarDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="sidebar-backdrop" onClick={onClose}>
      <aside className="sidebar-drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-gear-box" style={{ width: 32, height: 32 }}>
              <IconGear size={18} />
            </div>
            <span className="brand-title">Status<strong>Craft</strong></span>
          </div>

          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav-list">
          <NavLink to="/" end className="sidebar-item" onClick={onClose}>
            <IconGear size={18} className="sidebar-icon" />
            <span>{t('navHome')}</span>
          </NavLink>

          <NavLink to="/workshops" className="sidebar-item" onClick={onClose}>
            <IconWrench size={18} className="sidebar-icon" />
            <span>Мастерские и Сервисы</span>
          </NavLink>

          <NavLink to="/services" className="sidebar-item" onClick={onClose}>
            <IconSettings size={18} className="sidebar-icon" />
            <span>{t('navServices')}</span>
          </NavLink>

          <NavLink to="/prices" className="sidebar-item" onClick={onClose}>
            <IconGem size={18} className="sidebar-icon" />
            <span>{t('navPrices')}</span>
          </NavLink>

          <NavLink to="/about" className="sidebar-item" onClick={onClose}>
            <IconUsers size={18} className="sidebar-icon" />
            <span>{t('navAbout')}</span>
          </NavLink>

          <NavLink to="/reviews" className="sidebar-item" onClick={onClose}>
            <IconStar size={18} className="sidebar-icon" />
            <span>{t('navReviews')}</span>
          </NavLink>

          <NavLink to="/contacts" className="sidebar-item" onClick={onClose}>
            <IconPhone size={18} className="sidebar-icon" />
            <span>{t('navContacts')}</span>
          </NavLink>

          <NavLink to="/track" className="sidebar-item" onClick={onClose}>
            <IconSearch size={18} className="sidebar-icon" />
            <span>{t('trackTitle')}</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {isAuthenticated ? (
            <NavLink to="/dashboard" className="sidebar-user-pill" onClick={onClose}>
              <IconUser size={18} />
              <div>
                <strong>{user?.name}</strong>
                <span className="shop-sub">{user?.shopName || 'Кабинет Мастера'}</span>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/auth" className="btn btn--primary btn--full" onClick={onClose}>
              <IconShield size={18} /> {t('navMasterLogin')}
            </NavLink>
          )}
        </div>
      </aside>
    </div>
  );
}
