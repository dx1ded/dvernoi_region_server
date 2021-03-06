import { Router } from "express"
import url from "url"

import { Doors, IronDoors, Furniture, Accessories } from "../models/Product.js"
import { getBrands } from "../utils/getBrands.js"

export const filter = Router()

filter.get("/getBrands", async (req, res) => {
  try {
    const queryParams = url.parse(req.url, true).query

    if (!queryParams.type || !queryParams.key || !queryParams.value) {
      return res.status(400).send("Неправильные данные")
    }

    const { type, key, value } = queryParams

    const types = {
      "doors": Doors,
      "iron-doors": IronDoors,
      "furniture": Furniture,
      "accessories": Accessories
    }

    const brands = await getBrands(types[type], { [key]: value })

    res.json({ brands })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})
