'use strict';

const verbs = require('./web-methods');
const SUPPORTED_VERBS = Object.keys(verbs);

function defaults(options) {
  return {
    verbs: defaultVerbs(options && options.verbs),
  };
}

function defaultVerbs(requested) {
  if (requested && !(requested instanceof Array)) {
    throw TypeError('requested HTTP verbs must be an array');
  }

  // requested verbs must be supported
  requested && requested.forEach(verb => {
    if (!(verb in verbs)) {
      throw `requested verb '${verb}' is not supported`;
    }
  });

  return requested || SUPPORTED_VERBS;
}

module.exports = defaults;
