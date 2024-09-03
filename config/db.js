const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoDB databse ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`MongoDB Database Error ${error}`.bgRed.white);
        
    }
};

module.exports = connectDB;