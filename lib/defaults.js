'use strict';

const verbs = require('./verbs');

function defaults(options) {
  return {
    verbs: verbs(options && options.verbs),
  };
}

module.exports = defaults;
