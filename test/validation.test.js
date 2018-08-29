const { expect } = require('chai');

const validation = require('../lib/validation');

describe('validation', () => {
  it('returns middleware which calls paramFn first, then validateFn', (done) => {
    const req = {
      params: 'x',
      expressCtx: {
        swatchCtx: {

        },
      },
    };
    const res = undefined;
    function validate(ctx, params) {
      expect(ctx).to.deep.equal(req.expressCtx);
      expect(params).to.deep.equal(req.params);
      done();
    }

    function param(request) {
      return request.params;
    }
    validation.middleware(validate, param)(req, res, () => Promise.resolve);
  });
});
