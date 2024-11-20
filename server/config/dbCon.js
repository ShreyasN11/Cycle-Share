const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('DB connected');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
};

module.exports = connectDB;
