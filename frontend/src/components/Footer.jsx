import { useLanguage } from '../context/LanguageContext';
import { IconGear, IconTelegram } from './SvgIcons';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="tech-footer-section">
      <div className="tech-footer-container">
        {/* Left: Brand */}
        <div className="footer-brand-left">
          <div className="footer-logo-row">
            <div className="logo-gear-box" style={{ width: 30, height: 30 }}>
              <IconGear size={18} />
            </div>
            <div className="logo-title-group">
              <span className="footer-brand-title">{t('brandName')}</span>
              <span className="footer-brand-sub">{t('brandSubtitle')}</span>
            </div>
          </div>
        </div>

        {/* Center: Slogan & Copyright */}
        <div className="footer-center-info">
          <p className="footer-slogan">{t('footerSlogan')}</p>
          <p className="footer-copy">{t('footerCopyright')}</p>
        </div>

        {/* Right: Social Links */}
        <div className="footer-social-right">
          <div className="social-icons">
            <a href="https://t.me/blsssmm" target="_blank" rel="noreferrer" title="Telegram">
              <IconTelegram size={20} />
            </a>
          </div>
          <span className="social-label">{t('footerFollow')}</span>
        </div>
      </div>
    </footer>
  );
}
