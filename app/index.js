'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var generators = require('yeoman-generator');

var jsComponentBuilderGenerator = generators.Base.extend({
  // Creating folders that won't be created during file copy
  scaffoldFolders: function() {
    var dirPaths = ['dist', 'dev/tests'];

    for (var i = 0; i < dirPaths.length; i++) {
      var pathToDir = dirPaths[i];
      mkdirp(pathToDir, dirMade.bind(this, pathToDir));
    }

    // Remember everyone, this function gets hoisted
    function dirMade (pathToDir, err) {
      if (err) {
        console.log(chalk.red(err));
      } else {
        console.log(chalk.green('mkdir ') + pathToDir);
      }
    }
  },

  // Copying core files and stubs from generator source to new project
  // Very stringy... better approach?
  copyFiles: function () {
    this.copy('../_Gruntfile.js', 'Gruntfile.js');
    this.copy('../_jscs.json', 'jscs.json');
    this.copy('../_package.json', 'package.json');
    this.copy('../._gitignore', '.gitignore');
    this.copy('../dev/js/main.js', 'dev/js/main.js');
    this.copy('../dev/js/exampleDependency.js', 'dev/js/exampleDependency.js');
    this.copy('../dev/css/sass/general.scss', 'dev/css/sass/general.scss');
    this.copy('../dev/css/sass/particles/_general.scss', 'dev/css/sass/particles/_general.scss');
  },

  // Install Node Packages from copied package.json
  runNpm: function(){
    this.npmInstall("", function () {
      var thankYou = chalk.green(
        'Thanks for using the ' +
        chalk.blue.underline.bold('JS Component Builder Generator') +
        ' I hope it saves you time!'
      );
      console.log(thankYou);
    });
  }
});

module.exports = jsComponentBuilderGenerator;
