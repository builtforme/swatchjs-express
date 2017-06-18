'use strict';

function handler(info, params, res) {
  Promise
    .resolve(params)
    .then(args => {
      return info.handle(args);
    }).then(result => {
      res.json({ok: true, result});
    }).catch(error => {
      res.json({
        ok: false,
        error: (error && error.message) || error,
      });
    });
}

module.exports = handler;
