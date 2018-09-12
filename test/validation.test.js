const { expect } = require('chai');

const validation = require('../lib/validation');

describe('validation', () => {
  it('returns middleware which calls paramFn first, then validateFn', (done) => {
    const req = {
      params: { x: true },
      expressCtx: {
        swatchCtx: {},
      },
    };
    const res = undefined;

    function validateFn(ctx, params) {
      expect(ctx).to.deep.equal(req.expressCtx);
      expect(params).to.deep.equal(req.params);

      done();
    }

    function paramFn(request) {
      return request.params;
    }

    const middlewareFn = validation.middleware(validateFn, paramFn);
    middlewareFn(req, res, () => Promise.resolve);
  });
});
