import { useState, useEffect, useMemo } from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import OrderReceiptModal from '../components/OrderReceiptModal';
import MasterProfileModal from '../components/MasterProfileModal';
import StatusNoteModal from '../components/StatusNoteModal';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { IconChart, IconWrench, IconCheck, IconThumbUp, IconSearch, IconGear } from '../components/SvgIcons';
import './DashboardPage.css';

const FILTER_TABS = [
  'all',
  'qabul_qilindi',
  'diagnostika',
  'tamirlanmoqda',
  'tayyor',
  'topshirildi',
  'bekor_qilindi',
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);

  // Status Note Modal state
  const [statusChangeTarget, setStatusChangeTarget] = useState(null); // { order, targetStatus }

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError('Buyurtmalarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOpenStatusModal = (order, targetStatus) => {
    setStatusChangeTarget({ order, targetStatus });
  };

  const handleConfirmStatusChange = async (targetStatus, statusNote) => {
    if (!statusChangeTarget) return;
    try {
      const updated = await updateOrderStatus(statusChangeTarget.order._id, targetStatus, statusNote);
      setOrders((prev) => prev.map((o) => (o._id === statusChangeTarget.order._id ? updated : o)));
      setStatusChangeTarget(null);
    } catch (err) {
      alert('Statusni yangilashda xatolik yuz berdi');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Haqiqatan ham ushbu buyurtmani o\'chirmoqchimisiz?')) return;
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      alert('Buyurtmani o\'chirishda xatolik yuz berdi');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === 'all' || order.status === activeTab;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        order.clientName.toLowerCase().includes(query) ||
        order.clientPhone.toLowerCase().includes(query) ||
        order.description.toLowerCase().includes(query) ||
        order.trackingToken?.toLowerCase().includes(query);
      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = orders.length;
    const active = orders.filter((o) => ['qabul_qilindi', 'diagnostika', 'tamirlanmoqda'].includes(o.status)).length;
    const ready = orders.filter((o) => o.status === 'tayyor').length;
    const completed = orders.filter((o) => o.status === 'topshirildi').length;
    return { total, active, ready, completed };
  }, [orders]);

  return (
    <div className="dashboard-container">
      {/* Header Bar */}
      <div className="dashboard-header-bar">
        <div>
          <h1 className="dashboard-title">{t('dashTitle')}</h1>
          <p className="dashboard-subtitle">
            {user?.shopName || 'StatusCraft Repair Center'} • {t('dashSubtitle')}
          </p>
        </div>

        <div className="dash-header-actions">
          <button className="btn btn--secondary" onClick={() => setShowProfileModal(true)}>
            <IconGear size={16} /> Настройки Сервиса
          </button>
          <button className="btn btn--primary btn-new-order" onClick={() => setShowOrderModal(true)}>
            {t('dashNewOrder')}
          </button>
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div className="dash-stats-grid">
        <div className="dash-stat-card glass-panel">
          <span className="stat-icon"><IconChart size={22} className="icon-cyan" /></span>
          <div>
            <span className="stat-val">{stats.total}</span>
            <span className="stat-lbl">{t('dashTotalOrders')}</span>
          </div>
        </div>

        <div className="dash-stat-card glass-panel border-blue">
          <span className="stat-icon"><IconWrench size={22} className="icon-cyan" /></span>
          <div>
            <span className="stat-val">{stats.active}</span>
            <span className="stat-lbl">{t('dashActiveOrders')}</span>
          </div>
        </div>

        <div className="dash-stat-card glass-panel border-green">
          <span className="stat-icon"><IconCheck size={22} className="icon-green" /></span>
          <div>
            <span className="stat-val">{stats.ready}</span>
            <span className="stat-lbl">{t('dashReadyOrders')}</span>
          </div>
        </div>

        <div className="dash-stat-card glass-panel border-indigo">
          <span className="stat-icon"><IconThumbUp size={22} className="icon-indigo" /></span>
          <div>
            <span className="stat-val">{stats.completed}</span>
            <span className="stat-lbl">{t('dashCompletedOrders')}</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="dashboard-controls-card glass-panel">
        <div className="search-bar-box">
          <span className="search-icon"><IconSearch size={18} /></span>
          <input
            type="text"
            placeholder={t('dashSearchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs-row">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              className={`filter-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? t('dashFilterAll') : t(`status_${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Order Table View */}
      <div className="dashboard-table-card glass-panel">
        {loading ? (
          <div className="dash-loading-state">Yuklanmoqda...</div>
        ) : error ? (
          <div className="dash-error-state">{error}</div>
        ) : (
          <OrderList
            orders={filteredOrders}
            onStatusChangeRequest={handleOpenStatusModal}
            onDeleteOrder={handleDeleteOrder}
            onPrintReceipt={(order) => setSelectedReceiptOrder(order)}
          />
        )}
      </div>

      {/* Create Order Modal */}
      {showOrderModal && (
        <OrderForm
          onCreated={(newOrder) => {
            setOrders((prev) => [newOrder, ...prev]);
            setShowOrderModal(false);
          }}
          onClose={() => setShowOrderModal(false)}
        />
      )}

      {/* Master Profile Modal */}
      {showProfileModal && (
        <MasterProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      {/* Status Note Modal */}
      {statusChangeTarget && (
        <StatusNoteModal
          order={statusChangeTarget.order}
          targetStatus={statusChangeTarget.targetStatus}
          onConfirm={handleConfirmStatusChange}
          onClose={() => setStatusChangeTarget(null)}
        />
      )}

      {/* Receipt Modal */}
      {selectedReceiptOrder && (
        <OrderReceiptModal
          order={selectedReceiptOrder}
          shopName={user?.shopName}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}
    </div>
  );
}
