// Backenddagi Order.ORDER_STATUSES bilan mos bo'lishi kerak.
export const ORDER_STATUS_LABELS = {
  qabul_qilindi: 'Qabul qilindi',
  diagnostika: 'Diagnostika',
  tamirlanmoqda: "Ta'mirlanmoqda",
  tayyor: 'Tayyor',
  topshirildi: 'Topshirildi',
};

export function statusLabel(status) {
  return ORDER_STATUS_LABELS[status] || status;
}
