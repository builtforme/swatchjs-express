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
      headers: Object.assign({}, req.headers),
      // href: expressCtx.request.href,
      // host: expressCtx.request.host,
      method: req.method,
      // origin: expressCtx.request.origin,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      secure: req.secure,
      // url: expressCtx.request.url,
    };

    // Set internal properties for Swatch request context
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
