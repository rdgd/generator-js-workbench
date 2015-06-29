module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'assets/js/*.js', 'assets/**/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'assets/js',
          src: '**/*.js',
          dest: 'build/<%= grunt.template.today("mm-dd-yyyy_h:MM:ss") %>/assets/js'
        }]
      }
    },
    jscs: {
      src: "assets/**/*.js",
      options: {
        esnext: false, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        "disallowKeywordsOnNewLine": ["else"],
        "disallowMixedSpacesAndTabs": true,
        "disallowMultipleVarDecl": "exceptUndefined",
        "disallowNewlineBeforeBlockStatements": true,
        "disallowSpaceAfterObjectKeys": true,
        "disallowSpaceAfterPrefixUnaryOperators": true,
        "disallowTrailingWhitespace": true,
        "maximumLineLength": 120,
        "requireCapitalizedComments": true,
        "requireCapitalizedConstructors": true,
        "requireCurlyBraces": true,
        "requireSpaceAfterKeywords": [
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "case",
          "return",
          "try",
          "catch",
          "typeof"
        ],
        "requireSpaceAfterLineComment": true,
        "requireSpaceAfterBinaryOperators": true,
        "requireSpaceBeforeBinaryOperators": true,
        "requireSpaceBeforeBlockStatements": true,
        "requireSpaceBeforeObjectValues": true,
        "requireSpacesInFunction": {
          "beforeOpeningCurlyBrace": true
        },
       "requireSpacesInForStatement": true,
       "requireSpacesInsideObjectBrackets": "all",
       "validateIndentation": 2,
       "validateLineBreaks": "LF",
       "validateQuoteMarks": "'"
      }
    },  
    watch: {
      scripts: {
        files: ['assets/**/*.js'],
        tasks: ['jshint', 'jscs'],
        options: {
          spawn: false,
        }
      },
      sass: {
        files: ['assets/css/sass/particles/*.scss'],
        tasks: ['compass']
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          config: 'assets/css/config.rb',
          environment: 'production'
        } 
      }
    }
});
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['jshint', 'jscs', 'compass', 'uglify']);
  grunt.registerTask('scripts', 'watch:scripts');
  grunt.registerTask('sass', 'watch:sass');
};
