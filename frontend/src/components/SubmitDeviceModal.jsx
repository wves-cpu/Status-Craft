import { useState } from 'react';
import { createOrder } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';
import { IconUser, IconPhone, IconWrench, IconCheck, IconGear } from './SvgIcons';
import './SubmitDeviceModal.css';

export default function SubmitDeviceModal({ onClose }) {
  const { t } = useLanguage();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder({
        clientName,
        clientPhone,
        description,
        internalNotes: 'Онлайн заявка с сайта',
      });
      setCreatedOrder(order);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="submit-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <IconWrench size={20} />
            </div>
            <div>
              <h2>{t('submitTitle')}</h2>
              <p className="modal-subtitle">{t('submitSubtitle')}</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {createdOrder ? (
          <div className="submit-success-box">
            <div className="success-badge-glow">
              <IconCheck size={32} />
            </div>
            <h3>{t('submitSuccessTitle')}</h3>
            <p className="success-sub">{t('submitSuccessText')}</p>
            <div className="token-card-box">
              <span className="token-label">{t('trackTokenLabel')}</span>
              <code className="generated-token">{createdOrder.trackingToken}</code>
            </div>
            <p className="sub-hint">{t('submitKeepToken')}</p>
            <button className="btn btn--primary btn--full" onClick={onClose}>
              {t('receiptCloseBtn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="submit-form">
            {error && <div className="submit-error-alert">{error}</div>}

            <div className="form-group">
              <label>{t('formClientName')}</label>
              <div className="input-with-icon">
                <IconUser size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="Александр Смирнов"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('formClientPhone')}</label>
              <div className="input-with-icon">
                <IconPhone size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="+998 (90) 123-45-67"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('formDescription')}</label>
              <div className="input-with-icon">
                <IconGear size={18} className="input-icon icon-top" />
                <textarea
                  placeholder="iPhone 14 Pro — замена экрана и чистка динамиков..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="modal-actions-row">
              <button type="submit" className="btn btn--primary btn--flex" disabled={submitting}>
                {submitting ? 'Отправка...' : t('formSubmit')}
              </button>
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                {t('formCancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
