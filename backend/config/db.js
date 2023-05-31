const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected ${conn.connection.host}`.underline.cyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
