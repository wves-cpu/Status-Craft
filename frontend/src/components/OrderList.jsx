import { useLanguage } from '../context/LanguageContext';
import { IconPrint, IconTrash, IconWrench } from './SvgIcons';

const STATUS_OPTIONS = [
  'qabul_qilindi',
  'diagnostika',
  'tamirlanmoqda',
  'tayyor',
  'topshirildi',
  'bekor_qilindi',
];

export default function OrderList({ orders, onStatusChangeRequest, onDeleteOrder, onPrintReceipt }) {
  const { t } = useLanguage();

  if (!orders || orders.length === 0) {
    return <div className="empty-orders-state">{t('dashNoOrders')}</div>;
  }

  return (
    <div className="table-responsive-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th>{t('colId')}</th>
            <th>{t('colClient')}</th>
            <th>{t('colPhone')}</th>
            <th>{t('colDesc')}</th>
            <th>{t('colStatus')}</th>
            <th>{t('colDate')}</th>
            <th>{t('colActions')}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="order-row-animated">
              <td>
                <code className="order-token-chip">{order.trackingToken?.slice(0, 8)}...</code>
              </td>
              <td className="client-name-cell">
                <strong>{order.clientName}</strong>
              </td>
              <td>{order.clientPhone}</td>
              <td className="desc-cell">
                <div>{order.description}</div>
                {order.statusNote && (
                  <div className="order-status-note-pill">
                    <IconWrench size={12} /> {order.statusNote}
                  </div>
                )}
              </td>
              <td>
                <select
                  className={`status-select status-${order.status}`}
                  value={order.status}
                  onChange={(e) => onStatusChangeRequest(order, e.target.value)}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {t(`status_${st}`)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="date-cell">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-receipt"
                  onClick={() => onPrintReceipt(order)}
                  title={t('actPrintReceipt')}
                >
                  <IconPrint size={16} />
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => onDeleteOrder(order._id)}
                  title={t('actDelete')}
                >
                  <IconTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
