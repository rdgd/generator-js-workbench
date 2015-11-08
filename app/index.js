'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var generators = require('yeoman-generator');

var jsWorkbenchGenerator = generators.Base.extend({
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

  // Install Node Packages from copied package.json, then show thank you message
  runNpm: function(){
    this.npmInstall("", function () {
      var thankYou = chalk.green(
        'Thanks for using \n ' +
        chalk.blue(
'.----------------.  .----------------.\n' +
'| .--------------. || .--------------. |\n' +
'| |     _____    | || |    _______   | |\n' +
'| |    |_   _|   | || |   /  ____|   | |\n' +
'| |      | |     | || |  |  (__ \_    | |\n' +
'| |   _  | |     | || |   \'.___\`-.   | |\n' +
'| |  | |_\' |     | || |  |\`\____) |   | |\n' +
'| |  \`.___.\'     | || |  |_______.\'  | |\n' +
'| |              | || |              | |\n' +
'| \'--------------\' || \'--------------\' |\n' +
' \'----------------\'  \'----------------\'\n' +
' .----------------.  .----------------.  .----------------.  .----------------.\n' +
'| .--------------. || .--------------. || .--------------. || .--------------. |\n' +
'| | _____  _____ | || |     ____     | || |  _______     | || |  ___  ____   | |\n' +
'| ||_   _||_   _|| || |   .\'    \`.   | || | |_   __ \\    | || | |_  ||_  _|  | |\n' +
'| |  | | /\\ | |  | || |  /  .--.  \\  | || |   | |__) |   | || |   | |_/ /    | |\n' +
'| |  | |/  \\| |  | || |  | |    | |  | || |   |  __ /    | || |   |  __\'.    | |\n' +
'| |  |   /\\   |  | || |  \\  \`--\'  /  | || |  _| |  \\ \\_  | || |  _| |  \\ \\_  | |\n' +
'| |  |__/  \\__|  | || |   \`.____.\'   | || | |____| |___| | || | |____||____| | |\n' +
'| |              | || |              | || |              | || |              | |\n' +
'| \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' |\n' +
' \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'\n' +
' .----------------.  .----------------.  .-----------------. .----------------.  .----------------. \n' +
'| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n' +
'| |   ______     | || |  _________   | || | ____  _____  | || |     ______   | || |  ____  ____  | |\n' +
'| |  |_   _ \\    | || | |_   ___  |  | || ||_   \\|_   _| | || |   .\' ___  |  | || | |_   ||   _| | |\n' +
'| |    | |_) |   | || |   | |_  \_|   | || |  |   \\ | |   | || |  / .\'   \\_|  | || |   | |__| |   | |\n' +
'| |    |  __\'.   | || |   |  _|  _   | || |  | |\\ \\| |   | || |  | |         | || |   |  __  |   | |\n' +
'| |   _| |__) |  | || |  _| |___/ |  | || | _| |_\\   |_  | || |  \\ \`.___.\'\\  | || |  _| |  | |_  | |\n' +
'| |  |_______/   | || | |_________|  | || ||_____|\\____| | || |   \`._____.\'  | || | |____||____| | |\n' +
'| |              | || |              | || |              | || |              | || |              | |\n' +
'| \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' || \'--------------\' |\n' +
' \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\'  \'----------------\' \n'
        ) +
        ' I hope it saves you time!'
      );
      console.log(thankYou);
    });
  }
});

module.exports = jsWorkbenchGenerator;
