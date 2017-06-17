'use strict';

function getArgsArray(info, args) {
  return info.args.map(arg => args[arg]);
}

function handle(info, args) {
  const argsArray = getArgsArray(info, args);
  return info.handler.apply(null, argsArray);
}

function getArgsFromRequest(info, req) {
  return Object.keys(info.method.args).reduce(extract, {});

  function extract(params, arg) {
    const value = req.query[arg];
    const param = info.method.args[arg];

    if (param.required && value === void 0) {
      throw `required parameter ${arg} missing`;
    }
    params[arg] = (param.type && param.type(value)) || value;
  }
}

function get(info) {
  return handler;

  function handler(req, res, next) {
    const initial = getArgsFromRequest(info, req);

    Promise
      .resolve(initial)
      .then(args => {
        return handle(info, args);
      }).then(result => {
        res.json({ok: true, result});
      }).catch(error => {
        res.json({
          ok: false,
          error: (error && error.message) || error,
        });
      });
  }
}

module.exports = get;
