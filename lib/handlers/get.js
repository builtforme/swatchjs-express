const handler = require('./handler');

function get(info) {
  function getHandler(req, res) {
    handler(info, req.query, req, res);
  }

  return getHandler;
}

module.exports = get;
