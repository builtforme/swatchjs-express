'use strict';

const SUPPORTED_VERBS = [
  'get',
];

function verbs(requested) {
  if (requested && !(requested instanceof Array)) {
    throw TypeError('requested HTTP verbs must be an array');
  }

  // requested verbs must be supported
  requested && requested.forEach(verb => {
    if (!SUPPORTED_VERBS.includes(verb)) {
      throw `requested verb '${verb}' is not supported`;
    }
  });

  return requested || SUPPORTED_VERBS;
}

module.exports = verbs;
