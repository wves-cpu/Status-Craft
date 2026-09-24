import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMasterProfile } from '../api/ordersApi';
import { IconGear, IconMapPin, IconPhone, IconClock, IconTelegram } from './SvgIcons';
import './MasterProfileModal.css';

export default function MasterProfileModal({ onClose }) {
  const { user, updateUser } = useAuth();

  const [shopName, setShopName] = useState(user?.shopName || '');
  const [shopAddress, setShopAddress] = useState(user?.shopAddress || '');
  const [shopPhone, setShopPhone] = useState(user?.shopPhone || '');
  const [workHours, setWorkHours] = useState(user?.workHours || '');
  const [description, setDescription] = useState(user?.description || '');
  const [telegram, setTelegram] = useState(user?.telegram || '@blsssmm');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setSuccess('Профиль сервиса успешно сохранен!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Ошибка сохранения профиля');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="profile-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="title-icon-badge">
              <IconGear size={22} />
            </div>
            <div>
              <h2>Управление Сервисом</h2>
              <p className="modal-subtitle">Редактирование публичной информации о мастерской</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {success && <div className="submit-success-alert">✅ {success}</div>}
        {error && <div className="submit-error-alert">{error}</div>}

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
              <label>Telegram мастера / сервиса</label>
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
            <label>О компании и услугах</label>
            <div className="input-with-icon">
              <IconGear size={18} className="input-icon icon-top" />
              <textarea
                placeholder="Опишите ваши ключевые услуги, оборудование, гарантию..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>
          </div>

          <div className="modal-actions-row">
            <button type="submit" className="btn btn--primary btn--flex" disabled={submitting}>
              {submitting ? 'Сохранение...' : 'Сохранить изменения'}
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
