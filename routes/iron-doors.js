import { Router } from "express"
import url from "url"

import { IronDoor } from "../models/IronDoor.js"
import { getSizes } from "../utils/getSizes.js"
import { getInnerColors } from "../utils/getInnerColors.js"
import { getOuterColors } from "../utils/getOuterColors.js"

export const ironDoors = Router()

ironDoors.get("/", async (req, res) => {
  try {
    const id = url.parse(req.url, true).query.id

    if (!id) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await IronDoor.find({ _id: id }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    const innerColors = await getInnerColors(product, IronDoor)
    const outerColors = await getOuterColors(product, IronDoor)
    const sizes = await getSizes(product, IronDoor, {
      inner_side_color: product.inner_side_color,
      outer_side_color: product.outer_side_color
    })

    res.json({
      product,
      sizes,
      innerColors,
      outerColors
    })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})

ironDoors.get("/change", async (req, res) => {
  try {
    const queryParams = url.parse(req.url, true).query

    if (
      queryParams.inner_side_color === undefined ||
      queryParams.outer_side_color === undefined ||
      queryParams.size === undefined ||
      queryParams.model === undefined
    ) {
      return res.status(400).send("Неправильные данные")
    }

    const product = (await IronDoor.find({
      inner_side_color: queryParams.inner_side_color,
      outer_side_color: queryParams.outer_side_color,
      size: queryParams.size,
      model: queryParams.model
    }))[0]

    if (!product) {
      return res.status(404).send("Продукт такой комплектации не найден")
    }

    const innerColors = await getInnerColors(product, IronDoor)
    const outerColors = await getOuterColors(product, IronDoor)
    const sizes = await getSizes(product, IronDoor, {
      inner_side_color: product.inner_side_color,
      outer_side_color: product.outer_side_color
    })

    res.json({
      product,
      sizes,
      innerColors,
      outerColors
    })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
})
