'use strict';

const handler = require('./handler');

function get(info) {
  return getHandler;

  function getHandler(req, res, next) {
    handler(info, req.query, res);
  }
}

module.exports = get;
