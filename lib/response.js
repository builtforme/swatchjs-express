const middleware = require('./middleware');

const response = middleware.default.response;

const REQUEST_ID_HEADER_NAME = 'x-swatch-request-id';

function responseHandler(fn, options) {
  function setResponse(req, res, next) {
    // Decide whether to set the request id as response header
    const prop = options.requestIdProp;
    if (prop !== undefined) {
      const correlationId = req.expressCtx[prop];
      if (correlationId !== undefined) {
        res.header(REQUEST_ID_HEADER_NAME, correlationId);
      }
    }

    // Process the request result and set response body
    // TODO: WTF is result?
    res.body = fn.call(req.expressCtx.swatchCtx, 'result');

    next();
  }
  return setResponse;
}

function errorResponseHandler(fn, options) {
  function setResponse(error, req, res, next) {
    // Decide whether to set the request id as response header
    const prop = options.requestIdProp;
    if (prop !== undefined) {
      const correlationId = req.expressCtx[prop];
      if (correlationId !== undefined) {
        res.header(REQUEST_ID_HEADER_NAME, correlationId);
      }
    }

    // Process the request result and set response body
    res.body = fn.call(req.expressCtx.swatchCtx, error);

    next();
  }
  return setResponse;
}

// Helper methods to set a response with no Swatch metadata
//  `ctx` is a Koa context that will handle responding
//  `result` can be any object or primitive type
function rawResponse(options) {
  return responseHandler(response.raw, options);
}

// Helper methods to set a success or error response
//  `ctx` is a Koa context that will handle responding
//  `result` can be any object or primitive type
function successResponse(options) {
  return responseHandler(response.success, options);
}

// Helper methods to set a success or error response
//  `ctx` is a Koa context that will handle responding
//  `errorObj'` can be a string, Error object, or dict
function errorResponse(options) {
  return errorResponseHandler(response.error, options);
}

module.exports = {
  errorResponse,
  rawResponse,
  successResponse,
};
