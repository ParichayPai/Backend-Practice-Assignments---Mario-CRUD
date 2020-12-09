// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const marioModel = require('./models/marioChar');

// // Middlewares
// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // your code goes here
// app.get("/mario", (req, res) => {
//     marioModel.find()
//     .then((data)=>{
//         res.json(data);
//     })
//     .catch((error)=>{
//         res.status(400).json({"message": error.message});
//     })
// });

// app.get("/mario/:id", (req, res) => {
//     marioModel.findById(req.params.id)
//     .then((result) => {
//         res.json(result);
//     })
//     .catch((error)=>{
//         res.status(400).json({"message": error.message});
//     })});

// app.post("/mario", (req, res) => {
//     let newMario = new marioModel({
//         name : req.body.name,
//         weight: req.body.weight
//     })
//     newMario.save()
//     .then((result)=>{
//         res.status(201).json(result);
//     })
//     .catch((error)=>{
//         res.status(400).json({"message": 'either name or weight is missing'});
//     })
// });

// app.patch("/mario/:id", (req, res) => {
//     marioModel.findOneAndUpdate({_id: req.params.id}, {
//         name : req.body.name,
//         weight : req.body.weight
//     })
//     .then(res.send(char))
//     .catch(err => res.status(400).send({message : err.message}))
// })

// app.delete("/mario/:id", (req, res) => {
//     marioModel.deleteOne({_id: req.params.id})
//     .then(data => {
//         return res.status(200).send({"message":"character deleted"})
//     })
//     .catch(err => res.status(400).json({"message":err.message}))
// })

// module.exports = app;

const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');
const mongoose  = require('mongoose');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here


app.get('/mario',(req,res)=>{
    marioModel.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })
})

app.get('/mario/:id',(req,res)=>{
    const id = req.params.id;
    marioModel.findById(id)
    .then((result) => {
        // if(result){
        //     res.status(400).json({"message": result});
        // }else{
            res.json(result);
        // }
    })
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })

})


app.post('/mario',(req,res)=>{
    const {name,weight} = req.body;
    let newMario =new marioModel({
        name : name,
        weight: weight
    })
    newMario.save()
    .then((result)=>{
        res.status(201).json(result);
    })
    .catch((error)=>{
        res.status(400).json({"message": 'either name or weight is missing'});
    })
})

app.patch('/mario/:id',(req,res)=>{
    const id = req.params.id;
    const updates = req.body;
    console.log(updates)
    marioModel.findByIdAndUpdate(id,updates,{new:true})
    
    .then((result)=>{
        // if(result == null){
        //     res.status(400).json({"message": result});
        //     return;
        // }
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })

})

app.delete('/mario/:id',(req,res) =>{
    const id = req.params.id;
    marioModel.findByIdAndDelete(id)
    .then((result)=>{
        // if(result == null){
        //     res.status(400).json({"message": result});
        //     return;
        // }
        res.status(200).json({"message": "character deleted"});
    })
    .catch((error)=>{
        res.status(400).json({"message": error.message});
    })
})



module.exports = app;