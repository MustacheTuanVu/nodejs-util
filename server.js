const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: ["http://192.168.1.241:9000", "http://localhost:9000", ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(express.static('public'))
app.use('/public-document', express.static(__dirname + '/app/public-document'));

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./app/models");

// simple route
app.get("/", (req, res) => {
  res.render('index');
});

require("./app/routes/member.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
