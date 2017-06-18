'use strict';

const expect = require('chai').expect;
const webMethods = require('../lib/web-methods');

describe('webMethods', () => {
  it('should contain all verbs', () => {
    expect(Object.keys(webMethods)).to.have.lengthOf(2);
    expect(webMethods).to.include.all.keys('get', 'post');
  });
});
