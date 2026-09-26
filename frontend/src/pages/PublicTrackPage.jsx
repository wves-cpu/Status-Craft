import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import PaymentModal from '../components/PaymentModal';
import {
  IconSearch,
  IconClock,
  IconPhone,
  IconWrench,
  IconCheck,
  IconThumbUp,
  IconUser,
  IconShield,
  IconCreditCard,
} from '../components/SvgIcons';
import './PublicTrackPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const TRACKING_STEPS = [
  { key: 'qabul_qilindi', icon: <IconClock size={18} /> },
  { key: 'diagnostika', icon: <IconSearch size={18} /> },
  { key: 'tamirlanmoqda', icon: <IconWrench size={18} /> },
  { key: 'tayyor', icon: <IconCheck size={18} /> },
  { key: 'topshirildi', icon: <IconThumbUp size={18} /> },
];

export default function PublicTrackPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [queryInput, setQueryInput] = useState(token || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchTrackOrder = async (searchToken) => {
    if (!searchToken?.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/orders/track/${encodeURIComponent(searchToken.trim())}`);
      setOrder(res.data);
    } catch (err) {
      setOrder(null);
      setError(err.response?.data?.error || t('trackNotFound'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setQueryInput(token);
      fetchTrackOrder(token);
    }
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (queryInput.trim()) {
      navigate(`/track/${encodeURIComponent(queryInput.trim())}`);
      fetchTrackOrder(queryInput.trim());
    }
  };

  const getStepIndex = (status) => {
    if (status === 'bekor_qilindi') return -1;
    return TRACKING_STEPS.findIndex((s) => s.key === status);
  };

  const currentStepIdx = order ? getStepIndex(order.status) : -1;

  return (
    <div className="track-page-container">
      <div className="track-search-card glass-panel">
        <div className="track-header-badge">
          <IconSearch size={22} className="icon-cyan" />
        </div>
        <h1 className="track-title">{t('trackTitle')}</h1>
        <p className="track-subtitle">{t('trackSub')}</p>

        <form onSubmit={handleSearch} className="track-search-form">
          <div className="input-with-icon track-input-wrap">
            <IconSearch size={18} className="input-icon" />
            <input
              type="text"
              placeholder={t('trackInputPlaceholder')}
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              className="track-input"
            />
          </div>
          <button type="submit" className="btn btn--primary btn-track-submit" disabled={loading}>
            {loading ? '...' : t('trackBtn')}
          </button>
        </form>

        {error && <div className="track-alert-error">{error}</div>}
      </div>

      {order && (
        <div className="track-result-card glass-panel fade-in">
          <div className="track-result-header">
            <div>
              <span className="track-order-id">
                {t('trackTokenLabel')} <code className="token-code">{order.trackingToken}</code>
              </span>
              <h2>{order.description}</h2>
            </div>
            <div className={`status-badge-lg status-${order.status}`}>
              {t(`status_${order.status}`)}
            </div>
          </div>

          <div className="track-details-grid">
            <div className="track-detail-item">
              <span className="label"><IconUser size={14} /> {t('trackClientLabel')}</span>
              <span className="val">{order.clientName}</span>
            </div>
            <div className="track-detail-item">
              <span className="label"><IconPhone size={14} /> {t('trackPhoneLabel')}</span>
              <span className="val">{order.clientPhone}</span>
            </div>
            <div className="track-detail-item">
              <span className="label"><IconClock size={14} /> {t('trackDateLabel')}</span>
              <span className="val">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="track-detail-item">
              <span className="label"><IconShield size={14} /> {t('trackTokenLabel')}</span>
              <code className="val token">{order.trackingToken}</code>
            </div>
          </div>

          <div className="track-timeline-section">
            <h3>{t('trackTitle')}</h3>

            {order.statusNote && (
              <div className="master-note-callout glass-panel">
                <div className="note-badge-header">
                  <IconWrench size={16} /> <strong>Комментарий мастера по диагностике / ремонту:</strong>
                </div>
                <p className="note-body-text">{order.statusNote}</p>
              </div>
            )}

            {order.status === 'bekor_qilindi' ? (
              <div className="cancelled-banner">
                ❌ {t('status_bekor_qilindi')}
              </div>
            ) : (
              <div className="timeline-stepper">
                {TRACKING_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div
                      key={step.key}
                      className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className="step-circle">
                        <span className="step-icon">{step.icon}</span>
                      </div>
                      <span className="step-label">{t(`status_${step.key}`)}</span>
                      {idx < TRACKING_STEPS.length - 1 && (
                        <div className={`step-line ${idx < currentStepIdx ? 'active' : ''}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="track-support-footer">
            <button
              type="button"
              className="btn btn--primary btn--full btn--pay-track"
              onClick={() => setShowPaymentModal(true)}
            >
              <IconCreditCard size={18} /> Оплатить ремонт онлайн (Click / Payme / СБП / Visa)
            </button>

            <p style={{ marginTop: '1rem' }}>
              Возникли вопросы? Сверьтесь с мастером:{' '}
              <a href="tel:+998998388008" className="phone-link">
                <IconPhone size={16} /> +998 (99) 838 80 08
              </a>
            </p>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <PaymentModal
          defaultToken={order?.trackingToken || ''}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
