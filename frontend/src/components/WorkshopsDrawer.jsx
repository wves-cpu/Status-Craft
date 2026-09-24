import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchWorkshops } from '../api/ordersApi';
import {
  IconGear,
  IconPhone,
  IconTelegram,
  IconMapPin,
  IconClock,
  IconStar,
  IconUser,
  IconShield,
} from './SvgIcons';
import './WorkshopsDrawer.css';

export default function WorkshopsDrawer({ isOpen, onClose, onSelectSubmit }) {
  const { t } = useLanguage();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchWorkshops()
        .then((data) => {
          setWorkshops(data && data.length > 0 ? data : getFallbackWorkshops());
        })
        .catch(() => {
          setWorkshops(getFallbackWorkshops());
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const getFallbackWorkshops = () => [
    {
      _id: 'w1',
      shopName: 'StatusCraft Flagship Center',
      name: 'Александр Смирнов (Главный инженер)',
      shopAddress: 'г. Ташкент, Чиланзарский район, ул. Катартал, 10',
      shopPhone: '+998 (99) 838 80 08',
      workHours: 'Пн-Вс: 09:00 - 20:00 (без выходных)',
      description: 'Авторизованный сервисный центр. Сложная BGA пайка, замена дисплейных модулей Apple, Samsung, Xiaomi.',
      telegram: '@blsssmm',
      rating: 4.9,
      reviewsCount: 142,
    },
    {
      _id: 'w2',
      shopName: 'StatusCraft Tech Hub',
      name: 'Игорь Васильев (Специалист ПК)',
      shopAddress: 'г. Ташкент, Юнусабадский район, пр. Амира Темура, 45',
      shopPhone: '+998 (90) 123 45 67',
      workHours: 'Пн-Сб: 10:00 - 19:00',
      description: 'Ремонт и сборка игровых ПК, восстановление ноутбуков, чистка PlayStation 5 и замена жидкого металла.',
      telegram: '@blsssmm',
      rating: 4.8,
      reviewsCount: 98,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-dark" onClick={onClose}>
      <div className="workshops-drawer-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header-row">
          <div className="drawer-title-group">
            <div className="title-icon-badge">
              <IconGear size={22} />
            </div>
            <div>
              <h2>Сервисные центры и Мастера</h2>
              <p className="drawer-subtitle">Выберите проверенную мастерскую или свяжитесь напрямую</p>
            </div>
          </div>
          <button className="btn-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="workshops-list-scroll">
          {loading ? (
            <div className="drawer-loading-state">Загрузка мастерских...</div>
          ) : (
            workshops.map((shop) => (
              <div key={shop._id} className="workshop-card glass-panel">
                <div className="workshop-top-info">
                  <div>
                    <h3 className="shop-title">{shop.shopName || 'StatusCraft Repair Center'}</h3>
                    <div className="master-name-tag">
                      <IconUser size={14} /> {shop.name}
                    </div>
                  </div>
                  <div className="rating-badge">
                    <IconStar size={16} /> <strong>{shop.rating || 4.9}</strong> ({shop.reviewsCount || 120})
                  </div>
                </div>

                <p className="shop-desc-text">{shop.description}</p>

                <div className="shop-details-grid">
                  <div className="detail-pill">
                    <IconMapPin size={16} className="icon-cyan" />
                    <span>{shop.shopAddress || 'г. Ташкент, Чиланзарский район'}</span>
                  </div>
                  <div className="detail-pill">
                    <IconClock size={16} className="icon-cyan" />
                    <span>{shop.workHours || 'Пн-Вс: 09:00 - 20:00'}</span>
                  </div>
                </div>

                <div className="shop-card-actions">
                  <a href={`tel:${shop.shopPhone?.replace(/\s/g, '') || '+998998388008'}`} className="btn btn--secondary btn--sm">
                    <IconPhone size={16} /> Call
                  </a>
                  <a href="https://t.me/blsssmm" target="_blank" rel="noreferrer" className="btn btn--telegram btn--sm">
                    <IconTelegram size={16} /> Telegram
                  </a>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => {
                      onClose();
                      onSelectSubmit?.();
                    }}
                  >
                    <IconShield size={16} /> Сдать в ремонт
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
