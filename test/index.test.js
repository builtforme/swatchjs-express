'use strict';

const expect = require('chai').expect;
const apiMethodsExpress = require('..');

describe('index', () => {
  it('should contain a load function', () => {
    expect(apiMethodsExpress.load).to.be.a('function');
  });
});
