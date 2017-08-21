const handler = require('./handler');

function get(info) {
  function getHandler(req, res) {
    handler(info, req.query, res);
  }

  return getHandler;
}

module.exports = get;
