const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');

async function wipeDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/status-craft';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB:', uri);

    await User.deleteMany({});
    console.log('All users deleted.');

    await Order.deleteMany({});
    console.log('All orders deleted.');

    console.log('Database wiped clean successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error wiping database:', err.message);
    process.exit(1);
  }
}

wipeDatabase();
