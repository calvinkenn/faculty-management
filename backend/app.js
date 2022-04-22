const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
//code for body parser
app.use(bodyParser.json());

//code to allow communication between 2 local host

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//connection to mongoose
mongoose
  .connect(
    'mongodb+srv://admin:QB3LxtSqYQN4U0Zv@cluster0.ldb3t.mongodb.net/mis_test?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000);
    console.log("connected  to database");
  })
  .catch((err) => {
    console.log(err);
  });
