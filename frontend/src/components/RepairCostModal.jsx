import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createOrder } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';
import {
  IconPhone,
  IconLaptop,
  IconPc,
  IconTv,
  IconConsole,
  IconTablet,
  IconUser,
  IconCheck,
} from './SvgIcons';
import './RepairCostModal.css';

const DEVICE_TYPES = [
  { id: 'phone', nameKey: 'catSmartphones', icon: <IconPhone size={24} />, basePrice: 150000 },
  { id: 'laptop', nameKey: 'catLaptops', icon: <IconLaptop size={24} />, basePrice: 200000 },
  { id: 'pc', nameKey: 'catComputers', icon: <IconPc size={24} />, basePrice: 180000 },
  { id: 'tv', nameKey: 'catTVs', icon: <IconTv size={24} />, basePrice: 250000 },
  { id: 'console', nameKey: 'catConsoles', icon: <IconConsole size={24} />, basePrice: 220000 },
  { id: 'tablet', nameKey: 'catTablets', icon: <IconTablet size={24} />, basePrice: 170000 },
];

const REPAIR_TYPES = [
  { id: 'screen', nameKey: 'probScreen', priceMult: 1.5 },
  { id: 'battery', nameKey: 'probBattery', priceMult: 1.0 },
  { id: 'port', nameKey: 'probPort', priceMult: 0.8 },
  { id: 'board', nameKey: 'probBoard', priceMult: 2.2 },
  { id: 'software', nameKey: 'probSoftware', priceMult: 0.6 },
];

export default function RepairCostModal({ initialDevice = 'phone', onClose }) {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();

  const urlDev = searchParams.get('device');
  const [selectedDevice, setSelectedDevice] = useState(urlDev || initialDevice);
  const [selectedRepair, setSelectedRepair] = useState('screen');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (urlDev) {
      setSelectedDevice(urlDev);
    }
  }, [urlDev]);

  const devObj = DEVICE_TYPES.find((d) => d.id === selectedDevice) || DEVICE_TYPES[0];
  const repObj = REPAIR_TYPES.find((r) => r.id === selectedRepair) || REPAIR_TYPES[0];
  const estimatedPriceUZS = Math.round(devObj.basePrice * repObj.priceMult);

  const formatPrice = (amountUZS) => {
    if (lang === 'ru') {
      const rub = Math.round(amountUZS / 130);
      return `${rub.toLocaleString('ru-RU')} ₽`;
    }
    if (lang === 'en') {
      const usd = Math.round(amountUZS / 12800);
      return `$${usd}`;
    }
    return `${amountUZS.toLocaleString('uz-UZ')} so'm`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const deviceName = t(devObj.nameKey);
      const repairName = t(repObj.nameKey);
      const description = `${deviceName} - ${repairName}`;
      const order = await createOrder({
        clientName,
        clientPhone,
        description,
        internalNotes: `Калькулятор: ${t('calcFrom')} ${formatPrice(estimatedPriceUZS)}`,
      });
      setCreatedOrder(order);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="calc-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="calc-modal-header">
          <div>
            <h2>{t('calcModalTitle')}</h2>
            <p className="sub">{t('calcModalSubtitle')}</p>
          </div>
          <button className="btn-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {createdOrder ? (
          <div className="calc-success-box">
            <div className="success-badge-glow">
              <IconCheck size={32} />
            </div>
            <h3>{t('calcSuccessTitle')}</h3>
            <p>{t('calcSuccessDesc')}</p>

            <div className="token-display">
              <span>{t('calcSuccessToken')}</span>
              <code>{createdOrder.trackingToken}</code>
            </div>

            <button className="btn btn--primary btn--full" onClick={onClose}>
              {t('receiptCloseBtn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="calc-form">
            {/* Step 1: Device */}
            <div className="calc-step">
              <label className="step-title">{t('calcStep1')}</label>
              <div className="calc-device-grid">
                {DEVICE_TYPES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`calc-dev-btn ${selectedDevice === d.id ? 'active' : ''}`}
                    onClick={() => setSelectedDevice(d.id)}
                  >
                    <span className="icon-wrapper">{d.icon}</span>
                    <span className="label">{t(d.nameKey)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Repair Type */}
            <div className="calc-step">
              <label className="step-title">{t('calcStep2')}</label>
              <div className="calc-repair-list">
                {REPAIR_TYPES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`calc-rep-btn ${selectedRepair === r.id ? 'active' : ''}`}
                    onClick={() => setSelectedRepair(r.id)}
                  >
                    <span>{t(r.nameKey)}</span>
                    <span className="dot"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Preview */}
            <div className="calc-price-preview">
              <span className="price-label">{t('calcPriceEst')}</span>
              <span className="price-value">
                {t('calcFrom')} {formatPrice(estimatedPriceUZS)}
              </span>
            </div>

            {/* Step 3: Contact Inputs */}
            <div className="calc-step">
              <label className="step-title">{t('calcStep3')}</label>
              <div className="calc-inputs-row">
                <div className="input-with-icon">
                  <IconUser size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder={t('contactFormNamePlaceholder')}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-with-icon">
                  <IconPhone size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder={t('contactFormPhonePlaceholder')}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && <div className="calc-error-alert">{error}</div>}

            <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
              {submitting ? '...' : t('calcSubmitBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
