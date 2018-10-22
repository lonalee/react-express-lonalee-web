const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

app.get("/", (req, res) => res.send("Hello LEE"));

// User Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5200;
// process.env.PORT for deploy to HEROKU
const db = require("./config/keys").mongoURI;
// mongoose connection
mongoose
  .connect(db)
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));
