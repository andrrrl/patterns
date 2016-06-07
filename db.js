#!/bin/env node

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10; //default is 10 anyway...
    
    // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    const MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;

var mongo_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'colorina';
var mongo_coll = process.env.OPENSHIFT_APP_NAME || 'portfolio';

if (mongo_user == 'colorina') {
    var MongoDB = mongoose.connect('mongodb://localhost/velours').connection;
} else {
    var MongoDB = mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + mongo_coll).connection;
}

MongoDB.on('error', function(err) {
    console.log(err.message);
});
MongoDB.once('open', function() {
    console.log('Connected to MongoDB with user ' + mongo_user);
});



var ConfigSchema = new mongoose.Schema({
    owner: String,
    title: String,
    index: String
}, {
    collection: 'config'
});

var CanevaSchema = new mongoose.Schema({

    bordado: String,
    filas: Number,
    columnas: Number,
    punto_base: String,
    ancho_punto: Number,
    ancho_hilo: Number,
    color_hilo: String,
    color_bg: String,
    color_malla: String,
    coords: Array

}, {
    collection: 'caneva'
});


var Config  = mongoose.model('condfig', ConfigSchema);
var Caneva  = mongoose.model('caneva', CanevaSchema);

var schemas = {
    'Config': Config,
    'Caneva': Caneva
}

module.exports = schemas;
