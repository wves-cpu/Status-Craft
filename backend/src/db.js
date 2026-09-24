const mongoose = require('mongoose');

async function connectDB() {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/status-craft';

  try {
    // Try connecting to local or URI first
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB ulanishi o\'rnatildi:', uri);
  } catch (err) {
    console.log('Local MongoDB ga ulanib bo\'lmadi, MongoMemoryServer ishga tushirilmoqda...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const memoryServer = await MongoMemoryServer.create({
        instance: { dbName: 'status-craft' }
      });
      uri = memoryServer.getUri();
      await mongoose.connect(uri);
      console.log('MongoMemoryServer muvaffaqiyatli ishga tushdi va ulandi');
    } catch (memErr) {
      console.error('MongoDB ulanish xatosi (In-Memory va Local ishlamadi):', memErr.message);
    }
  }
}

module.exports = connectDB;
