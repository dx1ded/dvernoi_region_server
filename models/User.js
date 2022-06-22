import mongoose from "mongoose"
import { users } from "../services/mongodb.js"

const userSchema = new mongoose.Schema({
  userid: String
}, { collection: "users" })

export const User = users.model("User", userSchema)
