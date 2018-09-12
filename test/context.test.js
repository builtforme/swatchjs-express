const sinon = require('sinon');

const { expect } = require('chai');

const context = require('../lib/context');

describe('context', () => {
  const req = {
    get: (arg) => {
      const headers = {
        host: 'localhost:3123',
        origin: 'localhost:3124',
      };
      return headers[arg];
    },
    headers: { authorization: 'value' },
    method: 'GET',
    originalUrl: '/some/path',
    path: 'some/path',
    protocol: 'http',
    query: { name: 'test' },
    secure: false,
  };
  const res = {};

  describe('init', () => {
    it('returns a middleware function', async () => {
      const options = {
        onException: sinon.stub(),
      };
      const middleware = context.init(options);

      async function next() {
        expect(options.onException.called).to.equal(false);

        expect(req.expressCtx).not.to.be.a('null');

        expect(req.expressCtx.swatchCtx.req.headers).to.deep.equal(req.headers);
        expect(req.expressCtx.swatchCtx.req.href).to.deep.equal('http://localhost:3123/some/path');
        expect(req.expressCtx.swatchCtx.req.host).to.deep.equal('localhost:3123');
        expect(req.expressCtx.swatchCtx.req.method).to.deep.equal('GET');
        expect(req.expressCtx.swatchCtx.req.origin).to.deep.equal('localhost:3124');
        expect(req.expressCtx.swatchCtx.req.path).to.deep.equal('some/path');
        expect(req.expressCtx.swatchCtx.req.protocol).to.deep.equal('http');
        expect(req.expressCtx.swatchCtx.req.query).to.deep.equal({ name: 'test' });
        expect(req.expressCtx.swatchCtx.req.secure).to.deep.equal(false);
        expect(req.expressCtx.swatchCtx.req.url).to.deep.equal('some/path');

        // Make sure we can get the expressCtx from the swatchCtx
        expect(req.expressCtx.swatchCtx.expressCtx()).to.deep.equal(req.expressCtx);
      }

      await middleware(req, res, next);
    });
  });
});
