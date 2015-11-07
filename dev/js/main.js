require('../css/sass/general.scss');
var dep = require('./exampleDependency.js');

function Example () {
  this.dep = dep;
}

window.example = new Example();
