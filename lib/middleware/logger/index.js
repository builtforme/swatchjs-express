import bunyan from 'bunyan';

function ensureLogger(logger) {
  // Check for a logger created by the client
  if (logger) { return logger; }

  // Otherwise create a default swatch-koa logger
  return bunyan.createLogger({
    name: 'swatch-express',
  });
}

async function initLogger(req, res, next) {
  // Check the expressCtx for a koa-bunyan-logger and set on swatchCtx
  req.expressCtx.swatchCtx.logger = ensureLogger(req.expressCtx.log);

  // Continue chain of handlers
  await next();
}

export default {
  init: initLogger,
};
