'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const apiMethods = require('api-methods');
const expose = require('../lib/expose');

function getModel() {
  const model = apiMethods({
    "add": {
      handler: (a, b) => a + b,
    },
    "sub": {
      handler: (a, b) => a - b,
    },
  });

  return model;
};

describe('expose', () => {
  let app;

  beforeEach(() => {
    app = {
      get: sinon.spy(),
    };
  });

  it('should register each method for requested verb', () => {
    const model = getModel();
    const options = {
      verbs: [ 'get' ],
    };

    expose(app, model, options);

    expect(app.get.getCall(0).calledWith('/add')).to.be.true;
    expect(app.get.getCall(1).calledWith('/sub')).to.be.true;
  });
});
