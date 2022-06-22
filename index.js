import "dotenv/config"
import "./services/mongodb.js"

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { catalog } from "./routes/catalog.js"
import { doors } from "./routes/doors.js"
import { furniture } from "./routes/furniture.js"
import { accessories } from "./routes/accessories.js"
import { ironDoors } from "./routes/iron-doors.js"
import { proposition } from "./routes/proposition.js"
import { order } from "./routes/order.js"
import { filter } from "./routes/filter.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/catalog", catalog)
app.use("/api/doors", doors)
app.use("/api/furniture", furniture)
app.use("/api/accessories", accessories)
app.use("/api/iron-doors", ironDoors)
app.use("/api/proposition", proposition)
app.use("/api/filter", filter)
app.use("/api/order", order)

app.listen(process.env.PORT, (err) => {
  if (err) throw err

  console.log(`The server is listening PORT: ${process.env.PORT}`)
})
