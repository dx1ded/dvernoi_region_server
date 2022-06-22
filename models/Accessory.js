import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const accessorySchema = new mongoose.Schema({
  _id: mongoose.ObjectId
}, { collection: "accessory" })

export const Accessory = catalog.model("Accessory", accessorySchema)
