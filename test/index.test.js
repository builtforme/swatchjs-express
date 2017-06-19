'use strict';

const expect = require('chai').expect;
const apiMethodsExpress = require('..');

describe('index', () => {
  it('should be a function that exposes the API', () => {
    expect(apiMethodsExpress).to.be.a('function');
  });
});
