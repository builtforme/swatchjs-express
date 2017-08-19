const expect = require('chai').expect;
const swatch = require('swatchjs');
const handlers = require('../../lib/handlers');

function createReq(params, verb) {
  const fields = {
    get: 'query',
    post: 'body',
  };

  const req = {};
  req[fields[verb]] = params;
  return req;
}

function invokeHandler(fn, verb, expected, done) {
  const model = swatch({ fn });
  const req = createReq({ a: 1, b: 2 }, verb);
  const res = {
    json: (r) => {
      expect(r).to.deep.equal(expected);
      done();
    },
  };

  const handler = handlers[verb](model[0]);
  handler(req, res);
}

describe('handlers', () => {
  describe('index', () => {
    it('should contain all verbs', () => {
      expect(handlers).to.be.an('object').that.has.all.keys('get', 'post');
    });
  });

  describe('verbs', () => {
    Object.keys(handlers).forEach((verb) => {
      describe(verb, () => {
        it('should write a JSON success response if function succeeds', (done) => {
          const fn = (a, b) => a + b;
          const expected = {
            ok: true,
            result: 3,
          };

          invokeHandler(fn, verb, expected, done);
        });

        it('should write a JSON error response if function fails', (done) => {
          const fn = (a, b) => {
            const err = `some_error: ${a + b}`;
            throw err;
          };
          const expected = {
            ok: false,
            error: 'some_error: 3',
            details: undefined,
          };

          invokeHandler(fn, verb, expected, done);
        });

        it('should write a JSON error response with details if function fails', (done) => {
          const fn = (a, b) => {
            const err = {
              message: 'some_error',
              details: `Result: ${a + b}`,
            };
            throw err;
          };
          const expected = {
            ok: false,
            error: 'some_error',
            details: 'Result: 3',
          };

          invokeHandler(fn, verb, expected, done);
        });
      });
    });
  });
});
