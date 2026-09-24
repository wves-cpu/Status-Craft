import { useLanguage } from '../context/LanguageContext';
import './OrderReceiptModal.css';

export default function OrderReceiptModal({ order, shopName = 'StatusCraft Service Center', onClose }) {
  const { t } = useLanguage();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Generate simple SVG QR code visual for order token
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(order.trackingToken)}`;

  return (
    <div className="receipt-modal-backdrop" onClick={onClose}>
      <div className="receipt-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <div className="receipt-logo">
            Status<strong>Craft</strong>
          </div>
          <span className="receipt-badge">RECEIPT #SC-{order._id?.slice(-6).toUpperCase()}</span>
        </div>

        <div className="receipt-body">
          <h2 className="receipt-title">{t('receiptTitle')}</h2>
          
          <div className="receipt-shop-info">
            <p><strong>{t('receiptShop')}</strong> {shopName}</p>
            <p><strong>{t('receiptPhone')}</strong> +998 (99) 838 80 08</p>
            <p><strong>{t('colDate')}:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-details">
            <div className="detail-row">
              <span className="label">{t('trackClient')}</span>
              <span className="value">{order.clientName}</span>
            </div>
            <div className="detail-row">
              <span className="label">{t('trackPhone')}</span>
              <span className="value">{order.clientPhone}</span>
            </div>
            <div className="detail-row">
              <span className="label">{t('trackDevice')}</span>
              <span className="value description">{order.description}</span>
            </div>
            <div className="detail-row">
              <span className="label">{t('trackCurrentStatus')}</span>
              <span className={`status-pill status-${order.status}`}>
                {t(`status_${order.status}`)}
              </span>
            </div>
          </div>

          <div className="receipt-qr-box">
            <img src={qrUrl} alt="Order QR Code" className="qr-img" />
            <div className="qr-token-info">
              <span className="token-label">{t('receiptOrderToken')}</span>
              <code className="token-code">{order.trackingToken}</code>
              <p className="instruction">{t('receiptInstruction')}</p>
            </div>
          </div>
        </div>

        <div className="receipt-footer no-print">
          <button className="btn btn--primary" onClick={handlePrint}>
            🖨️ {t('receiptPrintBtn')}
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            {t('receiptCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
