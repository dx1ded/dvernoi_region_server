import { Router } from "express"
import url from "url"

import { Accessory } from "../models/Accessory.js"

export const accessories = Router()

accessories.get("/", async (req, res) => {
  try {
    const id = url.parse(req.url, true).query.id

    if (!id) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await Accessory.find({ _id: id }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    res.json({ product })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})

accessories.get("/change", async (req, res) => {
  try {
    const id = url.parse(req.url, true).query.id

    if (!id) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await Accessory.find({ _id: id }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    res.json({ product })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})
