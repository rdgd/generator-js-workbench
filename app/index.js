'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var generators = require('yeoman-generator');

var jsWorkbenchGenerator = generators.Base.extend({
  promptUser: function() {
    var done = this.async();
    var prompts = [
          {
            name: 'projectName',
            message: 'What is your project\'s name ?',
            default: 'JS-Workbench-Project'
          },
          {
            name: 'description',
            message: 'Describe your project'
          },
          {
            name: 'version',
            message: 'Version',
            default: '0.0.1'
          },
          {
            name: 'author',
            message: 'Name of project author'
          },
          {
            name: 'license',
            message: 'License',
            default: 'WTFPL'
          },
          {
            name: 'homepage',
            message: 'Project homepage'
          }
        ];

    // After prompt occurs, an object 'props' is passed to callback with user responses
    this.prompt(prompts, function (props) {
      this.npmProps = props;
      this.mainJS = this.npmProps.projectName + '.js';
      done();
    }.bind(this));
  },

  // Creating folders that won't be created during file copy
  scaffoldFolders: function() {
    var dirPaths = ['dist', 'dev/tests'];

    for (var i = 0; i < dirPaths.length; i++) {
      var pathToDir = dirPaths[i];
      mkdirp(pathToDir, dirMade.bind(this, pathToDir));
    }

    // Remember folks, this function gets hoisted
    function dirMade (pathToDir, err) {
      var msg = err ? chalk.red(err) : chalk.green('mkdir ') + pathToDir;
      console.log(msg);
    }
  },

  // Copying core files and stubs from generator source to new project
  // Very stringy... better approach?
  copyFiles: function () {
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_jscs.json', 'jscs.json');
    this.copy('._gitignore', '.gitignore');
    this.copy('dev/js/main.js', 'dev/js/' + this.mainJS);
    this.copy('dev/js/exampleDependency.js', 'dev/js/exampleDependency.js');
    this.copy('dev/css/sass/general.scss', 'dev/css/sass/general.scss');
    this.copy('dev/css/sass/particles/_general.scss', 'dev/css/sass/particles/_general.scss');

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.npmProps
    );

    this.fs.copyTpl(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      { mainJS: this.mainJS }
    )
  },

  // Install Node Packages from copied package.json, then show thank you message
  runNpm: function(){
    var asciiArt = this.read('../thank-you-message.txt');
    this.npmInstall("", function () {
      var thankYou = chalk.green('Thanks for using \n ' + chalk.blue(asciiArt));
      console.log(thankYou);
    });
  }
});

module.exports = jsWorkbenchGenerator;
