import { useLanguage } from '../context/LanguageContext';
import { IconStar, IconUsers } from '../components/SvgIcons';
import './ReviewsPage.css';

export default function ReviewsPage() {
  const { t } = useLanguage();

  const reviews = [
    { id: 1, nameKey: 'rev1Name', dateKey: 'rev1Date', devKey: 'rev1Dev', textKey: 'rev1Text' },
    { id: 2, nameKey: 'rev2Name', dateKey: 'rev2Date', devKey: 'rev2Dev', textKey: 'rev2Text' },
    { id: 3, nameKey: 'rev3Name', dateKey: 'rev3Date', devKey: 'rev3Dev', textKey: 'rev3Text' },
    { id: 4, nameKey: 'rev4Name', dateKey: 'rev4Date', devKey: 'rev4Dev', textKey: 'rev4Text' },
    { id: 5, nameKey: 'rev5Name', dateKey: 'rev5Date', devKey: 'rev5Dev', textKey: 'rev5Text' },
  ];

  return (
    <div className="page-standalone-wrapper dark-page-bg">
      <div className="page-standalone-container">
        <div className="page-header-block">
          <span className="page-tag">{t('reviewsTitle')}</span>
          <h1 className="page-main-title">{t('reviewsTitle')}</h1>
          <p className="page-sub-lead">{t('reviewsSub')}</p>
        </div>

        <div className="reviews-standalone-grid">
          {reviews.map((r) => (
            <div key={r.id} className="review-standalone-card glass-panel">
              <div className="rev-header">
                <div className="user-icon-circle"><IconUsers size={20} /></div>
                <div>
                  <h4>{t(r.nameKey)}</h4>
                  <span className="rev-dev-tag">{t(r.devKey)} • {t(r.dateKey)}</span>
                </div>
              </div>
              <div className="stars-row">
                <IconStar /><IconStar /><IconStar /><IconStar /><IconStar />
              </div>
              <p className="rev-body-text">&quot;{t(r.textKey)}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
