module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'dev/js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    jscs: {
      src: "dev/**/*.js",
      options: {
        esnext: false, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        config: 'node_modules/jscs/jscs.json'
      }
    },
    uglify: {
      options: {
        screwIE8: true,
        preserveComments: false
      },
      all: {
        files: [{
          expand: true,
          cwd: 'dev/js',
          src: '**/*.js',
          dest: 'assets/js'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['dev/**/*.js'],
        tasks: ['jshint', 'jscs', 'uglify:all'],
        options: {
          spawn: false,
        }
      },
      sass: {
        files: ['dev/css/sass/*.scss', 'dev/css/sass/**/*.scss'],
        tasks: ['compass']
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          config: 'dev/css/config.rb',
          environment: 'production'
        } 
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['jshint', 'jscs', 'uglify:all','compass']);
  grunt.registerTask('scripts', 'watch:scripts');
  grunt.registerTask('sass', 'watch:sass');
};
