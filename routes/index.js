var 
    express = require('express'),
    router = express.Router();
    
const
	path   = require('path'),
    multer = require('multer'),
	fs	   = require('fs'),
	mkdirp = require('mkdirp'),
    printf = require('util').format;


var schemas = require('../db');

var Config = schemas.Config;
var Caneva = schemas.Caneva;

// GET and render homepage
router.get('/', function(req, res, next) {

	// ls.stdout.on( 'data', data => {
	//     console.log( `stdout: ${data}` );
	// });
    // 
	// ls.stderr.on( 'data', data => {
	//     console.log( `stderr: ${data}` );
	// });
    // 
	// ls.on( 'close', code => {
	//     console.log( `child process exited with code ${code}` );
	// });

    Config.findOne().exec(function(err, db_config) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                index: {
                    lang: (req.headers['accept-language'] ? req.headers['accept-language'].slice(0, 2) : 'en'),
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
.put(function(req, res, next) {
	
	Caneva.findByIdAndUpdate(req.body.id, { $set: { punto_base: req.body.punto_base, coords: req.body.coords }}, {new: true}, function (err, bor) {
		if (err) {
			res.json({result:'error'});
			res.end();
		}	
		
		res.json({result: 'ok'});
		res.end();
	});
	
})

// DELETE
.delete(function(req, res, next) {

    Caneva.remove({
        _id: req.params.id
    }).exec(function(err, bordado) {
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

var uploading = multer({
    dest: path.join('public/renders/'),
    limits: { 
        fileSize: 100000000,
        files: 1
    },
})

router.route('/bordados/renders/save')
	.post(function(req, res) {
		
        // Only allow saving PNG frames when on local env as Openshift has limited resources.
		if ( typeof process.env.OPENSHIFT_NODEJS_IP != 'undefined' ) 
			return;
		
		var id = req.body.id || '';
		var name  = req.body.bordado;
		var image = new Buffer(req.body.image, 'base64');
		
        const
            execSync = require( 'child_process' ).execSync;
        
        
		//mkdirp('./public/renders/' + name.slice(0, name.indexOf('-')), function(err){
		
        execSync( 'mkdir -p ./public/renders/' + name.slice(0, name.indexOf('-')), function(err, stdout, stderr) {
        
        	var filename = 'public/renders/' + name.slice(0, name.indexOf('-')) + '/' + name + '.png';
			
            fs.stat(filename, function(err, stats) {
                if ( typeof stats == 'undefined' ) {
					fs.writeFile(filename, image, function(err) {
					    if (err) {
							res.json({ message: 'error', err: err });
							res.end();
					    } else {
							console.info('./public/renders/' + name.slice(0, name.indexOf('-')) + '/' + name + '.png');
							res.json({ message: 'ok' });
							res.end();
						}
					});
				} else {
					res.json({ message: 'ok' });
					res.end();
				}
			});
			
		});
	});

router.route('/bordados/renders/animation')
    .post(function(req, res){
        
		var name  = req.body.bordado || name;
        
        const
            execSync = require( 'child_process' ).execSync;
            execSync( 'bash ./resources/bash/make_animation.sh ./public/renders/' + name + '/', function(err, stdout, stderr) {
                
                if (err) {
                    console.error(err);
                    res.json(err);
                    res.end();
                }
                
                if ( stderr ) {
                    res.json({stderr: stderr});
                } else {
                    res.json({stdout: stdout});
                }
                res.end();
            }); 
    });

module.exports = router;