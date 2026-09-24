import { useLanguage } from '../context/LanguageContext';
import { IconShield, IconClock, IconGear, IconUsers } from '../components/SvgIcons';
import './AboutPage.css';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="page-standalone-wrapper dark-page-bg">
      <div className="page-standalone-container">
        <div className="page-header-block">
          <span className="page-tag">{t('aboutPageTag')}</span>
          <h1 className="page-main-title">{t('aboutPageTitle')}</h1>
          <p className="page-sub-lead">{t('aboutPageLead')}</p>
        </div>

        <div className="about-stats-row">
          <div className="about-stat-card glass-panel">
            <span className="stat-num">{t('aboutStat1Num')}</span>
            <span className="stat-lbl">{t('aboutStat1Lbl')}</span>
          </div>
          <div className="about-stat-card glass-panel">
            <span className="stat-num">{t('aboutStat2Num')}</span>
            <span className="stat-lbl">{t('aboutStat2Lbl')}</span>
          </div>
          <div className="about-stat-card glass-panel">
            <span className="stat-num">{t('aboutStat3Num')}</span>
            <span className="stat-lbl">{t('aboutStat3Lbl')}</span>
          </div>
          <div className="about-stat-card glass-panel">
            <span className="stat-num">{t('aboutStat4Num')}</span>
            <span className="stat-lbl">{t('aboutStat4Lbl')}</span>
          </div>
        </div>

        <div className="about-values-grid">
          <div className="about-val-card glass-panel">
            <IconShield size={32} className="icon-cyan" />
            <h3>{t('aboutVal1Title')}</h3>
            <p>{t('aboutVal1Desc')}</p>
          </div>

          <div className="about-val-card glass-panel">
            <IconClock size={32} className="icon-cyan" />
            <h3>{t('aboutVal2Title')}</h3>
            <p>{t('aboutVal2Desc')}</p>
          </div>

          <div className="about-val-card glass-panel">
            <IconGear size={32} className="icon-cyan" />
            <h3>{t('aboutVal3Title')}</h3>
            <p>{t('aboutVal3Desc')}</p>
          </div>

          <div className="about-val-card glass-panel">
            <IconUsers size={32} className="icon-cyan" />
            <h3>{t('aboutVal4Title')}</h3>
            <p>{t('aboutVal4Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
