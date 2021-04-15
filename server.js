const express =  require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.use(express.static(__dirname));

var url = "mongodb+srv://gnanesh:gnanesh@cluster0.ha16l.mongodb.net/notesapp?retryWrites=true&w=majority"||"mongodb://localhost/api";

mongoose.connect(url,{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
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