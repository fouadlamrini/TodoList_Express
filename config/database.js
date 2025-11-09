const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log('db connected');
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectDb;
