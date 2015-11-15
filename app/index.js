'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var generators = require('yeoman-generator');
var execSync = require('./execSync.js');

var jsWorkbenchGenerator = generators.Base.extend({
  // Defining the prompts we need to get information from our user, and then prompting them
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
      this.projectName = this.npmProps.projectName;
      done();
    }.bind(this));
  },

  // Creating folders that won't be created during file copy
  scaffoldFolders: function() {
    var dirPaths = ['dist', 'dev/html'];

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

  // A bit stringy... better approach?
  copyStaticFiles: function () {
    var dirPath = '../static/';
    this.copy(dirPath + 'conf/jscs.json', 'jscs.json');
    this.copy(dirPath + 'conf/gitignore.txt', '.gitignore');
    this.copy(dirPath + 'conf/karma.conf.js', 'karma.conf.js');
    this.copy(dirPath + 'js/main.js', 'dev/js/' + this.projectName + '.js');
    this.copy(dirPath + 'js/exampleModule.js', 'dev/js/exampleModule.js');
    this.copy(dirPath + 'js/exampleDependency.js', 'dev/js/exampleDependency.js');
    this.copy(dirPath + 'js/unit-test-1.js', 'dev/tests/unit/unit-test-1.js');
    this.copy(dirPath + 'js/acceptance-test-1.js', 'dev/tests/acceptance/acceptance-test-1.js');
    this.copy(dirPath + 'sass/general.scss', 'dev/sass/general.scss');
    this.copy(dirPath + 'sass/particles/_general.scss', 'dev/sass/particles/_general.scss');
  },

  // Templating NPM manifest, Gruntfile, and example HTML page
  copyTemplates: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.npmProps
    );

    this.fs.copyTpl(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      {
        projectName: this.projectName,
        mainJS: this.projectName + '.js'
      }
    )

    this.fs.copyTpl(
      this.templatePath('_example1.html'),
      this.destinationPath('examples/example1.html'),
      {
        projectName: this.npmProps.projectName,
        mainJS: this.projectName + '.js'
      }
    )
  },

  // Install Node Packages from copied package.json, build project, then show thank you message
  runNpm: function () {
    this.npmInstall("", function () {
      var pathToGrunt = path.resolve('./node_modules/grunt-cli/bin/grunt build');
      console.log(chalk.green('Dependencies installed successfully'));
      execSync(pathToGrunt);
      console.log(chalk.green('Example project built successfully'));
      thankUser.call(this);
    }.bind(this));

    function thankUser () {
      var asciiArt = this.read('../thank-you-message.txt');
      var thankYou = 'Thanks for using \n ' + chalk.blue(asciiArt);
      console.log(thankYou);
    }
  }
});

module.exports = jsWorkbenchGenerator;
