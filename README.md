# CIBP
Boilerplate for crushing it, 2015.

This is a boilerplate for utilizing Grunt to enforce my Javascript coding style rules, lint all Javascript any time a JS file is modified, and compile SASS files to minified CSS any time a .scss file is modified. 

The default [Grunt](http://gruntjs.com) command will do all the mentioned above plus minify JS in a build folder with a date/time-stamped directory. This part still needs a bit of work.

##Dependencies:
1. [NPM (Node Package Manager)](https://docs.npmjs.com/getting-started/installing-node)

##Steps to use:
1. Clone repository.
2. In project root `npm install`. 
3. In project root `grunt watch`.
4. That's all.

`npm install` installs all of the Grunt task deps, and `grunt watch` will listen for any changes made to the files as defined in the Gruntfile.js. When issues are encountered by any of the tasks, a desktop notification will appear to alert you to that fact.

If you want to change your project structure, you will need to adjust the Gruntfile.js accordingly to sync-up dir paths.

The Grunt Plugins I leverage are:

1. [Contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
2. [Contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
3. [Contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
4. [Contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
5. [jscs](https://github.com/jscs-dev/grunt-jscs)
6. [notify](https://github.com/dylang/grunt-notify)
