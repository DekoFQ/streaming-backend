import express from "express"
import {connectDB} from "./db.js"

// Rutas
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())
app.use("/api", authRoutes)

console.log("AMEN")
connectDB()
app.listen(3000)
console.log("🚀 SERVER ON PORT ", 3000)