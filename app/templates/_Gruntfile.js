module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Linting Javascript files
    jshint: {
      files: ['Gruntfile.js', 'dev/js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    // Enforcing coding style standards for Javascript
    jscs: {
      src: "dev/**/*.js",
      options: {
        esnext: false,
        verbose: true,
        config: 'node_modules/jscs/presets/<%= jscs %>' // See http://jscs.info/rules for options
      }
    },
    // Minifying built JS to seperate file
    uglify: {
      options: {
        screwIE8: true,
        preserveComments: false
      },
      all: {
        files: grunt.file.expandMapping(['dist/*.js'], 'dist/', {
		    	flatten: true,
          rename: function(destBase, destPath) {
            var filePath = destBase + destPath;
            if (destPath.indexOf('.min.js') !== -1) { return filePath; }
	          return filePath.replace('.js', '.min.js');
	        }
		    })
      }
    },
    // Bundling JS and CSS into one JS file
    webpack: {
      all: {
        entry: "./dev/js/<%= mainJS %>",
        output: {
          path: "dist/",
          filename: "<%= mainJS %>",
        },
        stats: {
          colors: true,
          modules: true,
          reasons: true
        },
        storeStatsTo: "webpackStats",
        failOnError: true,
        keepalive: false,
        module: {
          loaders: [
            {
              test: /\.scss$/,
              loaders: ["style", "css", "sass"]
            },
            {
              test: /\.eot$|\.ttf$|\.woff$|\.woff2$/,
              loader: "file-loader"
            },
            {
              test: /\.html$/,
              loader: "html-loader"
            }
          ]
        }
      }
    },
    // Test runner for use with Jasmine
    karma: {
      acceptance: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome', 'Firefox'],
        files: [{ src: './dist/*.js' }, { src: './dev/tests/acceptance/*.js' }]
      },
      unit: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        exclude: ['./dev/js/<%= mainJS %>'],
        files: [{ src: './node_modules/phantomjs-polyfill/bind-polyfill.js' }, { src: './dev/js/*.js' }, { src: './dev/tests/unit/*.js' }]
      }
    },
    // Listening for changes to files
    watch: {
      all: {
        files: ['dev/**/*.js', 'dev/sass/*.scss', 'dev/sass/**/*.scss', 'dev/html/*.html', 'dev/html/**/*.html'],
        tasks: ['jshint', 'jscs', 'webpack:all', 'uglify:all', 'karma:unit'],
        options: {
          spawn: false,
        }
      },
      acceptance: {
        files: ['dev/tests/acceptance/*.js'],
        tasks: ['karma:acceptance'],
        options: {
          spawn: false
        }
      },
      unit: {
        files: ['dev/tests/unit/*.js'],
        tasks: ['karma:unit'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['jshint', 'jscs', 'webpack:all', 'uglify:all', 'karma:unit', 'karma:acceptance']);
  grunt.registerTask('build', ['jshint', 'jscs', 'webpack:all', 'uglify:all']);
  grunt.registerTask('bundle', ['webpack:all', 'uglify:all']);
  grunt.registerTask('qa', ['karma:unit', 'karma:acceptance']);
  grunt.registerTask('unit', ['karma:unit']);
  grunt.registerTask('accept', ['karma:acceptance']);
};
