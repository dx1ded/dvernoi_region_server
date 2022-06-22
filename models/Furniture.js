import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const furnitureSchema = new mongoose.Schema({
  _id: mongoose.ObjectId
}, { collection: "furniture" })

export const Furniture = catalog.model("Furniture", furnitureSchema)
