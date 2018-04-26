// Each swatch method has an expected `validate` method,
//  which needs to be wrapped into KOA-compliant middleware
// Given that `validateFn`, plus a `paramFn` that maps from
//  the KOA context to the request params, return middleware
function middleware(validateFn, paramFn) {
  async function validationMiddleware(expressCtx, next) {
    // Get the params from request body and validate
    //  Updates expressCtx.swatchCtx with validated params
    const requestParams = paramFn(expressCtx);
    validateFn(expressCtx, requestParams);

    await next();
  }

  return validationMiddleware;
}

module.exports = {
  middleware,
};
