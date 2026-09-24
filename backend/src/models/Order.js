const mongoose = require('mongoose');
const crypto = require('crypto');

const ORDER_STATUSES = [
  'qabul_qilindi',
  'diagnostika',
  'tamirlanmoqda',
  'tayyor',
  'topshirildi',
  'bekor_qilindi',
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
    internalNotes: {
      type: String,
      trim: true,
      default: '',
    },
    statusNote: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'qabul_qilindi',
    },
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
