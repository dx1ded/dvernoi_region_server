import { Router } from "express"
import url from "url"

import { Door } from "../models/Door.js"
import { getColors } from "../utils/getColors.js"
import { getSizes } from "../utils/getSizes.js"
import { getGlasses } from "../utils/getGlasses.js"

export const doors = Router()

doors.get("/", async (req, res) => {
  try {
    const id = url.parse(req.url, true).query.id

    if (!id) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await Door.find({ _id: id }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    const colors = await getColors(product, Door)
    const glasses = await getGlasses(product, Door)
    const sizes = await getSizes(product, Door, {
      canvas_type: product.canvas_type,
      glass: product.glass
    })

    res.json({ product, colors, sizes, glasses })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})

doors.get("/change", async (req, res) => {
  try {
    const queryParams = url.parse(req.url, true).query

    if (
      queryParams.color === undefined ||
      queryParams.glass === undefined ||
      queryParams.size === undefined ||
      queryParams.model === undefined
    ) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await Door.find({ ...queryParams }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    const colors = await getColors(product, Door)
    const sizes = await getSizes(product, Door)
    const glasses = await getGlasses(product, Door)

    res.json({ product, colors, sizes, glasses })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})
