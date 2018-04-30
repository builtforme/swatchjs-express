const expect = require('chai').expect;
const get = require('../../../lib/middleware/methods/get');

describe('get', () => {
  it('returns ctx.query', () => {
    const expressCtx = {
      query: {
        a: 1,
        b: 2,
      },
    };
    expect(get(expressCtx)).to.deep.equal(expressCtx.query);
  });
});
