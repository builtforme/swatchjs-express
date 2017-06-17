'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const apiMethods = require('api-methods');
const apiMethodsExpress = require('..');

function getModel() {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const api = {
    "numbers.add": {
      handler: add,
      args: {
        a: {
            type: Number,
            required: true,
        },
        b: {
            type: Number,
            required: true,
        },
      },
    },
    "numbers.sub": {
      handler: sub,
      args: {
        a: {
            type: Number,
            required: true,
        },
        b: {
            type: Number,
            required: true,
        },
      },
    },
  };
  const model = apiMethods.model(api);

  return model;
};

describe('Routes', () => {
  let app;

  beforeEach(() => {
    app = {
      get: sinon.spy(),
    };
  });

  it('should add routes for all methods in the model', () => {
    const model = getModel();
    const methods = model.length;
    const options = {
      verbs: [ 'get' ],
    };

    apiMethodsExpress.load(app, model, options);

    app.get.getCall(0).calledWith('/numbers.add');
    app.get.getCall(1).calledWith('/numbers.sub');
  });
});
