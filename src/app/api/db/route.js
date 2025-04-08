import mongoose from 'mongoose'

const uri = 'mongodb+srv://2223016:N6bVPiFwmE5hhoI5@cluster0.3dvrp.mongodb.net/Limoservices?retryWrites=true&w=majority'

let cachedConnection = null

async function connectToDatabase() {
  if (cachedConnection) return cachedConnection

  try {
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })

    cachedConnection = connection
    return connection
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

export { connectToDatabase }
