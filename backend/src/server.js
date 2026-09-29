require('dotenv').config();
const app = require('./app');
const connectDB = require('./db');
const { initTelegramBot } = require('./services/telegramBotService');

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    // Start Telegram Bot Service
    initTelegramBot();

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  })
  .catch((err) => {
    console.error('MongoDB ulanishida xatolik:', err.message);
    process.exit(1);
  });
