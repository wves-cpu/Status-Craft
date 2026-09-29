import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IconCreditCard, IconCheck, IconShield, IconDollarSign, IconQrCode, IconArrowLeft } from '../components/SvgIcons';
import TechBackground from '../components/TechBackground';
import './PaymentPage.css';

const PAYMENT_CATEGORIES = [
  {
    id: 'uz',
    name: '🇺🇿 Узбекистан (UZS)',
    methods: [
      { id: 'click', name: 'Click.uz', badge: '0% комиссия', desc: 'Оплата по номеру телефона или QR-коду', color: '#0284c7' },
      { id: 'payme', name: 'Payme', badge: 'Мгновенно', desc: 'Автоматическое зачисление 24/7', color: '#06b6d4' },
      { id: 'uzum', name: 'Uzum Bank', badge: 'Кэшбэк 2%', desc: 'Оплата в приложении Uzum', color: '#8b5cf6' },
    ],
  },
  {
    id: 'ru',
    name: '🇷🇺 Россия (RUB)',
    methods: [
      { id: 'sber', name: 'СберБанк (СБП)', badge: 'Без комиссии', desc: 'Мгновенный перевод по номеру телефона', color: '#22c55e' },
      { id: 'tinkoff', name: 'Т-Банк (Тинькофф)', badge: 'Быстрый перевод', desc: 'Прямой перевод на карту/СБП', color: '#eab308' },
      { id: 'sbp', name: 'СБП QR-код', badge: 'Все банки РФ', desc: 'Сканируйте QR через банковское приложение', color: '#3b82f6' },
    ],
  },
  {
    id: 'global',
    name: '🌐 Международные (USD / EUR)',
    methods: [
      { id: 'visa', name: 'Visa / MasterCard', badge: 'Apple Pay & Google Pay', desc: 'Принимаются карты любых банков мира', color: '#6366f1' },
    ],
  },
  {
    id: 'crypto',
    name: '🪙 Криптовалюта (USDT)',
    methods: [
      { id: 'usdt', name: 'USDT TRC20 / BEP20', badge: 'Instant Web3', desc: 'Депозит на кошелек TRC20 с мгновенной проверкой', color: '#10b981' },
    ],
  },
];

export default function PaymentPage() {
  const { t } = useLanguage();
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('click');

  const [orderToken, setOrderToken] = useState('');
  const [amount, setAmount] = useState('150 000');
  const [cardNumber, setCardNumber] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const categoriesSliderRef = useRef(null);

  const currentCat = PAYMENT_CATEGORIES[selectedCatIndex];

  const handlePrevCategory = () => {
    const newIdx = selectedCatIndex === 0 ? PAYMENT_CATEGORIES.length - 1 : selectedCatIndex - 1;
    setSelectedCatIndex(newIdx);
    setSelectedMethod(PAYMENT_CATEGORIES[newIdx].methods[0].id);
  };

  const handleNextCategory = () => {
    const newIdx = selectedCatIndex === PAYMENT_CATEGORIES.length - 1 ? 0 : selectedCatIndex + 1;
    setSelectedCatIndex(newIdx);
    setSelectedMethod(PAYMENT_CATEGORIES[newIdx].methods[0].id);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPaidSuccess(true);
    }, 1200);
  };

  return (
    <div className="payment-page-container">
      <TechBackground />

      <div className="payment-page-content container">
        {/* Header Hero */}
        <div className="payment-hero-header">
          <div className="payment-badge-pill">
            <IconCreditCard size={18} />
            <span>Шлюз Онлайн Оплаты StatusCraft</span>
          </div>
          <h1 className="payment-page-title">Безопасная Оплата Ремонта</h1>
          <p className="payment-page-subtitle">
            Выбирайте удобный способ: карты Узбекистана (Click, Payme, Uzum), банки РФ (Сбер, Т-Банк, СБП), международные Visa/MasterCard или USDT.
          </p>
        </div>

        {paidSuccess ? (
          <div className="payment-success-card glass-panel dark-glow">
            <div className="success-badge-glow">
              <IconCheck size={48} />
            </div>
            <h2>Оплата успешно прошла!</h2>
            <p className="success-sub">Чек и статус ремонта обновлены в системе StatusCraft.</p>

            <div className="payment-receipt-box">
              <div className="receipt-row">
                <span>Код заказа:</span>
                <strong>#{orderToken ? orderToken.toUpperCase() : '8F2A9C'}</strong>
              </div>
              <div className="receipt-row">
                <span>Сумма платежа:</span>
                <strong className="text-highlight">{amount} сум / ₽ / $</strong>
              </div>
              <div className="receipt-row">
                <span>Платёжная система:</span>
                <strong>{selectedMethod.toUpperCase()}</strong>
              </div>
              <div className="receipt-row">
                <span>ID Транзакции:</span>
                <code>TX-{Math.random().toString(36).substring(2, 10).toUpperCase()}</code>
              </div>
            </div>

            <button
              className="btn btn--primary btn--lg btn--full"
              onClick={() => {
                setPaidSuccess(false);
                setOrderToken('');
              }}
            >
              Сделать новый платеж
            </button>
          </div>
        ) : (
          <div className="payment-main-grid">
            {/* Left Column: Method Selector with Sleek Arrows */}
            <div className="payment-selector-card glass-panel">
              <div className="slider-header-row">
                <h3>1. Выберите регион и валюту</h3>
                
                {/* Custom Sleek SVG Arrows */}
                <div className="slider-arrow-btns">
                  <button
                    type="button"
                    className="btn-arrow-nav"
                    onClick={handlePrevCategory}
                    title="Предыдущая категория"
                  >
                    <IconArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="btn-arrow-nav arrow-next"
                    onClick={handleNextCategory}
                    title="Следующая категория"
                  >
                    <IconArrowLeft size={20} />
                  </button>
                </div>
              </div>

              {/* Categories Tabs Bar */}
              <div className="categories-tabs-nav" ref={categoriesSliderRef}>
                {PAYMENT_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-tab-btn ${selectedCatIndex === idx ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCatIndex(idx);
                      setSelectedMethod(cat.methods[0].id);
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Methods List */}
              <div className="methods-cards-wrapper">
                <h4 className="section-label">Доступные способы оплаты в выбранном регионе:</h4>
                <div className="methods-cards-grid">
                  {currentCat.methods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className={`method-full-card ${selectedMethod === m.id ? 'active' : ''}`}
                      onClick={() => setSelectedMethod(m.id)}
                    >
                      <div className="method-card-top">
                        <span className="method-card-name">{m.name}</span>
                        <span className="method-card-badge" style={{ backgroundColor: m.color + '22', color: m.color, borderColor: m.color + '44' }}>
                          {m.badge}
                        </span>
                      </div>
                      <p className="method-card-desc">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="payment-form-card glass-panel">
              <h3>2. Введите данные платежа</h3>
              
              <form onSubmit={handlePay} className="payment-form">
                <div className="form-group">
                  <label>Номер или Код заказа</label>
                  <div className="input-with-icon">
                    <IconShield size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Например: 8F2A9C или +998901234567"
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

                {currentCat.id === 'uz' && (
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

                {(currentCat.id === 'ru' || currentCat.id === 'global') && (
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

                {currentCat.id === 'crypto' && (
                  <div className="crypto-details-box glass-panel">
                    <div className="qr-sim-box">
                      <IconQrCode size={56} className="icon-cyan" />
                    </div>
                    <div className="crypto-txt">
                      <span className="crypto-label">USDT TRC20 Адрес кошелька:</span>
                      <code className="crypto-address">TYu89XmP2kLw9QsVzB4nRtYc1mWqR7aE9p</code>
                      <p className="crypto-subtext">После перевода укажите хеш или кликните Оплатить</p>
                    </div>
                  </div>
                )}

                <div className="payment-summary-box">
                  <div className="summary-row">
                    <span>Выбранный способ:</span>
                    <strong>{selectedMethod.toUpperCase()}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Комиссия:</span>
                    <span className="text-green">0% (Бесплатно)</span>
                  </div>
                </div>

                <button type="submit" className="btn btn--primary btn--full btn--pay-glow btn--lg" disabled={submitting}>
                  {submitting ? 'Обработка платежа...' : `Подтвердить Оплату ${amount}`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
