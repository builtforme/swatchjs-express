import util from 'util';

function getErrorMessage(errorObj) {
  return (errorObj && errorObj.message) || errorObj;
}

function getErrorDetails(errorObj) {
  return (errorObj && errorObj.details) || undefined;
}

// Helper functions to create the full response object
//  `raw` should return the object exactly as passed
function raw(result) {
  return result;
}

// `success` should return an object with ok: true
function success(result) {
  return {
    ok: true,
    result,
  };
}

// `exception` should return an object with message and details
function exception(exceptionObj) {
  const errorMessage = getErrorMessage(exceptionObj);
  const errorDetails = getErrorDetails(exceptionObj);

  return {
    ok: false,
    error: errorMessage,
    details: errorDetails,
  };
}

// `error` should either rescue an error and return success, or
//   rethrow the error/map to a new error and return an exception
function error(errorObj) {
  try {
    this.logger.error(
      `Exception thrown by Swatch handler: ${util.inspect(errorObj)}`,
    );

    // Allow client to rescue the exception and return a value
    //  which we send back to the client as a success response
    const result = this.request.onException(errorObj);

    this.logger.warn(
      `Exception was rescued... Success response: ${util.inspect(result)}`,
    );

    return success(result);
  } catch (exceptionObj) {
    this.logger.error(
      `Exception was re-thrown...: ${util.inspect(exceptionObj)}`,
    );

    // Check for the internal error code/string from the `errorObj`
    return exception(exceptionObj);
  }
}

export default {
  error,
  exception,
  raw,
  success,
};
