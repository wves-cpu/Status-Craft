const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// GET /api/orders/track/:query - Public tracking search by token or client phone
router.get('/track/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    // First try finding by trackingToken
    let order = await Order.findOne({ trackingToken: query }).select('-internalNotes');
    
    // If not found by token, try searching by phone number (removing spaces or formatting)
    if (!order) {
      const cleanPhone = query.replace(/\D/g, '');
      if (cleanPhone.length >= 7) {
        order = await Order.findOne({
          clientPhone: { $regex: cleanPhone, $options: 'i' }
        }).sort({ createdAt: -1 }).select('-internalNotes');
      }
    }

    if (!order) {
      return res.status(404).json({ error: 'Buyurtma topilmadi. Token yoki telefon raqamini tekshiring.' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi: Buyurtmani qidirishda muammo yuz berdi' });
  }
});

// POST /api/orders - yangi buyurtma yaratish
router.post('/', async (req, res) => {
  try {
    const { clientName, clientPhone, description, internalNotes } = req.body;
    const order = await Order.create({
      clientName,
      clientPhone,
      description,
      internalNotes,
    });
    res.status(201).json(order);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// GET /api/orders - buyurtmalar ro'yxati
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// PATCH /api/orders/:id/status - statusni o'zgartirish ва излаб нота қўшиш
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, statusNote } = req.body;
    const updateData = { status };
    if (statusNote !== undefined) {
      updateData.statusNote = statusNote;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Buyurtma topilmadi' });
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: 'Statusni yangilashda xatolik' });
  }
});

// DELETE /api/orders/:id - buyurtmani o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Buyurtma topilmadi' });
    }
    res.json({ message: 'Buyurtma o\'chirildi', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
