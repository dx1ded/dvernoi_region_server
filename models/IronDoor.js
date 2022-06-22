import mongoose from "mongoose"
import { catalog } from "../services/mongodb.js"

const ironDoorSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  inner_side_color: String,
  outer_side_color: String,
  size: String,
  model: String,
  color: String,
  group: String,
  canvas_type: String
}, { collection: "iron-doors" })

export const IronDoor = catalog.model("IronDoor", ironDoorSchema)
