import TelegramBot from 'node-telegram-bot-api'
import { db } from './db.js'
import cron from 'node-cron'

const token = '7945406309:AAFozBuVUsxX10DIX0fn91SjMpjRDHb5B-I'
const bot = new TelegramBot(token, { polling: true })

// Меню кнопок
const mainMenu = {
    reply_markup: {
        keyboard: [
            ['💰 Добавить доход', '💸 Добавить расход'],
            ['📊 Баланс', '⏰ Цели'],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
}

// Обработка команд /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id

    const userExists = db.data.users.find((u) => u.chatId === chatId)
    if (!userExists) {
        db.data.users.push({ chatId, balance: 0, reminders: [] })
        await db.write()
    }

    bot.sendMessage(chatId, `👼 Привет! Я — Надежный Ангел твоих финансов.`, mainMenu)
})
