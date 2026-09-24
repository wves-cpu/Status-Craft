import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  IconShield,
  IconClock,
  IconGear,
  IconPhone,
  IconLaptop,
  IconPc,
  IconTv,
  IconConsole,
  IconTablet,
  IconWrench,
  IconRefresh,
  IconSettings,
  IconUsers,
  IconStar,
  IconTelegram,
  IconMapPin,
  IconArrowRight,
  IconGem,
  IconThumbUp,
  IconHeart,
} from '../components/SvgIcons';
import RepairCostModal from '../components/RepairCostModal';
import PublicTrackPage from './PublicTrackPage';
import './LandingPage.css';

export default function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [calcInitialDev, setCalcInitialDev] = useState('phone');
  const [showTrackModal, setShowTrackModal] = useState(false);

  const openCalcForDevice = (devId) => {
    setCalcInitialDev(devId);
    setShowCalcModal(true);
  };

  return (
    <div className="landing-master-container">
      {/* 1. HERO SECTION */}
      <section className="hero-dark-block" id="hero">
        <div className="hero-grid-layout">
          <div className="hero-left-col">
            <h1 className="hero-title-main">
              {t('heroTitle')}
            </h1>

            <p className="hero-desc-text">{t('heroSubtitle')}</p>

            {/* Trust Badges */}
            <div className="hero-badges-row">
              <div className="badge-card glass-panel">
                <IconShield size={22} className="icon-cyan" />
                <div>
                  <strong className="badge-title">{t('heroBadge1Title')}</strong>
                  <span className="badge-sub">{t('heroBadge1Sub')}</span>
                </div>
              </div>

              <div className="badge-card glass-panel">
                <IconClock size={22} className="icon-cyan" />
                <div>
                  <strong className="badge-title">{t('heroBadge2Title')}</strong>
                  <span className="badge-sub">{t('heroBadge2Sub')}</span>
                </div>
              </div>

              <div className="badge-card glass-panel">
                <IconGear size={22} className="icon-cyan" />
                <div>
                  <strong className="badge-title">{t('heroBadge3Title')}</strong>
                  <span className="badge-sub">{t('heroBadge3Sub')}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <Link to="/prices" className="btn btn--primary">
                {t('heroBtnCalc')} <IconArrowRight size={18} />
              </Link>

              <a
                href="https://t.me/blsssmm"
                target="_blank"
                rel="noreferrer"
                className="btn btn--telegram"
              >
                <IconTelegram size={18} /> {t('heroBtnTg')} <IconArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Hero Right Showcase Graphic */}
          <div className="hero-right-col">
            <div className="handwritten-tag">
              ✨ {t('heroTaglineOverlay')}
            </div>

            <div className="devices-vector-showcase glass-panel">
              <div className="dev-box"><IconLaptop size={44} /></div>
              <div className="dev-box"><IconPhone size={40} /></div>
              <div className="dev-box"><IconConsole size={40} /></div>
              <div className="dev-box"><IconPc size={42} /></div>
            </div>

            <div className="hero-side-pillars">
              <div className="pillar-side-card glass-panel">
                <IconGem size={20} className="icon-cyan" />
                <div>
                  <h4>{t('sideCard1Title')}</h4>
                  <p>{t('sideCard1Desc')}</p>
                </div>
              </div>

              <div className="pillar-side-card glass-panel">
                <IconThumbUp size={20} className="icon-cyan" />
                <div>
                  <h4>{t('sideCard2Title')}</h4>
                  <p>{t('sideCard2Desc')}</p>
                </div>
              </div>

              <div className="pillar-side-card glass-panel">
                <IconStar size={20} className="icon-gold" />
                <div>
                  <h4>{t('sideCard3Title')}</h4>
                  <p>{t('sideCard3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEVICE CATEGORIES SECTION ("Что мы ремонтируем") */}
      <section className="section-dark-block" id="devices">
        <div className="section-inner-container">
          <div className="section-top-header">
            <div>
              <h2>{t('catTitle')}</h2>
              <p className="section-sub-desc">{t('catSub')}</p>
            </div>
            <Link to="/prices" className="link-arrow-btn">
              {t('catAllLink')}
            </Link>
          </div>

          <div className="categories-grid-6">
            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('phone')}>
              <div className="cat-svg-icon"><IconPhone size={28} /></div>
              <h3>{t('catSmartphones')}</h3>
              <p>{t('catSmartphonesDesc')}</p>
            </div>

            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('laptop')}>
              <div className="cat-svg-icon"><IconLaptop size={28} /></div>
              <h3>{t('catLaptops')}</h3>
              <p>{t('catLaptopsDesc')}</p>
            </div>

            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('pc')}>
              <div className="cat-svg-icon"><IconPc size={28} /></div>
              <h3>{t('catComputers')}</h3>
              <p>{t('catComputersDesc')}</p>
            </div>

            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('tv')}>
              <div className="cat-svg-icon"><IconTv size={28} /></div>
              <h3>{t('catTVs')}</h3>
              <p>{t('catTVsDesc')}</p>
            </div>

            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('console')}>
              <div className="cat-svg-icon"><IconConsole size={28} /></div>
              <h3>{t('catConsoles')}</h3>
              <p>{t('catConsolesDesc')}</p>
            </div>

            <div className="category-card-dark glass-panel" onClick={() => openCalcForDevice('tablet')}>
              <div className="cat-svg-icon"><IconTablet size={28} /></div>
              <h3>{t('catTablets')}</h3>
              <p>{t('catTabletsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION ("Наши услуги") */}
      <section className="section-dark-block" id="services">
        <div className="section-inner-container">
          <div className="section-top-header">
            <div>
              <h2>{t('servTitle')}</h2>
              <p className="section-sub-desc">{t('servSub')}</p>
            </div>
            <Link to="/services" className="link-arrow-btn">
              {t('servAllLink')}
            </Link>
          </div>

          <div className="services-grid-6">
            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconWrench size={26} /></div>
              <h3>{t('serv1Title')}</h3>
              <p>{t('serv1Desc')}</p>
            </div>

            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconGear size={26} /></div>
              <h3>{t('serv2Title')}</h3>
              <p>{t('serv2Desc')}</p>
            </div>

            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconRefresh size={26} /></div>
              <h3>{t('serv3Title')}</h3>
              <p>{t('serv3Desc')}</p>
            </div>

            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconSettings size={26} /></div>
              <h3>{t('serv4Title')}</h3>
              <p>{t('serv4Desc')}</p>
            </div>

            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconShield size={26} /></div>
              <h3>{t('serv5Title')}</h3>
              <p>{t('serv5Desc')}</p>
            </div>

            <div className="service-card-dark glass-panel">
              <div className="serv-svg-icon"><IconUsers size={26} /></div>
              <h3>{t('serv6Title')}</h3>
              <p>{t('serv6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US BANNER ("Почему выбирают нас") */}
      <section className="why-us-dark-banner" id="why-us">
        <div className="why-us-inner">
          <h2 className="why-title-txt">{t('whyTitle')}</h2>
          <div className="why-cursive-overlay">
            🔧 {t('whyTaglineOverlay')}
          </div>

          <div className="pillars-grid-4">
            <div className="pillar-card glass-panel">
              <IconUsers size={28} className="icon-cyan" />
              <h4>{t('why1Title')}</h4>
              <p>{t('why1Desc')}</p>
            </div>

            <div className="pillar-card glass-panel">
              <IconShield size={28} className="icon-cyan" />
              <h4>{t('why2Title')}</h4>
              <p>{t('why2Desc')}</p>
            </div>

            <div className="pillar-card glass-panel">
              <IconClock size={28} className="icon-cyan" />
              <h4>{t('why3Title')}</h4>
              <p>{t('why3Desc')}</p>
            </div>

            <div className="pillar-card glass-panel">
              <IconHeart size={28} className="icon-cyan" />
              <h4>{t('why4Title')}</h4>
              <p>{t('why4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS & CONTACTS SPLIT SECTION */}
      <section className="section-dark-block" id="reviews">
        <div className="section-inner-container">
          <div className="split-two-cols">
            {/* Left: Reviews */}
            <div className="reviews-col-block">
              <div className="section-top-header">
                <div>
                  <h2>{t('reviewsTitle')}</h2>
                  <p className="section-sub-desc">{t('reviewsSub')}</p>
                </div>
                <Link to="/reviews" className="link-arrow-btn">
                  {t('reviewsAllLink')}
                </Link>
              </div>

              <div className="reviews-cards-stack">
                <div className="review-card-dark glass-panel">
                  <div className="rev-head">
                    <div className="avatar-placeholder"><IconUsers size={18} /></div>
                    <div>
                      <h4>{t('rev1Name')}</h4>
                      <span className="rev-date">{t('rev1Dev')} • {t('rev1Date')}</span>
                    </div>
                  </div>
                  <div className="stars-ratings"><IconStar /><IconStar /><IconStar /><IconStar /><IconStar /></div>
                  <p className="rev-quote">&quot;{t('rev1Text')}&quot;</p>
                </div>

                <div className="review-card-dark glass-panel">
                  <div className="rev-head">
                    <div className="avatar-placeholder"><IconUsers size={18} /></div>
                    <div>
                      <h4>{t('rev2Name')}</h4>
                      <span className="rev-date">{t('rev2Dev')} • {t('rev2Date')}</span>
                    </div>
                  </div>
                  <div className="stars-ratings"><IconStar /><IconStar /><IconStar /><IconStar /><IconStar /></div>
                  <p className="rev-quote">&quot;{t('rev2Text')}&quot;</p>
                </div>

                <div className="review-card-dark glass-panel">
                  <div className="rev-head">
                    <div className="avatar-placeholder"><IconUsers size={18} /></div>
                    <div>
                      <h4>{t('rev3Name')}</h4>
                      <span className="rev-date">{t('rev3Dev')} • {t('rev3Date')}</span>
                    </div>
                  </div>
                  <div className="stars-ratings"><IconStar /><IconStar /><IconStar /><IconStar /><IconStar /></div>
                  <p className="rev-quote">&quot;{t('rev3Text')}&quot;</p>
                </div>
              </div>
            </div>

            {/* Right: Contacts */}
            <div className="contacts-col-block" id="contacts">
              <div className="section-top-header">
                <div>
                  <h2>{t('contactsTitle')}</h2>
                  <p className="section-sub-desc">{t('contactsSub')}</p>
                </div>
              </div>

              <div className="contact-info-card-dark glass-panel">
                <div className="c-item-row">
                  <IconPhone size={22} className="icon-cyan" />
                  <div>
                    <a href="tel:+998998388008" className="c-phone">
                      {t('contactsPhone')}
                    </a>
                    <span className="c-sub">{t('contactsPhoneSub')}</span>
                  </div>
                </div>

                <div className="c-item-row">
                  <IconTelegram size={22} className="icon-cyan" />
                  <div>
                    <a href="https://t.me/blsssmm" target="_blank" rel="noreferrer" className="c-link">
                      {t('contactsTg')}
                    </a>
                    <span className="c-sub">{t('contactsTgSub')}</span>
                  </div>
                </div>

                <div className="c-item-row">
                  <IconMapPin size={22} className="icon-cyan" />
                  <div>
                    <strong className="c-addr">{t('contactsAddress')}</strong>
                    <span className="c-sub">{t('contactsAddressSub')}</span>
                  </div>
                </div>

                <Link to="/contacts" className="btn btn--secondary btn--full">
                  <IconMapPin size={16} /> {t('contactsMapBtn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showCalcModal && (
        <RepairCostModal initialDevice={calcInitialDev} onClose={() => setShowCalcModal(false)} />
      )}

      {showTrackModal && (
        <div className="modal-backdrop-dark" onClick={() => setShowTrackModal(false)}>
          <div className="track-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="btn-modal-close track-close" onClick={() => setShowTrackModal(false)}>
              ✕
            </button>
            <PublicTrackPage />
          </div>
        </div>
      )}
    </div>
  );
}
