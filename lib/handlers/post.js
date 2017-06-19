'use strict';

const handler = require('./handler');

function post(info) {
  return postHandler;

  function postHandler(req, res, next) {
    handler(info, req.body, res);
  }
}

module.exports = post;
