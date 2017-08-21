const defaults = require('./defaults');
const handlers = require('./handlers');

function expose(app, model, opts) {
  const options = defaults(opts);

  function addMethod(method) {
    function addRoute(supportedVerb) {
      const verb = supportedVerb.trim();

      app[verb](`${options.prefix}${method.name}`, handlers[verb](method));
    }

    options.verbs.forEach(addRoute);
  }

  model.forEach(method => addMethod(method));
}

module.exports = expose;
