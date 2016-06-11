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

    Caneva.find({}).sort({
        '_id': -1
    }).exec(function(err, bordados_list) {

        if (err) {
            console.log(err);
        } else {

            res.json(bordados_list);
            res.end();
        }
    });

})

// POST (insert)
.post(function(req, res, next) {

    var bordado = new Caneva(req.body);

    if (req.body._id) {
        
        bordado.update({
            _id: req.body._id
        }, req.body).exec(function(err, result) {

            if (err) {
				console.log(err);
            } else {

                res.json({
                    result: result.ok == 1 ? 'ok' : 'error'
                });
                res.end();
            }
        });

    } else {

        bordado.save(function(err, result) {

            if (err) {
                console.log(err);
            } else {
                res.json({
                    result: 'ok',
                    _id: result._id,
                    bordado: result.bordado
                });
                res.end();
            }
        });

    }

});


// parameter middleware that will run before the next routes
router.param('id', function(req, res, next, id) {

    // check if the Bordado with that id exists
    // TODO: do some validations
    var modified = id.toString();

    // save id to the request
    req.id = modified;

    next();
});


// GET (load)
router.route('/bordados/:id')

.get(function(req, res, next) {

    Caneva.findOne({
        '_id': req.params.id
    }).exec(function(err, db_bordado) {

        if (err) {
            console.log(err);
        } else {

            res.json(db_bordado);
            res.end();
        }
    });

})

// PUT (update)
// 	.put(function(req, res, next) {
// 		
// 	    Caneva.update({ _id: req.body._id }, req.body).exec(function(err, result) {
// 
// 	        if (err) {
// 	            console.log(err);
// 	        } else {
// 
//             result = {
//                 result: result.ok == 1 ? 'ok' : 'error'
//             };
// 	            res.json(result);
// 	            res.end();
// 	        }
// 	    });
// 
// })

// DELETE
.delete(function(req, res, next) {

    Caneva.find({
        '_id': req.params.id
    }).exec(function(err, bordado) {
        if (err) {
            console.log(err);
        } else {
            Caneva.remove({
                '_id': req.params.id
            }).exec(function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        result: 'ok'
                    });
                    res.end();
                }
            });
        }
    });

});


module.exports = router;