const express =  require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require('dotenv').config();
app.use(express.static(__dirname));

//
//console.log(process.env.DATABASE_URL); 
var url = process.env.DATABASE_URL || "mongodb://localhost/api";

mongoose
     .connect( url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


const admin = require('./routes/admin');
const user = require('./routes/user');
app.use("/admin", admin);
app.use("/user", user);

let port = process.env.PORT || 6000;
app.listen(port, () => {
console.log(` app listening at http://localhost:${port}`)

  });