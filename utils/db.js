import mongoose from "mongoose";
const connection = {};

async function connectDb() {
    if (connection.isConnected) {
        console.log("ready database");
        return;
    }

    if (!process.env.MONGODB_URI) {
        console.warn("MONGODB_URI is not set in environment variables.");
        return;
    }

    if (mongoose.connections && mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("use previous connection to the database");
            return;
        }
        await mongoose.disconnect();
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("new connection to the database");
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        connection.isConnected = false;
    }
}

async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("not disconnected from the database");
        }
    }
}

const db = { connectDb, disconnectDb };
export default db;