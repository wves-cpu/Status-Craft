import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  IconWrench,
  IconGear,
  IconRefresh,
  IconSettings,
  IconShield,
  IconUsers,
  IconArrowRight,
} from '../components/SvgIcons';
import './ServicesPage.css';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { id: 1, icon: <IconWrench size={32} />, titleKey: 'serv1Title', descKey: 'serv1Desc', price: t('servPriceFree') },
    { id: 2, icon: <IconGear size={32} />, titleKey: 'serv2Title', descKey: 'serv2Desc', price: `${t('servPriceFrom')} 150 000` },
    { id: 3, icon: <IconRefresh size={32} />, titleKey: 'serv3Title', descKey: 'serv3Desc', price: `${t('servPriceFrom')} 100 000` },
    { id: 4, icon: <IconSettings size={32} />, titleKey: 'serv4Title', descKey: 'serv4Desc', price: `${t('servPriceFrom')} 80 000` },
    { id: 5, icon: <IconShield size={32} />, titleKey: 'serv5Title', descKey: 'serv5Desc', price: `${t('servPriceFrom')} 120 000` },
    { id: 6, icon: <IconUsers size={32} />, titleKey: 'serv6Title', descKey: 'serv6Desc', price: t('servPriceFree') },
  ];

  return (
    <div className="page-standalone-wrapper dark-page-bg">
      <div className="page-standalone-container">
        <div className="page-header-block">
          <span className="page-tag">TechService Services</span>
          <h1 className="page-main-title">{t('servTitle')}</h1>
          <p className="page-sub-lead">{t('servPageSub')}</p>
        </div>

        <div className="services-standalone-grid">
          {services.map((s) => (
            <div key={s.id} className="service-card-standalone glass-panel">
              <div className="service-icon-box">{s.icon}</div>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descKey)}</p>
              <div className="service-card-footer">
                <span className="price-tag">{s.price}</span>
                <Link to="/prices" className="service-calc-link">
                  {t('servPriceCalcBtn')} <IconArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="page-cta-box glass-panel">
          <h2>{t('servCtaTitle')}</h2>
          <p>{t('servCtaDesc')}</p>
          <div className="cta-btns-row">
            <Link to="/prices" className="btn btn--primary">
              {t('heroBtnCalc')}
            </Link>
            <Link to="/submit" className="btn btn--secondary">
              {t('navSubmitLead')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
