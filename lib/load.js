'use strict';

const defaults = require('./defaults');
const webMethods = require('./web-methods');

function load(app, model, options) {
  options = defaults(options);
  model.forEach(method => addMethod(method));

  function addMethod(method) {
    options.verbs.forEach(addRoute);

    function addRoute(verb) {
      verb = verb.trim();

      //console.log(`Registered ${verb} ${method.route}`);
      app[verb](method.name, webMethods[verb](method));
    }
  }
}

module.exports = load;
