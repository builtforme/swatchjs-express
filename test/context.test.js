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
        done();
      }
      middleware(req, res, next);
    });
  });
});
