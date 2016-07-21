module.exports = function (grunt) {
    grunt.initConfig(
      {
        watch: {
          options: {
              livereload: true,
          },
          css: {
            // Files to watch for
            files: ['resources/sass/screen.scss', 'resources/sass/puntos.scss'],
            tasks: ['compass:dev']
          },
          js: {
            // Files to watch for
            files: [
                'resources/js/PuntosCSS.class.js', 
                'resources/js/PuntosSVG.class.js', 
                'resources/js/Bordados.class.js' 
            ],
            tasks: ['uglify:dev']
          }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'resources/sass',
                    cssDir: 'public/styles',
                    //imagesPath: 'images',
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    mangle: false, // prevent changing function names
                    beautify: true 
                },
                // Files to compile
                files: {
                  // "dest" : "src(s)" array
                  'public/scripts/bordados-class.js': [
                      'resources/js/PuntosCSS.class.js', 
                      'resources/js/PuntosSVG.class.js', 
                      'resources/js/Bordados.class.js' 
                  ]
                }
            },
            prod: {
                options: {
                    mangle: false // prevent changing function names
                },
                // Files to compile
                files: {
                	// "dest" : "src(s)" array
					'public/scripts/bordados.min.js': [ 
						'resources/js/PuntosCSS.class.js', 
						'resources/js/PuntosSVG.class.js', 
						'resources/js/Bordados.class.js' 
					]
                }
            }
        }
    }
  );
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch', 'uglify:dev', 'compass']); // Default grunt tasks maps to grunt
};
