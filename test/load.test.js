'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const apiMethods = require('api-methods');
const load = require('../lib/load');

function getModel() {
  const model = apiMethods.load({
    "add": {
      handler: (a, b) => a + b,
    },
    "sub": {
      handler: (a, b) => a - b,
    },
  });

  return model;
};

describe('load', () => {
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

    load(app, model, options);

    expect(app.get.getCall(0).calledWith('/add')).to.be.true;
    expect(app.get.getCall(1).calledWith('/sub')).to.be.true;
  });
});
