import "dotenv/config"

import { Telegraf } from "telegraf"
import { User } from "../models/User.js"

export const bot = new Telegraf(process.env.botToken)

bot.start(async (ctx) => {
  ctx.reply("Вы подписались на рассылку заказов")

  await User.findOneAndUpdate({ userid: ctx.message.chat.id }, {}, {
    new: true,
    upsert: true
  })
})

bot.launch()
