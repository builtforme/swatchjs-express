function handler(info, params, res) {
  Promise
    .resolve(params)
    .then(info.handle)
    .then((result) => {
      res.json({ ok: true, result });
    }).catch((error) => {
      res.json({
        ok: false,
        error: (error && error.message) || error,
        details: (error && error.details) || undefined,
      });
    });
}

module.exports = handler;
