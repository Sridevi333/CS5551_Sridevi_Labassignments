
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var result={'body': []};
var url = 'mongodb://root:root@ds013991.mlab.com:13991/aselab9';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/venues', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {  res.write("Connecting to Database Failed");
            res.end();  }
        insertDocument(db, req.body, function() {
            res.write("Successfully Saved Venue details");
            res.end();       });    });
app.post('/update',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Connecting to Database Failed");
            res.end();        }
        updateDocument(db, req.body, function() {
            res.write("Successfully Updated Venue Details");
            res.end();        });    });
    var id=req.body.id2;
    var item={fname:req.body.fn,lname:req.body.ln,email:req.body.ml};
    var updateDocument = function(db, data, callback) {
        db.collection('lab9').updateOne({"name":id},{$set:item}, function(err, result) {
            if(err)            {
                res.write("Update Failed");
                res.end();            }
            console.log("Updated Record");
            callback();        });    };})
app.post('/delete', function(req, res) {
    var id = req.body.id1;
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Deletion Failed");
            res.end();        }
        db.collection('ase').deleteOne({"name": id}, function(err, result) {
            res.write("Successfully Deleted");
            res.end();
            console.log('Item deleted');        });});});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Running at http://%s:%s", host, port) })
