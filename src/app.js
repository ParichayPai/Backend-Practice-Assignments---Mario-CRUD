const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/mario", (req, res) => {
    marioModel.find()
    .then(data => res.json(data))
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })
});

app.get("/mario/:id", (req, res) => {
    marioModel.findOne({_id:req.params.id})
        .then(data => res.json(data))
        .catch(err => res.status(400).send({message : err.message}))
});

app.post("/mario", (req, res) => {
    let char = new marioModel({
        name:req.body.name,
        weight:req.body.weight
    });
    if(!char.name || !char.weight){
        res.status(400).send({message : "either name or weight is missing"});
        return;
    }
    char.save().then(res.send("data added"))
});

app.patch("/mario/:id", (req, res) => {
    marioModel.findOneAndUpdate({_id: req.params.id}, {
        name : req.body.name,
        weight : req.body.weight
    })
    .then(res.send(char))
    .catch(err => res.status(400).send({message : err.message}))
})

app.delete("/mario/:id", (req, res) => {
    marioModel.deleteOne({_id: req.params.id})
    .then(data => {
        return res.status(200).send({message:"character deleted"})
    })
    .catch(err => res.status(400).send({message:err.message}))
})

module.exports = app;