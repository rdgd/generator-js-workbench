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
        esnext: false,
        verbose: true,
        config: 'jscs.json' // See http://jscs.info/rules for options
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
          cwd: 'dist/src',
          src: '**/*.js',
          dest: 'dist/min'
        }]
      }
    },
    webpack: {
      all: {
        entry: "./dev/js/<%= mainJS %>",
        output: {
          path: "dist/src",
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
            }
          ]
        }
      }
    },
    watch: {
      all: {
        files: ['dev/**/*.js', 'dev/sass/*.scss', 'dev/sass/**/*.scss'],
        tasks: ['jshint', 'jscs', 'webpack:all', 'uglify:all'],
        options: {
          spawn: false,
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
  grunt.registerTask('default', ['jshint', 'jscs', 'webpack:all', 'uglify:all']);
};
