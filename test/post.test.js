'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const apiMethods = require('api-methods');
const post = require('../lib/web-methods/post');

describe('post', () => {
  it('should write a JSON success response if function succeeds', done => {
    const model = apiMethods.load({
      "add": {
        handler: (a, b) => a + b,
      },
    });
    let req = {
      body: {
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

    const handler = post(model[0]);
    handler(req, res);
  });

  it('should write a JSON error response if function fail', done => {
    const model = apiMethods.load({
      "add": {
        handler: (a, b) => { throw 'some_error'; },
      },
    });
    let req = {
      body: {
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

    const handler = post(model[0]);
    handler(req, res);
  });
});
