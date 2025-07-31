import cors from 'cors'
import express from "express"
import {connectDB} from "./db.js"

// Rutas
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors());

app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)

connectDB()
app.listen(3000)
console.log("🚀 SERVER ON PORT ", 3000)