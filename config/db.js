const mongoose = require('mongoose');
// A function for connecting to the database Asynchronously 
const connectDB = async () => {
    try {
        // Connecting to Mongoose using the process.env variable
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Mongo Connected...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}
// Exporting the function
module.exports = connectDB;