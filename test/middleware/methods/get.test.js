const { expect } = require('chai');

const get = require('../../../lib/middleware/methods/get');

describe('get', () => {
  it('returns ctx.query', () => {
    const req = {
      query: {
        a: 1,
        b: 2,
      },
    };
    expect(get(req)).to.deep.equal(req.query);
  });
});
