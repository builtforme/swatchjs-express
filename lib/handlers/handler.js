function handler(info, params, req, res) {
  Promise
    .resolve(params)
    .then(() => info.handle(req.expressCtx))
    .then((result) => {
      res.json({
        ok: true,
        result,
      });
    }).catch((error) => {
      res.json({
        ok: false,
        error: (error && error.message) || error,
        details: (error && error.details) || undefined,
      });
    });
}

module.exports = handler;
