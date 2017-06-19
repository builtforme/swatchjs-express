'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const apiMethods = require('api-methods');
const get = require('../lib/web-methods/get');

describe('get', () => {
  it('should write a JSON success response if function succeeds', done => {
    const model = apiMethods({
      "add": {
        handler: (a, b) => a + b,
      },
    });
    let req = {
      query: {
        'a': 1,
        'b': 2,
      },
    };
    let res = {
      json: res => {
        expect(res).to.deep.equal({
          ok: true,
          result: 3,
        });
        done();
      },
    };

    const handler = get(model[0]);
    handler(req, res);
  });

  it('should write a JSON error response if function fail', done => {
    const model = apiMethods({
      "add": {
        handler: (a, b) => { throw 'some_error'; },
      },
    });
    let req = {
      query: {
        'a': 1,
        'b': 2,
      },
    };
    let res = {
      json: res => {
        expect(res).to.deep.equal({
          ok: false,
          error: 'some_error',
        });
        done();
      },
    };

    const handler = get(model[0]);
    handler(req, res);
  });
});
