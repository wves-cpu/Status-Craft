const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'statuscraft_super_secret_jwt_key_2026';

// Helper function to sign JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Auth middleware for internal use
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Ruxsat berilmadi: Token mavjud emas' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Ruxsat berilmadi: Yaroqsiz token' });
  }
};

// POST /api/auth/register - Ro'yxatdan o'tish
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, shopName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Barcha majburiy maydonlarni to\'ldiring' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email manzil allaqachon ro\'yxatdan o\'tgan' });
    }

    const user = await User.create({
      name,
      email,
      password,
      shopName: shopName || 'StatusCraft Repair Center',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Serverda xatolik yuz berdi' });
  }
});

// POST /api/auth/login - Tizimga kirish
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email va parolni kiriting' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email yoki parol noto\'g\'ri' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email yoki parol noto\'g\'ri' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
  }
});

// GET /api/auth/me - Joriy foydalanuvchi profili
router.get('/me', protect, async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  }
  res.json({ user: req.user });
});

// GET /api/auth/workshops - Public list of all service centers / workshops
router.get('/workshops', async (req, res) => {
  try {
    const workshops = await User.find().select('-password').sort({ rating: -1, createdAt: -1 });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: 'Сервисные центры временно недоступны' });
  }
});

// PUT /api/auth/profile - Update master workshop profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { shopName, shopAddress, shopPhone, workHours, description, telegram } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'Мастер не найден' });
    }

    if (shopName) user.shopName = shopName;
    if (shopAddress) user.shopAddress = shopAddress;
    if (shopPhone) user.shopPhone = shopPhone;
    if (workHours) user.workHours = workHours;
    if (description) user.description = description;
    if (telegram) user.telegram = telegram;

    await user.save();

    res.json({
      message: 'Профиль сервиса успешно обновлен!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        shopAddress: user.shopAddress,
        shopPhone: user.shopPhone,
        workHours: user.workHours,
        description: user.description,
        telegram: user.telegram,
        rating: user.rating,
        reviewsCount: user.reviewsCount,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: ' Ошибка при обновлении профиля сервиса' });
  }
});

module.exports = router;
module.exports.protect = protect;
