const handlers = require('./handlers');

const SUPPORTED_VERBS = Object.keys(handlers);

function defaultVerbs(requested) {
  if (requested && !(requested instanceof Array)) {
    throw TypeError('requested HTTP verbs must be an array');
  }

  // requested verbs must be supported
  if (requested) {
    requested.forEach((verb) => {
      if (!(verb in handlers)) {
        throw new Error(`requested verb '${verb}' is not supported`);
      }
    });
  }

  return requested || SUPPORTED_VERBS;
}

function defaultPrefix(prefix) {
  return (prefix && `/${prefix}/`) || '/';
}

function defaultOnException(onException) {
  if (onException !== undefined) {
    if (!(typeof onException === 'function')) {
      throw TypeError('function required for onException');
    }
  }

  // Rethrow the existing error by default
  function noopOnException(error) {
    throw error;
  }

  return onException || noopOnException;
}

function defaults(options) {
  return {
    verbs: defaultVerbs(options && options.verbs),
    onException: defaultOnException(options && options.onException),
    prefix: defaultPrefix(options && options.prefix),
  };
}

module.exports = defaults;
