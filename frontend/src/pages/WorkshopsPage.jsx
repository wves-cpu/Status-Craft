import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchWorkshops } from '../api/ordersApi';
import SubmitDeviceModal from '../components/SubmitDeviceModal';
import {
  IconGear,
  IconPhone,
  IconTelegram,
  IconMapPin,
  IconClock,
  IconStar,
  IconUser,
  IconShield,
  IconWrench,
} from '../components/SvgIcons';
import './WorkshopsPage.css';

export default function WorkshopsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    fetchWorkshops()
      .then((data) => {
        setWorkshops(data && data.length > 0 ? data : getFallbackWorkshops());
      })
      .catch(() => {
        setWorkshops(getFallbackWorkshops());
      })
      .finally(() => setLoading(false));
  }, []);

  const getFallbackWorkshops = () => [
    {
      _id: 'w1',
      shopName: 'StatusCraft Flagship Center',
      name: 'Александр Смирнов',
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
      name: 'Игорь Васильев',
      shopAddress: 'г. Ташкент, Юнусабадский район, пр. Амира Темура, 45',
      shopPhone: '+998 (90) 123 45 67',
      workHours: 'Пн-Сб: 10:00 - 19:00',
      description: 'Ремонт и сборка игровых ПК, восстановление ноутбуков, чистка PlayStation 5 и замена жидкого металла.',
      telegram: '@blsssmm',
      rating: 4.8,
      reviewsCount: 98,
    },
  ];

  return (
    <div className="page-standalone-wrapper dark-page-bg">
      <div className="page-standalone-container">
        {/* Page Header */}
        <div className="page-header-block text-center">
          <span className="page-tag">
            <IconWrench size={16} /> {t('catTitle')}
          </span>
          <h1 className="page-main-title">Каталог Мастерских и Сервисных Центров</h1>
          <p className="page-sub-lead">
            Авторизованные мастерские StatusCraft с официальной гарантией до 12 месяцев, оригинальными запчастями и сертифицированными инженерами.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="workshops-fullpage-grid">
          {loading ? (
            <div className="workshops-loading-box">
              <IconGear size={28} className="spin-gear-icon" />
              <span>Загрузка списка мастерских...</span>
            </div>
          ) : (
            workshops.map((shop) => (
              <div key={shop._id} className="workshop-full-card glass-panel">
                <div className="card-top-header">
                  <div className="shop-title-wrapper">
                    <div className="shop-icon-box">
                      <IconWrench size={22} />
                    </div>
                    <div>
                      <h2 className="workshop-name">{shop.shopName || 'StatusCraft Repair Center'}</h2>
                      <div className="master-badge">
                        <IconUser size={14} /> Инженер: <strong>{shop.name}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="rating-pill">
                    <IconStar size={16} />
                    <span><strong>{shop.rating || 4.9}</strong> ({shop.reviewsCount || 120} отзывов)</span>
                  </div>
                </div>

                <p className="workshop-bio">{shop.description}</p>

                <div className="workshop-info-pillars">
                  <div className="info-pillar-item">
                    <IconMapPin size={18} className="icon-cyan" />
                    <div>
                      <span className="info-lbl">Адрес сервиса:</span>
                      <strong className="info-txt">{shop.shopAddress || 'г. Ташкент, Чиланзарский район'}</strong>
                    </div>
                  </div>

                  <div className="info-pillar-item">
                    <IconClock size={18} className="icon-cyan" />
                    <div>
                      <span className="info-lbl">Режим работы:</span>
                      <strong className="info-txt">{shop.workHours || 'Пн-Вс: 09:00 - 20:00'}</strong>
                    </div>
                  </div>
                </div>

                <div className="workshop-card-footer-actions">
                  <a
                    href={`tel:${shop.shopPhone?.replace(/\s/g, '') || '+998998388008'}`}
                    className="btn btn--secondary"
                  >
                    <IconPhone size={18} /> {shop.shopPhone || '+998 (99) 838 80 08'}
                  </a>

                  <a
                    href="https://t.me/blsssmm"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--telegram"
                  >
                    <IconTelegram size={18} /> Telegram
                  </a>

                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setShowSubmitModal(true)}
                  >
                    <IconShield size={18} /> Сдать устройство
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showSubmitModal && (
        <SubmitDeviceModal onClose={() => setShowSubmitModal(false)} />
      )}
    </div>
  );
}
