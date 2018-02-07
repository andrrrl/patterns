#!/bin/env node

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongo_user = process.env.MONGO_USER || process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var mongo_db = process.env.MONGO_DB || process.env.OPENSHIFT_APP_NAME;

if (mongo_user == process.env.MONGO_USER) {
    // var MongoDB = mongoose.connect('mongodb://localhost/velours').connection;
    var MongoDB = mongoose.connect(process.env.MONGO_HOST + mongo_db).connection;
} else {
    var MongoDB = mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + mongo_db).connection;
}

MongoDB.on('error', function (err) {
    console.log(err.message);
});
MongoDB.once('open', function () {
    console.log('Connected to MongoDB with user ' + mongo_user);
});

var ConfigSchema = new mongoose.Schema({
    owner: String,
    title: String,
    index: String
}, {
    collection: process.env.MONGO_CONFIG_COLL || 'config'
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
    collection: process.env.MONGO_BORDADOS_COLL || 'caneva'
});


var Config = mongoose.model('config', ConfigSchema);
var Caneva = mongoose.model('caneva', CanevaSchema);

var schemas = {
    'Config': Config,
    'Caneva': Caneva
}

module.exports = schemas;