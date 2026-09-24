const mongoose = require('mongoose');
const crypto = require('crypto');

// Dars 4-5 da holatni almashtirish va Socket.IO shu qiymatlar ustida ishlaydi.
// Taxminiy ro'yxat - aniq bosqichlar 1-7 bo'limlarga qarab aniqlanadi.
const ORDER_STATUSES = [
  'qabul_qilindi',
  'diagnostika',
  'tamirlanmoqda',
  'tayyor',
  'topshirildi',
];

const orderSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Mijoz ismi majburiy'],
      trim: true,
    },
    clientPhone: {
      type: String,
      required: [true, 'Mijoz telefoni majburiy'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Muammo tavsifi majburiy'],
      trim: true,
    },
    // Faqat xodimlar uchun - mijoz kuzatuv API'sida qaytarilmaydi (bo'lim 9 checklist).
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'qabul_qilindi',
    },
    // Mijoz kuzatuv havolasi uchun (dars 4). Ichki tavsif va tokenni mijoz API'si qaytarmasligi kerak.
    trackingToken: {
      type: String,
      unique: true,
      index: true,
      default: () => crypto.randomBytes(16).toString('hex'),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
module.exports.ORDER_STATUSES = ORDER_STATUSES;
