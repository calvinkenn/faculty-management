const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users-routes");
const adminRoutes = require("./routes/admin-routes");
const vmgoRoutes = require("./routes/vmgo-routes");
const announcementRoutes = require("./routes/announcement-routes");
const HttpError = require("./models/http-error");

const app = express();
//code for body parser
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images"))); //middleware for profile pic file path
app.use(
  "/uploads/certificates",
  express.static(path.join("uploads", "certificates"))
); //middleware for cert pic file path
app.use(
  "/uploads/announcements",
  express.static(path.join("uploads", "announcements"))
); //middleware for announcement pic file path
app.use("/uploads/header", express.static(path.join("uploads", "header"))); //middleware for announcement logo file path

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
app.use("/api/admin", adminRoutes);
app.use("/api/vmgo", vmgoRoutes);
app.use("/api/announcement", announcementRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//connection to mongoose
mongoose
  .connect(
    "mongodb+srv://admin:QB3LxtSqYQN4U0Zv@cluster0.ldb3t.mongodb.net/mis_test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("connected  to database");
  })
  .catch((err) => {
    console.log(err);
  });
