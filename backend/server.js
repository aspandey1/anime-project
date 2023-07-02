const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = process.env.PORT || 3000;
const connectDB = require("../backend/config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/users", require("./routes/libraryRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
