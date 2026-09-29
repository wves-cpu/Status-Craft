const TelegramBot = require('node-telegram-bot-api');
const Order = require('../models/Order');
const User = require('../models/User');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8872843593:AAGS6OAsLj1aGU_ai5_cpEvVMXapLYe3zHE';

let bot = null;

const STATUS_LABELS = {
  qabul_qilindi: '📥 Принят на склад / Ожидает диагностики',
  diagnostika: '🔬 На диагностике у мастера',
  tamirlanmoqda: '🛠 Находится в процессе ремонта',
  tayyor: '🎉 ГОТОВ К ВЫДАЧЕ! Можно забирать',
  topshirildi: '✅ Выдан клиенту (Завершен)',
  bekor_qilindi: '❌ Отменен',
};

function initTelegramBot() {
  if (!BOT_TOKEN) {
    console.warn('[TelegramBot] Token missing. Skipping bot startup.');
    return;
  }

  try {
    bot = new TelegramBot(BOT_TOKEN, { polling: true });

    bot.on('polling_error', (error) => {
      console.error('[TelegramBot] Polling error:', error.message || error);
    });

    console.log('[TelegramBot] Telegram Bot successfully started.');

    // /start Command
    bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      // Check if user is already a linked Master
      const masterUser = await User.findOne({ telegramChatId: String(chatId) });

      if (masterUser) {
        return bot.sendMessage(
          chatId,
          `👋 Здравствуйте, Мастер *${masterUser.name}*!\n\nВы привязаны к мастерской: *${masterUser.shopName}*\nЗдесь вы будете получать мгновенные уведомления о новых заказах и сообщениях клиентов.`,
          {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                [{ text: '📋 Активные заказы' }, { text: 'ℹ️ О мастерской' }],
                [{ text: '🚪 Выйти из кабинета мастера' }]
              ],
              resize_keyboard: true
            }
          }
        );
      }

      // Default Client Menu
      bot.sendMessage(
        chatId,
        `👋 Добро пожаловать в сервис управления ремонтом *StatusCraft*!\n\nВыберите действие в меню ниже:`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [
              [{ text: '📱 Проверить статус заказа' }, { text: '📞 Контакты и График' }],
              [{ text: '👨‍🔧 Вход для Мастера' }, { text: '💡 Помощь' }]
            ],
            resize_keyboard: true
          }
        }
      );
    });

    // Handle Keyboard Text Commands
    bot.on('message', async (msg) => {
      if (!msg.text || msg.text.startsWith('/')) return;

      const chatId = msg.chat.id;
      const text = msg.text.trim();

      // Master Login Option selected
      if (text === '👨‍🔧 Вход для Мастера') {
        return bot.sendMessage(
          chatId,
          `🔐 *Авторизация Мастера*\n\nЧтобы привязать этот Telegram аккаунт к кабинету мастера, отправьте сообщение формата:\n\n\`/login email password\`\n\n_Пример:_ \`/login master@statuscraft.uz 123456\``,
          { parse_mode: 'Markdown' }
        );
      }

      // Contacts & Schedule
      if (text === '📞 Контакты и График') {
        return bot.sendMessage(
          chatId,
          `🏢 *StatusCraft Repair Center*\n\n📍 *Адрес:* г. Ташкент, Чиланзарский р-н, ул. Катартал, 10\n📞 *Телефон:* +998 (99) 838 80 08\n⏰ *Время работы:* Пн-Вс: 09:00 - 20:00 (без выходных)\n✈️ *Telegram поддержки:* @blsssmm`,
          { parse_mode: 'Markdown' }
        );
      }

      // Help
      if (text === '💡 Помощь') {
        return bot.sendMessage(
          chatId,
          `ℹ️ *Справка StatusCraft*\n\n• Чтобы проверить статус вашего гаджета, наберите в чате номер телефона или код трекинга.\n• Клиенты автоматически получают уведомления при каждом изменении статуса ремонта.\n• Мастера получают оповещения о новых заявках в режиме реального времени.`,
          { parse_mode: 'Markdown' }
        );
      }

      // Check Status Option selected
      if (text === '📱 Проверить статус заказа') {
        return bot.sendMessage(
          chatId,
          `🔍 Введите Ваш номер телефона (например: \`+998901234567\`) или код трекинга из 6+ символов:`,
          { parse_mode: 'Markdown' }
        );
      }

      // Active orders for master
      if (text === '📋 Активные заказы') {
        const masterUser = await User.findOne({ telegramChatId: String(chatId) });
        if (!masterUser) {
          return bot.sendMessage(chatId, '❌ Вы не авторизованы как мастер.');
        }

        const activeOrders = await Order.find({ status: { $ne: 'topshirildi' } }).sort({ createdAt: -1 }).limit(5);

        if (activeOrders.length === 0) {
          return bot.sendMessage(chatId, '📭 Активных заказов нет.');
        }

        let reply = `📋 *Последние активные заказы (${activeOrders.length}):*\n\n`;
        activeOrders.forEach((ord, i) => {
          reply += `${i + 1}. *#${ord.trackingToken.slice(-6).toUpperCase()}* — ${ord.clientName}\n`;
          reply += `   📱 ${ord.clientPhone}\n`;
          reply += `   🛠 ${ord.description}\n`;
          reply += `   ⚙️ ${STATUS_LABELS[ord.status] || ord.status}\n\n`;
        });

        return bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
      }

      // Master Info
      if (text === 'ℹ️ О мастерской') {
        const masterUser = await User.findOne({ telegramChatId: String(chatId) });
        if (!masterUser) return;
        return bot.sendMessage(
          chatId,
          `🏪 *Ваша мастерская:*\nName: ${masterUser.shopName}\nPhone: ${masterUser.shopPhone}\nAddress: ${masterUser.shopAddress}\nEmail: ${masterUser.email}`
        );
      }

      // Logout master
      if (text === '🚪 Выйти из кабинета мастера') {
        await User.updateOne({ telegramChatId: String(chatId) }, { $set: { telegramChatId: '' } });
        return bot.sendMessage(
          chatId,
          `🚪 Вы успешно вышли из системы мастеров.`,
          {
            reply_markup: {
              keyboard: [
                [{ text: '📱 Проверить статус заказа' }, { text: '📞 Контакты и График' }],
                [{ text: '👨‍🔧 Вход для Мастера' }, { text: '💡 Помощь' }]
              ],
              resize_keyboard: true
            }
          }
        );
      }

      // Try searching for orders if user sent text (phone or token)
      const cleanInput = text.trim();
      const cleanPhone = cleanInput.replace(/\D/g, '');

      let order = await Order.findOne({ trackingToken: cleanInput });

      if (!order && cleanPhone.length >= 7) {
        order = await Order.findOne({
          clientPhone: { $regex: cleanPhone, $options: 'i' }
        }).sort({ createdAt: -1 });
      }

      if (order) {
        // Link client's telegram chat ID to this order for future notifications
        order.telegramChatId = String(chatId);
        await order.save();

        const statusStr = STATUS_LABELS[order.status] || order.status;
        const noteStr = order.statusNote ? `\n📝 *Заметка/Диагноз:* ${order.statusNote}` : '';

        return bot.sendMessage(
          chatId,
          `✅ *Заказ найден и привязан к вашим уведомлениям!*\n\n` +
          `🔑 *Код трекинга:* \`${order.trackingToken.slice(-6).toUpperCase()}\`\n` +
          `👤 *Имя:* ${order.clientName}\n` +
          `📞 *Телефон:* ${order.clientPhone}\n` +
          `🛠 *Проблема:* ${order.description}\n` +
          `⚙️ *Статус:* ${statusStr}` +
          `${noteStr}\n\n` +
          `🔔 Вы автоматически получите уведомление в этот чат, когда статус ремонта изменится!`,
          { parse_mode: 'Markdown' }
        );
      }
    });

    // Command: /login email password
    bot.onText(/\/login (.+) (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const email = match[1].trim().toLowerCase();
      const password = match[2].trim();

      const user = await User.findOne({ email });
      if (!user) {
        return bot.sendMessage(chatId, `❌ Пользователь с email "${email}" не найден.`);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return bot.sendMessage(chatId, `❌ Неверный пароль. Попробуйте снова.`);
      }

      user.telegramChatId = String(chatId);
      user.telegramNotifications = true;
      await user.save();

      bot.sendMessage(
        chatId,
        `✅ *Успешная авторизация!*\n\nПриветствуем, *${user.name}*!\nТеперь Вы будете получать уведомления о новых заказах клиентов прямо здесь.`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            keyboard: [
              [{ text: '📋 Активные заказы' }, { text: 'ℹ️ О мастерской' }],
              [{ text: '🚪 Выйти из кабинета мастера' }]
            ],
            resize_keyboard: true
          }
        }
      );
    });

  } catch (err) {
    console.error('[TelegramBot] Failed to initialize bot:', err.message);
  }
}

/**
 * Notify all registered Masters about a new order
 */
async function notifyNewOrderToMasters(order) {
  if (!bot) return;

  try {
    const masters = await User.find({
      telegramChatId: { $ne: '' },
      telegramNotifications: true,
    });

    const tokenShort = order.trackingToken ? order.trackingToken.slice(-6).toUpperCase() : 'N/A';
    const text =
      `🔔 *НОВАЯ ЗАЯВКА НА РЕМОНТ!*\n\n` +
      `🔑 *Код заказа:* \`#${tokenShort}\`\n` +
      `👤 *Клиент:* ${order.clientName}\n` +
      `📞 *Телефон:* ${order.clientPhone}\n` +
      `🛠 *Неисправность:* ${order.description}\n` +
      `📅 *Дата:* ${new Date(order.createdAt || Date.now()).toLocaleString('ru-RU')}`;

    for (const master of masters) {
      if (master.telegramChatId) {
        try {
          await bot.sendMessage(master.telegramChatId, text, { parse_mode: 'Markdown' });
        } catch (e) {
          console.error(`[TelegramBot] Could not send to master ${master.email}:`, e.message);
        }
      }
    }
  } catch (err) {
    console.error('[TelegramBot] Error in notifyNewOrderToMasters:', err.message);
  }
}

/**
 * Notify Client when their order status is updated
 */
async function notifyStatusUpdateToClient(order) {
  if (!bot) return;

  try {
    let chatId = order.telegramChatId;

    // If order doesn't have a telegramChatId stored directly, search if client's phone was registered
    if (!chatId && order.clientPhone) {
      const cleanPhone = order.clientPhone.replace(/\D/g, '');
      if (cleanPhone.length >= 7) {
        const matchingOrder = await Order.findOne({
          clientPhone: { $regex: cleanPhone, $options: 'i' },
          telegramChatId: { $ne: '' }
        });
        if (matchingOrder) {
          chatId = matchingOrder.telegramChatId;
        }
      }
    }

    if (!chatId) return;

    const tokenShort = order.trackingToken ? order.trackingToken.slice(-6).toUpperCase() : 'N/A';
    const statusStr = STATUS_LABELS[order.status] || order.status;
    const noteStr = order.statusNote ? `\n📝 *Детали / Диагноз:* ${order.statusNote}` : '';

    let extraMsg = '';
    if (order.status === 'tayyor') {
      extraMsg = '\n\n🎉 *Ваш устройство готово к выдаче!* Вы можете забрать его в нашем сервисном центре: ул. Катартал, 10.';
    } else if (order.status === 'topshirildi') {
      extraMsg = '\n\n🤝 Спасибо, что выбрали StatusCraft! Будем рады Вашему отзыву.';
    }

    const text =
      `⚙️ *ОБНОВЛЕНИЕ СТАТУСА ЗАКАЗА #${tokenShort}*\n\n` +
      `👤 *Клиент:* ${order.clientName}\n` +
      `📌 *Новый статус:* ${statusStr}` +
      `${noteStr}` +
      `${extraMsg}\n\n` +
      `📞 Контакт мастера: +998 (99) 838 80 08`;

    await bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('[TelegramBot] Error in notifyStatusUpdateToClient:', err.message);
  }
}

module.exports = {
  initTelegramBot,
  notifyNewOrderToMasters,
  notifyStatusUpdateToClient,
};
