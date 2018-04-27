const defaults = require('./defaults');
const context = require('./context');
const validation = require('./validation');
const handlers = require('./handlers');
const middleware = require('./middleware');

function expose(app, model, opts) {
  const options = defaults(opts);

  function addMethod(method) {
    function addRoute(supportedVerb) {
      const verb = supportedVerb.trim();
      const paramFn = middleware.default.methods[verb];

      const noAuth = method.metadata.noAuth;
      const methodHandler = handlers[verb](method);

      // const methodHandler = options.rawResponse ?
      //   handler.raw(method.handle, options) :
      //   handler.wrapped(method.handle, options);

      const contextMiddleware = context.init(options);
      const loggerMiddleware = middleware.default.logger.init;
      if (!noAuth && !options.authAdapter) {
        // TODO: We need to figure out what to do here;
        // the very simple example in the README won't work.
        // throw new Error('No authAdapter is present in options.
        // (Set "noAuth" if no authentication is desired.)');
      }
      if (noAuth && options.authAdapter) {
        throw new Error('"noAuth" is set yet an authAdapter is provided in options.');
      }
      const adapterMiddleware = noAuth || !options.authAdapter ? [] : [options.authAdapter];
      const methodMiddleware = method.metadata.middleware;
      const validateMiddleware = validation.middleware(method.validate, paramFn);

      const loggerM = [contextMiddleware, loggerMiddleware];
      const adapterM = loggerM.concat(adapterMiddleware);
      const validatorM = adapterM.concat(
        [validateMiddleware],
      );
      const methodM = validatorM.concat(methodMiddleware);
      const allMiddleware = methodM.concat([methodHandler]);

      app[verb](`${options.prefix}${method.name}`, ...allMiddleware);
    }

    options.verbs.forEach(addRoute);
  }

  model.forEach(method => addMethod(method));
}

module.exports = expose;
