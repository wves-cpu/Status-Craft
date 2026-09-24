import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IconWrench, IconCheck } from './SvgIcons';
import './StatusNoteModal.css';

export default function StatusNoteModal({ order, targetStatus, onConfirm, onClose }) {
  const { t } = useLanguage();
  const [note, setNote] = useState(order?.statusNote || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    onConfirm(targetStatus, note);
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="status-note-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <IconWrench size={20} />
            </div>
            <div>
              <h2>Изменение статуса ремонта</h2>
              <p className="modal-subtitle">
                Новый статус: <span className={`status-badge-inline status-${targetStatus}`}>{t(`status_${targetStatus}`)}</span>
              </p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="status-note-form">
          <div className="order-summary-chip glass-panel">
            <strong>{order.clientName}</strong> • {order.description}
          </div>

          <div className="form-group">
            <label>Добавить комментарий / результат диагностики (для клиента)</label>
            <div className="input-with-icon">
              <IconWrench size={18} className="input-icon icon-top" />
              <textarea
                placeholder="Например: Проведена первичная диагностика. Требуется замена шлейфа дисплея..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                autoFocus
              />
            </div>
            <span className="input-hint">Этот комментарий будет виден клиенту на странице отслеживания.</span>
          </div>

          <div className="modal-actions-row">
            <button type="submit" className="btn btn--primary btn--flex" disabled={submitting}>
              <IconCheck size={18} /> {submitting ? 'Сохранение...' : 'Обновить статус'}
            </button>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
