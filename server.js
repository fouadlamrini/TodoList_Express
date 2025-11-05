const express = require("express");
const connectDB = require("./config/database");
const todosRouter = require('./routes/todos');
const app = express();

const PORT = process.env.PORT || 7000;
// General middlewares
app.use(express.json());

// connect a db

connectDB;
//Run server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


