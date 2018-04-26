const handler = require('./handler');

function post(info) {
  function postHandler(req, res) {
    handler(info, req.body, req, res);
  }

  return postHandler;
}

module.exports = post;
