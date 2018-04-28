const expect = require('chai').expect;
const context = require('../lib/context');

describe('context', () => {
  describe('init', () => {
    it('returns a middleware function', (done) => {
      const middleware = context.init({
        onException: function onException() {},
      });

      const req = {};
      const res = {};
      async function next() {
        expect(req.expressCtx).not.to.be.a('null');

        // Make sure we can get the expressCtx from the swatchCtx
        expect(req.expressCtx.swatchCtx.expressCtx()).to.deep.equal(req.expressCtx);
        done();
      }
      middleware(req, res, next);
    });
  });
});
