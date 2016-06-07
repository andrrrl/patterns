var express = require('express'),
    router = express.Router(),
    printf = require('util').format;

var schemas = require('../db');

var Config = schemas.Config;
var Caneva = schemas.Caneva;

var mongoose = require('mongoose');

// GET and render homepage
router.get('/', function(req, res, next) {

    Config.findOne().exec(function(err, db_config) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                index: {
                    lang: req.headers['accept-language'].slice(0, 2) || 'en',
                    config: db_config
                }
            }); // render
        }
    });

});


// GET all
router.route('/bordados')

// GET ALL
.get(function(req, res, next) {

    if (err) {
        console.log(err);
    } else {
        Caneva.find({}).sort({
            'creado_el': 1
        }).exec(function(err, db_caneva) {
            res.json(db_caneva);
            res.end();
        });
    }

})

// POST (insert)
.post(function(req, res, next) {

    let bordado = new Caneva(req.body);

    bordado.save(function(err, result) {

        if (err) {
            console.log(err);
        } else {
            res.json({
                result: 'ok'
            });
            res.end();
        }
    });

});


// parameter middleware that will run before the next routes
router.param('id', function(req, res, next, id) {

    // check if the Bordado with that id exists
    // TODO: do some validations
    let modified = id.toString();

    // save id to the request
    req.id = modified;

    next();
});


// GET (load)
router.route('/bordados/:id')
    .get(function(req, res, next) {

        if (err) {
            console.log(err);
        } else {

            Caneva.findOne({
                '_id': req.params.id
            }).exec(function(err, db_bordado) {
                res.json(db_bordado);
                res.end();
            });
        }

    })

// PUT (update)
.put(function(req, res, next) {

    if (err) {
        console.log(err);
    } else {
        Caneva.update({
            '_id': req.params.id
        }, req.body).exec(function(err, result) {
            result = {
                result: result.ok == 1 ? 'ok' : 'error'
            };
            res.json(result);
            res.end();
        });
    }

})

// DELETE
.delete(function(req, res, next) {

    if (err) {
        console.log(err);
    } else {
        Caneva.find({
            '_id': req.params.id
        }).exec(function(err, bordado) {
            Caneva.remove({
                '_id': req.params.id
            }).exec(function(err, result) {
                res.json({
                    result: 'ok'
                });
                res.end();
            });
        });
    }

});


module.exports = router;