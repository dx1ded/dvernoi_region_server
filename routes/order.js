import { Router } from "express"

import { bot } from "../services/telegramBot.js"
import { User } from "../models/User.js"

export const order = Router()

const types = {
  "type": "Тип доставки",
  "name": "Имя",
  "lastName": "Фамилия",
  "phone": "Телефон",
  "email": "Почта",
  "address": "Адресс"
}

const generateMessage = (userData, order) => (`
Данные пользователя:

${userData.map(({ name, value }) => `${types[name]}: ${value}`).join("\n")}

Подробности о заказе:
${order.map((item, index) => (`
${index + 1}. ${item.name}
Артикул: ${item.articul}
Количество: ${item.count}
Цена: ${item.price} рублей.
Ссылка: ${item.link}
Дополнительно:
${item.equipments.map((equipment) => (`
- ${equipment.name}: ${equipment.count} шт.
`)).join("")}
`)).join("")}

Сумма:
${order.reduce((sum, { price, count }) => sum += +price * count, 0)} рублей.
`) 

order.post("/", async (req, res) => {
  const data = req.body

  if (!data) {
    return res.status(400)
  }

  const { userData, order } = data
  const users = await User.find({})
  
  users.forEach((user) => {
    const id = user.userid

    bot.telegram.sendMessage(id, generateMessage(userData, order))
  })

  res.sendStatus(200)
})

order.post("/measure", async (req, res) => {
  const data = req.body

  if (!data) {
    return res.status(400)
  }

  const { name, phone, link } = data

  console.log(data)

  const users = await getUsersId()

  users.forEach((user) => {
    const id = user.data().id

    bot.telegram.sendMessage(id,
`
Имя: ${name}
Телефон: ${phone}
Открытый товар: ${link}
`
    )
  })

  res.sendStatus(200)
})
