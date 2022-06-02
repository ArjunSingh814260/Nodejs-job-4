const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const { json } = require("body-parser");
const userRoute = require("./routes/user.routes");
const upload = require("./helper/multer");
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", userRoute);

app.listen(8000, () => {
  console.log("Server Start");
});
