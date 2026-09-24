import { useState } from 'react';
import { createOrder } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';
import { IconUser, IconPhone, IconWrench, IconGear } from './SvgIcons';

const EMPTY_FORM = {
  clientName: '',
  clientPhone: '',
  description: '',
  internalNotes: '',
};

export default function OrderForm({ onCreated, onClose }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder(form);
      setForm(EMPTY_FORM);
      onCreated?.(order);
    } catch (err) {
      const message = err.response?.data?.error || 'Buyurtma yaratilmadi. Qaytadan urinib ko\'ring.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="submit-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <IconWrench size={20} />
            </div>
            <div>
              <h2>{t('formTitle')}</h2>
              <p className="modal-subtitle">{t('dashSubtitle')}</p>
            </div>
          </div>
          {onClose && (
            <button className="btn-modal-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="submit-form">
          {error && <div className="submit-error-alert">{error}</div>}

          <div className="form-group">
            <label>{t('formClientName')}</label>
            <div className="input-with-icon">
              <IconUser size={18} className="input-icon" />
              <input
                name="clientName"
                placeholder="Александр Смирнов"
                value={form.clientName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('formClientPhone')}</label>
            <div className="input-with-icon">
              <IconPhone size={18} className="input-icon" />
              <input
                name="clientPhone"
                placeholder="+998 (90) 123-45-67"
                value={form.clientPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('formDescription')}</label>
            <div className="input-with-icon">
              <IconWrench size={18} className="input-icon icon-top" />
              <textarea
                name="description"
                placeholder="MacBook Pro 16 — не включается после попадания влаги..."
                value={form.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('formInternalNotes')}</label>
            <div className="input-with-icon">
              <IconGear size={18} className="input-icon icon-top" />
              <textarea
                name="internalNotes"
                placeholder="Внутренняя заметка мастера (диагностика, детали)..."
                value={form.internalNotes}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>

          <div className="modal-actions-row">
            <button type="submit" className="btn btn--primary btn--flex" disabled={submitting}>
              {submitting ? 'Yuklanmoqda...' : t('formSubmit')}
            </button>
            {onClose && (
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                {t('formCancel')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
