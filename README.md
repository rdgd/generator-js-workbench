# JS Workbench
Yeoman generator for spinning up JS components quickly. 

This is a boilerplate for utilizing Grunt to enforce my Javascript coding style rules, lint all Javascript any time a JS file is modified, and compile SASS files to minified CSS any time a .scss file is modified. 

The default [Grunt](http://gruntjs.com) command will do all the mentioned above.

##Dependencies:
1. [NPM (Node Package Manager)](https://docs.npmjs.com/getting-started/installing-node)
2. [Yeoman] (http://yeoman.io/) - `npm install -g yo`
3. [Grunt](http://gruntjs.com) - `npm install -g grunt grunt-cli`

##Steps to use:
1. `yo js-workbench`
2. `grunt watch`

`grunt watch` will listen for any changes made to the files as defined in the Gruntfile.js. When issues are encountered by any of the tasks, a desktop notification will appear to alert you to that fact.

If you want to change your project structure, you will need to adjust /Gruntfile.js accordingly to sync-up dir paths.

The Grunt Plugins I leverage are:

1. [Contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
2. [Contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
3. [Contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
4. [Contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
5. [jscs](https://github.com/jscs-dev/grunt-jscs)
6. [notify](https://github.com/dylang/grunt-notify)
7. [webpack](https://github.com/webpack/grunt-webpack)
8. [karma](https://github.com/karma-runner/grunt-karma)
