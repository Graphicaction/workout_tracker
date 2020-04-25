const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/planner", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Routes
// =============================================================
app.use(require("./routes/api-routes.js"));
require("./routes/html-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
