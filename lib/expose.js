'use strict';

const defaults = require('./defaults');
const webMethods = require('./web-methods');

function expose(app, model, options) {
  options = defaults(options);
  model.forEach(method => addMethod(method));

  function addMethod(method) {
    options.verbs.forEach(addRoute);

    function addRoute(verb) {
      verb = verb.trim();

      //console.log(`Registered ${verb} ${method.route}`);
      app[verb](method.route, webMethods[verb](method));
    }
  }
}

module.exports = expose;
