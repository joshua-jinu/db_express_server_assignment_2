const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to database");
        })
        .catch(()=>{
            console.log('Error connecting to database');
        })
}

module.exports = connectDB;