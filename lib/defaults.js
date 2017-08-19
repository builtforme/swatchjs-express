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

function defaults(options) {
  return {
    verbs: defaultVerbs(options && options.verbs),
    prefix: defaultPrefix(options && options.prefix),
  };
}

module.exports = defaults;
