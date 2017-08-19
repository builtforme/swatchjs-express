const handler = require('./handler');

function post(info) {
  function postHandler(req, res) {
    handler(info, req.body, res);
  }

  return postHandler;
}

module.exports = post;
