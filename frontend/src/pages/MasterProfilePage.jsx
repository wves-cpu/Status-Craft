import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateMasterProfile } from '../api/ordersApi';
import { IconGear, IconMapPin, IconPhone, IconClock, IconTelegram, IconShield, IconCheck, IconArrowLeft } from '../components/SvgIcons';
import TechBackground from '../components/TechBackground';
import './MasterProfilePage.css';

export default function MasterProfilePage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState(user?.shopName || 'StatusCraft Repair Center');
  const [shopAddress, setShopAddress] = useState(user?.shopAddress || 'г. Ташкент, Чиланзарский район, ул. Катартал, 10');
  const [shopPhone, setShopPhone] = useState(user?.shopPhone || '+998 (99) 838 80 08');
  const [workHours, setWorkHours] = useState(user?.workHours || 'Пн-Вс: 09:00 - 20:00 (без выходных)');
  const [description, setDescription] = useState(user?.description || 'Профессиональный ремонт цифровой техники с расширенной гарантией.');
  const [telegram, setTelegram] = useState(user?.telegram || '@blsssmm');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="profile-page-container container">
        <div className="glass-panel text-center" style={{ padding: '3rem' }}>
          <h2>Доступ ограничен</h2>
          <p>Пожалуйста, войдите в систему как мастер.</p>
          <button onClick={() => navigate('/auth')} className="btn btn--primary" style={{ marginTop: '1rem' }}>
            Войти в Кабинет
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const res = await updateMasterProfile({
        shopName,
        shopAddress,
        shopPhone,
        workHours,
        description,
        telegram,
      });
      updateUser(res.user);
      setSuccess('Профиль сервисного центра успешно сохранен!');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Ошибка сохранения профиля');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="master-profile-page-container">
      <TechBackground />

      <div className="master-profile-content container">
        <div className="page-top-nav">
          <button className="btn-back-link" onClick={() => navigate('/dashboard')}>
            <IconArrowLeft size={18} />
            <span>Вернуться в Панель Управления</span>
          </button>
        </div>

        <div className="profile-hero-header">
          <div className="badge-pill-cyan">
            <IconGear size={18} />
            <span>Кабинет Управления Мастерской</span>
          </div>
          <h1>Настройки Профиля Сервисного Центра</h1>
          <p>
            Информация из этого раздела отображается на публичной странице мастерских (`/workshops`) и доступна клиентам при трекинге заказов.
          </p>
        </div>

        {success && (
          <div className="profile-success-alert glass-panel">
            <IconCheck size={24} />
            <span>{success}</span>
          </div>
        )}

        {error && <div className="profile-error-alert">{error}</div>}

        <div className="profile-grid-layout">
          {/* Main Edit Form */}
          <div className="profile-card-form glass-panel">
            <h3>Управление данными мастерской</h3>

            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="form-group">
                <label>Название сервисного центра / компании</label>
                <div className="input-with-icon">
                  <IconGear size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="StatusCraft Repair Center"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Адрес мастерской / филиала</label>
                <div className="input-with-icon">
                  <IconMapPin size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="г. Ташкент, Чиланзарский район, ул. Катартал, 10"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Телефон компании</label>
                  <div className="input-with-icon">
                    <IconPhone size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="+998 (99) 838 80 08"
                      value={shopPhone}
                      onChange={(e) => setShopPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Telegram мастера / поддержки</label>
                  <div className="input-with-icon">
                    <IconTelegram size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="@blsssmm"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Режим работы</label>
                <div className="input-with-icon">
                  <IconClock size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Пн-Вс: 09:00 - 20:00 (без выходных)"
                    value={workHours}
                    onChange={(e) => setWorkHours(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>О компании, опыте и оборудовании</label>
                <div className="input-with-icon">
                  <IconShield size={18} className="input-icon icon-top" />
                  <textarea
                    placeholder="Опишите ваши ключевые услуги, спецоборудование, гарантийные обязательства..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={submitting}>
                {submitting ? 'Сохранение данных...' : 'Сохранить изменения профиля'}
              </button>
            </form>
          </div>

          {/* Right Info Box: Telegram Integration Info */}
          <div className="profile-side-info glass-panel">
            <h3>📱 Telegram Бот Уведомлений</h3>
            <p className="side-desc">
              Ваш аккаунт мастера автоматически получает мгновенные уведомления о новых заказах и сообщениях клиентов прямо в Telegram.
            </p>

            <div className="telegram-instructions-box">
              <div className="step-item">
                <span className="step-num">1</span>
                <div>
                  <strong>Найдите бота в Telegram</strong>
                  <p>Наберите `@StatusCraftBot` или откройте ссылку поддержки.</p>
                </div>
              </div>

              <div className="step-item">
                <span className="step-num">2</span>
                <div>
                  <strong>Отправьте команду авторизации</strong>
                  <code>/login {user?.email} ваш_пароль</code>
                </div>
              </div>

              <div className="step-item">
                <span className="step-num">3</span>
                <div>
                  <strong>Всё готово!</strong>
                  <p>Уведомления о заявках клиентов будут поступать мгновенно.</p>
                </div>
              </div>
            </div>

            <div className="preview-card-box">
              <h4>Как клиент видит вашу мастерскую:</h4>
              <div className="preview-mini-card">
                <strong className="mini-title">{shopName || 'StatusCraft Center'}</strong>
                <span className="mini-addr">📍 {shopAddress}</span>
                <span className="mini-phone">📞 {shopPhone}</span>
                <span className="mini-hours">⏰ {workHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
