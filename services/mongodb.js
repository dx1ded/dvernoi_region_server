import "dotenv/config"
import mongoose from "mongoose"

export const catalog = mongoose.createConnection(process.env.mongoCatalogUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const users = mongoose.createConnection(process.env.mongoUsersUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

catalog.once("open", () => console.log("MongoDB: DB Catalog is avaible"))
catalog.once("open", () => console.log("MongoDB: DB Users is avaible"))
