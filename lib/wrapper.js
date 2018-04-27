const response = require('./response');

// Generic function to wrap any `fn` as middleware
//  `fn` signature accepts a ctx + next callback
//  `ctxFn` maps from expressCtx to the expect `fn` ctx
//  Catches any errors and returns an error response
function wrap(fn, options, ctxFn) {
  async function middlewareWrapper(req, res, next) {
    try {
      const ctx = ctxFn(req.expressCtx);
      await fn(ctx, next);
    } catch (error) {
      // Auth error should trigger failure response
      response.errorResponse(options)(error, req, res);
    }
  }

  return middlewareWrapper;
}

// Wrap `fn` into middleware that accepts an Express ctx
function wrapExpress(fn, options) {
  return wrap(fn, options, expressCtx => (expressCtx));
}

// Wrap `fn` into middleware that accepts a Swatch ctx
function wrapSwatch(fn, options) {
  return wrap(fn, options, expressCtx => (expressCtx.swatchCtx));
}


module.exports = {
  wrapExpress,
  wrapSwatch,
};
