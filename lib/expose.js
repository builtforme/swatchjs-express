'use strict';

const defaults = require('./defaults');
const handlers = require('./handlers');

function expose(app, model, options) {
  options = defaults(options);
  model.forEach(method => addMethod(method));

  function addMethod(method) {
    options.verbs.forEach(addRoute);

    function addRoute(verb) {
      verb = verb.trim();

      //console.log(`Registered ${verb} ${method.route}`);
      app[verb](method.route, handlers[verb](method));
    }
  }
}

module.exports = expose;
