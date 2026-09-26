import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IconCreditCard, IconCheck, IconShield, IconDollarSign, IconQrCode } from './SvgIcons';
import './PaymentModal.css';

const PAYMENT_CATEGORIES = [
  {
    id: 'uz',
    name: '🇺🇿 Узбекистан (UZS)',
    methods: [
      { id: 'click', name: 'Click.uz', badge: '0% комиссия', color: '#0284c7' },
      { id: 'payme', name: 'Payme', badge: 'Мгновенно', color: '#06b6d4' },
      { id: 'uzum', name: 'Uzum Bank', badge: 'Кэшбэк 2%', color: '#8b5cf6' },
    ],
  },
  {
    id: 'ru',
    name: '🇷🇺 Россия (RUB)',
    methods: [
      { id: 'sber', name: 'СберБанк (СБП)', badge: 'Без комиссии', color: '#22c55e' },
      { id: 'tinkoff', name: 'Т-Банк (Тинькофф)', badge: 'Быстрый перевод', color: '#eab308' },
      { id: 'sbp', name: 'СБП QR-код', badge: 'Все банки РФ', color: '#3b82f6' },
    ],
  },
  {
    id: 'global',
    name: '🌐 Международные (USD / EUR)',
    methods: [
      { id: 'visa', name: 'Visa / MasterCard', badge: 'Apple Pay & Google Pay', color: '#6366f1' },
    ],
  },
  {
    id: 'crypto',
    name: '🪙 Криптовалюта (USDT)',
    methods: [
      { id: 'usdt', name: 'USDT TRC20 / BEP20', badge: 'Instant Web3', color: '#10b981' },
    ],
  },
];

export default function PaymentModal({ defaultAmount = '150 000', defaultToken = '', onClose }) {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('uz');
  const [selectedMethod, setSelectedMethod] = useState('click');

  const [orderToken, setOrderToken] = useState(defaultToken);
  const [amount, setAmount] = useState(defaultAmount);
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const currentCatObj = PAYMENT_CATEGORIES.find((c) => c.id === selectedCat) || PAYMENT_CATEGORIES[0];

  const handlePay = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPaidSuccess(true);
    }, 1200);
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="payment-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <IconCreditCard size={22} />
            </div>
            <div>
              <h2>Онлайн Оплата Ремонта</h2>
              <p className="modal-subtitle">Поддержка карт Узбекистана, РФ и международных платежей</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {paidSuccess ? (
          <div className="payment-success-view">
            <div className="success-badge-glow">
              <IconCheck size={36} />
            </div>
            <h3>Оплата успешно завершена!</h3>
            <p className="success-sub">Чек и статус ремонта обновлены в системе StatusCraft.</p>

            <div className="payment-receipt-box">
              <div className="receipt-row">
                <span>Сумма платежа:</span>
                <strong>{amount} сум / ₽ / $</strong>
              </div>
              <div className="receipt-row">
                <span>Шлюз оплаты:</span>
                <strong>{selectedMethod.toUpperCase()}</strong>
              </div>
              <div className="receipt-row">
                <span>Код транзакции:</span>
                <code>TX-{Math.random().toString(36).substring(2, 10).toUpperCase()}</code>
              </div>
            </div>

            <button className="btn btn--primary btn--full" onClick={onClose}>
              {t('receiptCloseBtn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="payment-form">
            {/* Category Tabs */}
            <div className="payment-cat-tabs">
              {PAYMENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`payment-cat-btn ${selectedCat === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setSelectedMethod(cat.methods[0].id);
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Methods Row */}
            <div className="payment-methods-grid">
              {currentCatObj.methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`method-select-card ${selectedMethod === m.id ? 'active' : ''}`}
                  onClick={() => setSelectedMethod(m.id)}
                >
                  <span className="method-name">{m.name}</span>
                  <span className="method-badge">{m.badge}</span>
                </button>
              ))}
            </div>

            {/* Amount & Token Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label>Код заказа / Трек-код</label>
                <div className="input-with-icon">
                  <IconShield size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Например: 8F2A9C..."
                    value={orderToken}
                    onChange={(e) => setOrderToken(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Сумма к оплате</label>
                <div className="input-with-icon">
                  <IconDollarSign size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="150 000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Gateway Inputs */}
            {selectedCat === 'uz' && (
              <div className="form-group">
                <label>Номер телефона для SMS подтверждения</label>
                <div className="input-with-icon">
                  <IconCreditCard size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="+998 (90) 123-45-67"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {(selectedCat === 'ru' || selectedCat === 'global') && (
              <div className="form-group">
                <label>Номер карты / Телефон СБП</label>
                <div className="input-with-icon">
                  <IconCreditCard size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="8600 •••• •••• ••••"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {selectedCat === 'crypto' && (
              <div className="crypto-address-box glass-panel">
                <div className="qr-sim-box">
                  <IconQrCode size={48} className="icon-cyan" />
                </div>
                <div className="crypto-txt">
                  <span>USDT Address (TRC20):</span>
                  <code>TYu89XmP2kLw9QsVzB4nRtYc1mWqR7aE9p</code>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn--primary btn--full btn--pay-glow" disabled={submitting}>
              {submitting ? 'Обработка платежа...' : `Оплатить ${amount}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
