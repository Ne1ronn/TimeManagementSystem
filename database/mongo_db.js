const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("MONGO_URI is not defined");
    }

    client = new MongoClient(uri);
    await client.connect();

    db = client.db("TimeManagementSystem");
    console.log("MongoDB connected");
}

function getDB() {
    if (!db) {
        throw new Error("DB not initialized");
    }
    return db;
}

module.exports = { connectDB, getDB };