import { Router } from "express"
import url from "url"

import { Doors, IronDoors, Furniture, Accessories } from "../models/Product.js"
import { getProducts } from "../utils/getProducts.js"

export const catalog = Router()

catalog.get("/doors", catalogHandler)
catalog.get("/iron-doors", catalogHandler)
catalog.get("/furniture", catalogHandler)
catalog.get("/accessories", catalogHandler)

const OFFSET = 12

async function catalogHandler(req, res) {
  try {
    const type = req._parsedUrl.pathname.substring(1)
    const queryParams = url.parse(req.url, true).query
    const page = +queryParams.page - 1

    if (!type || !Number.isInteger(page) || page < 0) {
      return res.status(400).send("Неправильные данные")
    }

    const types = {
      "doors": Doors,
      "iron-doors": IronDoors,
      "furniture": Furniture,
      "accessories": Accessories
    }
    
    const products = await getProducts(
      types[type],
      OFFSET + 1,
      OFFSET * page,
      {
        ...(queryParams.key && queryParams.value ? { [queryParams.key]: queryParams.value } : {}),
        ...(queryParams.brand ? { brand: queryParams.brand } : {})
      }
    )

    res.json({
      more: products.length > OFFSET,
      products: (products.pop(), products)
    })
  } catch(_) {
    return res.status(404).send("Не найдено")
  }
}
