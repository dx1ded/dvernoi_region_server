import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const doorSchema = new mongoose.Schema({
  model: String,
  color: String,
  glass: String,
  size: String,
  canvas_type: String,
  group: String
}, { collection: "doors" })

export const Door = catalog.model("Door", doorSchema)
