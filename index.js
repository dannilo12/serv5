const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const db_acess = require('./setup/db').mongoURL;
const auth = require("./routes/auth");

//..........................banco de dados................................

mongoose.connect(db_acess, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexão ao MongoDB bem Sucedida!"))
.catch(err => console.log(err));

//........................................................................

//..........................login........................................

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use("/auth", auth);
//........................................................................

app.get("/", (req, res) => {
    res.send("Hi! Express!")
});

app.listen(3000, () => console.log("backend executando..."));