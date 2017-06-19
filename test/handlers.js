'use strict';

const expect = require('chai').expect;
const apiMethods = require('api-methods');
const handlers = require('../lib/handlers');

describe('handlers', () => {
  describe('index', () => {
    it('should contain all verbs', () => {
      expect(Object.keys(handlers)).to.have.lengthOf(2);
      expect(handlers).to.include.all.keys('get', 'post');
    });
  });

  describe('verbs', () => {
    Object.keys(handlers).forEach(verb => {
      describe(verb, () => {
        it('should write a JSON success response if function succeeds', done => {
          const fn = (a, b) => a + b;
          const expected = {
            ok: true,
            result: 3,
          };

          invokeHandler(fn, verb, expected, done);
        });

        it('should write a JSON error response if function fail', done => {
          const fn = (a, b) => { throw 'some_error'; };
          const expected = {
            ok: false,
            error: 'some_error',
          };

          invokeHandler(fn, verb, expected, done);
        });
      });
    });
  });
});

function invokeHandler(fn, verb, expected, done) {
  const model = apiMethods({
    fn: fn,
  });
  const req = createReq({a: 1, b: 2}, verb);
  const res = {
    json: res => {
      expect(res).to.deep.equal(expected);
      done();
    },
  };

  const handler = handlers[verb](model[0]);
  handler(req, res);
}

function createReq(params, verb) {
  const fields = {
    get: 'query',
    post: 'body',
  };

  const req = {};
  req[fields[verb]] = params;
  return req;
}
