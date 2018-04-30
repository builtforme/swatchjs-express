// Given the swatch configuration options, check for an
//  `onException` handler and return a KOA-compliant middleware
//   function that will init the swatch context and then await
function init(options) {
  async function swatchCtxMiddleware(req, res, next) {
    // Add an expressCtx on the request if not already present.
    req.expressCtx = req.expressCtx || {};

    // Create the swatchCtx object from the Express ctx
    req.expressCtx.swatchCtx = {};

    // Allow access to Express ctx in case of emergency - Private
    req.expressCtx.swatchCtx.expressCtx = () => (req.expressCtx);

    req.expressCtx.swatchCtx.req = {
      // TODO: These are all things that swatchjs-koa handles.
      // Leaving them here for us to add them into the express version in the future.

      // headers: Object.assign({}, expressCtx.request.headers),
      // href: expressCtx.request.href,
      // host: expressCtx.request.host,
      // method: expressCtx.request.method,
      // origin: expressCtx.request.origin,
      // path: expressCtx.request.path,
      // protocol: expressCtx.request.protocol,
      // query: expressCtx.request.query,
      // secure: expressCtx.request.secure,
      // url: expressCtx.request.url,
    };
    req.expressCtx.swatchCtx.request = {
      onException: options.onException,
    };

    // Continue chain of handlers
    await next();
  }

  return swatchCtxMiddleware;
}


module.exports = {
  init,
};
