require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//config json and form data

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));

//diretorio
app.use("uploads", express.static(path.join(__dirname, "/uploads")));

//db connection
require("./config/db.js");

//rotas
const router = require("./routes/Router");

app.use(router);

app.listen(port, () => {
  console.log("Http server runing");
});
