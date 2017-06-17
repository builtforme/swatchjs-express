'use strict';

const SUPPORTED_VERBS = [
  'get',
];

function verbs(requested) {
  requested = requested || SUPPORTED_VERBS;

  if (!(requested instanceof Array)) {
    throw TypeError('requested HTTP verbs must be an array');
  }

  return requested;
}

module.exports = verbs;
