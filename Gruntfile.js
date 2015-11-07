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
        config: 'jscs.json' // Replace with whatever standards you wish to use. http://jscs.info/rules
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
          cwd: 'dist',
          src: '**/*.js',
          dest: 'dist'
        }]
      }
    },
    webpack: {
      all: {
        entry: "./dev/js/main.js",
        output: {
            path: "dist",
            filename: "[name].min.js",
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
          ],
        }
      }
    },
    watch: {
      all: {
        files: ['dev/**/*.js', 'dev/css/sass/*.scss', 'dev/css/sass/**/*.scss'],
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
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['jshint', 'jscs', 'webpack:all', 'uglify:all']);
};
