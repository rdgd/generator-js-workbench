var dep = require('./exampleDependency.js');

function ExampleModule () {
  this.dep = dep;
}

module.exports = ExampleModule;
