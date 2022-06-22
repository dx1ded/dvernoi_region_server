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

app.use("/catalog", catalog)
app.use("/doors", doors)
app.use("/furniture", furniture)
app.use("/accessories", accessories)
app.use("/iron-doors", ironDoors)
app.use("/proposition", proposition)
app.use("/filter", filter)
app.use("/order", order)

app.listen(process.env.PORT, (err) => {
  if (err) throw err

  console.log(`The server is listening PORT: ${process.env.PORT}`)
})
