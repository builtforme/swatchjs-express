// Each swatch method has an expected `validate` method,
//  which needs to be wrapped into Express-compliant middleware
// Given that `validateFn`, plus a `paramFn` that maps from
//  the Express context to the request params, return middleware
function middleware(validateFn, paramFn) {
  async function validationMiddleware(req, res, next) {
    // Get the params from request body and validate
    //  Updates expressCtx.swatchCtx with validated params
    const requestParams = paramFn(req);
    validateFn(req.expressCtx, requestParams);

    await next();
  }

  return validationMiddleware;
}

module.exports = {
  middleware,
};
