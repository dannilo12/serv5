const express = require('express');
const app = express();

//..........................banco de dados................................
const mongoose = require('mongoose');
const db_acess = require('./setup/db').mongoURL;

mongoose.connect(db_acess, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("COnexão ao MongoDB bem Sucedida!"))
.catch(err => console.log(err));

//........................................................................

//..........................login........................................
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


const auth = require("./routes/auth");

app.use("/auth", auth);
//........................................................................

app.get("/", (req, res) => {
    res.send("Hi! Express!")
});

app.listen(3000, () => console.log("backend executando..."));