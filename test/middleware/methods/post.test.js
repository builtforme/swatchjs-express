const expect = require('chai').expect;
const post = require('../../../lib/middleware/methods/post');

describe('post', () => {
  it('returns ctx.request.body', () => {
    const req = {
      body: {
        a: 1,
        b: 2,
      },
    };
    expect(post(req)).to.deep.equal(req.body);
  });
});
