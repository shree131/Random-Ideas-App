const mongoose = require('mongoose');

const connectDB = async () => {
    // connect returns a promise
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

mongoose.set('strictQuery', true);
module.exports = connectDB;