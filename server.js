//express käyttöön
const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
//otetaan mongoose käyttöön
var mongoose = require("mongoose");
var uri = process.env.DB_URI;


app.use(express.json());
app.use(cors());
//yhdistetään tietokantaan
mongoose.connect(uri, { useNewUrlParser: true,
useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
//määritellään schema
const User = mongoose.model(
    "User",
    UserSchema,
    "users"
);
//lomakedatan lukua varten
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));


//luodaan reitit

//haetaan kaikki tietokannan sisältävä data
app.get("/api/getall", function (req, res) {
    User.find({}, null, function (err,
        results) {
            if (err) {
            res.json("tapahtui virhe", 500);
        }
        else {
            res.status(200).json(results);
        }
    });
});

//haetaan id:n perusteella POSTMANILLA testattu
app.get("/api/:id", function (req, res) {

    var id = req.params.id;

    User.findById(id, function (err, results) {

        //virhekoodi jos tapahtuu virhe muuten lähettää tulokset
        if (err) {
            res.json("tapahtui virhe", 500);
        }
        else {
            res.json("Löysit käyttäjän: " + results.username + " ID:n perusteella");
        }
    });
});



app.post("/api/add", async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const uusiUser = new User({
        username: username,
        password: password
    });
    console.log(uusiUser);
    uusiUser.save();

    res.send("lisäsi username: (" + req.body.username + ")" + " & password: ("
     + req.body.password + ")");
});



/* //tallennetaan tietokantaan POSTMANILLA testattu toimii
app.post("/api/add", function (req, res) {
    var useri = req.body.username;
    var passu = req.body.password;

    const uusiUser = new User({
        username: useri,
        password: passu
    });
    console.log(uusiUser);
    uusiUser.save();

    res.send("lisäsi username: (" + req.body.username + ")" + " & password: ("
     + req.body.password + ")");
});
 */
//muokataan id:n perusteella POSTMANILLA testattu
app.put("/api/update/:id", function (req, res) {

    var id = req.params.id;

    User.findByIdAndUpdate(id, { username: "jekkukekku"}, function (err, results) {
        //virhekoodi jos tapahtuu virhe muuten lähettää tulokset
        if (err) {
            res.json("tapahtui virhe", 500);
        }
        else {
            res.json("muokattiin käyttäjää id:llä" + req.params.id 
            + " alkuperäinen useri: " + results.username);
        }
    });
});

app.delete("/api/delete/:id", function (req, res) {

     var id = req.params.id;

    User.findByIdAndDelete(id, function (err, results) {
        if (err) {
            console.log(err);
            res.json("virhe...", 500);
        }
        else if (results == null) {
            res.json("poistettavaa käyttäjää ei löytynyt", 200);
        }
        else {
            console.log(results);
            res.json("poistettu " + id + " " + results.username, 200);
        }
    }); 
});

// Oletusreitti joka tarjoillaan, mikäli muihin ei päädytty.
app.get("*", function(req, res) {
    res.status(404).send("Canät find the requested page");
});
  
// Web-palvelimen luonti Expressin avulla
app.listen(PORT, function() {
    console.log("Example app listening on port "+PORT+"!");
});