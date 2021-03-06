const { expect } = require('chai');

const logger = require('../../lib/middleware/logger');

describe('logger', () => {
  it('uses the expressCtx.log logger if available', async () => {
    const existingLogger = 'some-existing-logger';
    const req = {
      expressCtx: {
        log: existingLogger,
        swatchCtx: {},
      },
    };
    const res = undefined;
    await logger.init(req, res, () => {
      expect(req.expressCtx.swatchCtx.logger).to.equal(existingLogger);
    });
  });

  it('creates a new bunyan logger if not', async () => {
    const req = {
      expressCtx: {
        swatchCtx: {},
      },
    };
    const res = undefined;
    await logger.init(req, res, () => {
      expect(req.expressCtx.swatchCtx.logger).not.to.be.an('undefined');
    });
  });
});
