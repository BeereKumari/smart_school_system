import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/school"

let connectionPromise: Promise<mongoose.Connection> | null = null

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }

  if (connectionPromise) {
    return connectionPromise
  }

  connectionPromise = (async () => {
    try {
      await mongoose.connect(MONGODB_URI)
      console.log("MongoDB Connected")

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err)
        connectionPromise = null
      })

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected")
        connectionPromise = null
      })

      return mongoose.connection
    } catch (error) {
      console.error("MongoDB Error:", error)
      connectionPromise = null
      throw error
    }
  })()

  return connectionPromise
}

export default connectDB