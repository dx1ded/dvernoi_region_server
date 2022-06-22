import { Router } from "express"

import { Doors } from "../models/Product.js"
import { getProducts } from "../utils/getProducts.js"

export const proposition = Router()

proposition.get("/new", async (_, res) => {
  const products = await getProducts(Doors, 3, 0, { novinka: true })

  res.json({ products })
})

proposition.get("/sale", async (_, res) => {
  const products = await getProducts(Doors, 3, 0, { sale: true })

  res.json({ products })
})
