import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://dekofq:asd123@cluster0.gnq1pin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
}

