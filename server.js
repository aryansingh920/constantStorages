"use strict";
//jshint esversion:7

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();



mongoose.connect(process.env.URI).then(() => {
  console.log('connected to cluster : ')
}).catch((err) => {
  console.log(err + ' : error connecting to cluster')
});


app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);




const link = require('./database/models.js');

app.get("/",(req,res)=>{
    res.json({
        "msg":"Server Running"
    })
})

app.get("/updateLink",(req,res)=>{
    res.render("update",{
        ip:true,
        port:false,
        protocol:false
    })
})

app.get("/getLink",async(req,res)=>{
    const linkG = await link.findOne({_id:req.query.id}).exec().then((r)=>{
        return(r)
    }).catch((err)=>{
        return(err)
    })
    res.json({
        link:linkG.link
    })
})

app.post("/update",async(req,res)=>{
    const linkFind = await link.findOneAndUpdate({_id:req.query.id},{link:req.body.ip}).exec().then((r)=>{
        res.json({"msg":"Updated Link"})
    }).catch((e)=>{
        res.json({
            "error":e
        })
    })
})



const port = process.env.PORT || 7000;
app.listen(port, async (req, res) => {
  console.log("server is running on port " + port);
});