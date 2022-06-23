import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const accessorySchema = new mongoose.Schema({
  _id: mongoose.ObjectId
}, { collection: "accessories" })

export const Accessory = catalog.model("Accessory", accessorySchema)
