import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const productSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  novinka: Boolean,
  sale: Boolean
})

export const Doors = catalog.model("Doors", productSchema, "doors")
export const IronDoors = catalog.model("IronDoors", productSchema, "iron-doors")
export const Furniture = catalog.model("Furnitures", productSchema, "furniture")
export const Accessories = catalog.model("Accessories", productSchema, "accessories")
