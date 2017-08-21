const expect = require('chai').expect;
const sinon = require('sinon');
const swatch = require('swatchjs');
const expose = require('../lib/expose');
const handlers = require('../lib/handlers');

function getApp(verbs) {
  const app = {};
  verbs.forEach((verb) => { app[verb] = sinon.spy(); });
  return app;
}

function getModel() {
  const model = swatch({
    add: {
      handler: (a, b) => a + b,
    },
    sub: {
      handler: (a, b) => a - b,
    },
  });

  return model;
}

describe('expose', () => {
  it('should only register the requested verbs', () => {
    const verbs = ['get'];
    const app = getApp(verbs);
    const model = getModel();
    const options = {
      verbs,
    };

    expose(app, model, options);

    expect(app.get.getCall(0).calledWith('/add')).to.equal(true);
    expect(app.get.getCall(1).calledWith('/sub')).to.equal(true);
  });

  it('should register all verbs if no verbs were specified', () => {
    const verbs = Object.keys(handlers);
    const app = getApp(verbs);
    const model = getModel();

    expose(app, model);

    verbs.forEach((verb) => {
      expect(app[verb].getCall(0).calledWith('/add')).to.equal(true);
      expect(app[verb].getCall(1).calledWith('/sub')).to.equal(true);
    });
  });

  it('should use the specified prefix', () => {
    const verbs = Object.keys(handlers);
    const app = getApp(verbs);
    const model = getModel();
    const prefix = 'api';
    const options = {
      prefix,
    };

    expose(app, model, options);

    verbs.forEach((verb) => {
      expect(app[verb].getCall(0).calledWith(`/${prefix}/add`)).equal(true);
      expect(app[verb].getCall(1).calledWith(`/${prefix}/sub`)).equal(true);
    });
  });
});
