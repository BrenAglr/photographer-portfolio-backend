import express from "express"
import cors from "cors"
import indexRouter from "./routes/indexRouter"

const server = express()

server.use(cors())
server.use(express.json())
server.use(indexRouter)

export default server;