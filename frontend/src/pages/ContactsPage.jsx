import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IconPhone, IconTelegram, IconMapPin, IconUser, IconGear } from '../components/SvgIcons';
import './ContactsPage.css';

export default function ContactsPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-standalone-wrapper dark-page-bg">
      <div className="page-standalone-container">
        <div className="page-header-block">
          <span className="page-tag">{t('contactsTitle')}</span>
          <h1 className="page-main-title">{t('contactsTitle')}</h1>
          <p className="page-sub-lead">{t('contactsSub')}</p>
        </div>

        <div className="contacts-standalone-grid">
          {/* Left Info Cards */}
          <div className="contacts-info-cards">
            <div className="contact-card-item glass-panel">
              <IconPhone size={28} className="icon-cyan" />
              <div>
                <h4>{t('contactsTitle')}</h4>
                <a href="tel:+998998388008" className="contact-bold-link">
                  {t('contactsPhone')}
                </a>
                <p>{t('contactsPhoneSub')}</p>
              </div>
            </div>

            <div className="contact-card-item glass-panel">
              <IconTelegram size={28} className="icon-cyan" />
              <div>
                <h4>Telegram</h4>
                <a href="https://t.me/blsssmm" target="_blank" rel="noreferrer" className="contact-bold-link">
                  {t('contactsTg')}
                </a>
                <p>{t('contactsTgSub')}</p>
              </div>
            </div>

            <div className="contact-card-item glass-panel">
              <IconMapPin size={28} className="icon-cyan" />
              <div>
                <h4>{t('contactsTitle')}</h4>
                <p className="contact-bold-txt">{t('contactsAddress')}</p>
                <p>{t('contactsAddressSub')}</p>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="contact-form-card glass-panel">
            <h3>{t('contactFormTitle')}</h3>
            {sent ? (
              <div className="contact-sent-msg">
                {t('contactFormSuccess')}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="c-form">
                <div className="form-group">
                  <label>{t('contactFormNameLabel')}</label>
                  <div className="input-with-icon">
                    <IconUser size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder={t('contactFormNamePlaceholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('contactFormPhoneLabel')}</label>
                  <div className="input-with-icon">
                    <IconPhone size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder={t('contactFormPhonePlaceholder')}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('contactFormMsgLabel')}</label>
                  <div className="input-with-icon">
                    <IconGear size={18} className="input-icon icon-top" />
                    <textarea
                      placeholder={t('contactFormMsgPlaceholder')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full">
                  {t('contactFormSubmitBtn')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
