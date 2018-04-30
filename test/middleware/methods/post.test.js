const expect = require('chai').expect;
const post = require('../../../lib/middleware/methods/post');

describe('post', () => {
  it('returns ctx.request.body', () => {
    const expressCtx = {
      request: {
        body: {
          a: 1,
          b: 2,
        },
      },
    };
    expect(post(expressCtx)).to.deep.equal(expressCtx.request.body);
  });
});
