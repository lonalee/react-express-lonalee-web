const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const path = require("path");

// routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const items = require("./routes/api/items");
//
const app = express();

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);
app.use("/api/items", items);

// SERVER Static Assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5200;
// process.env.PORT for deploy to HEROKU
const db = require("./config/keys").mongoURI;
// mongoose connection
mongoose
  .connect(db)
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));
