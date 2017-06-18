'use strict';

const expect = require('chai').expect;
const verbs = require('../lib/verbs');

describe('verbs', () => {
  it('should throw if verbs is passed, but is not an array', () => {
    expect(() => verbs(1)).to.throw();
  });

  it('should throw if a requested verb is not supported', () => {
    expect(() => verbs(['test'])).to.throw();
  });

  it('should use the passed array', () => {
    const array = ['get'];
    expect(verbs(array)).to.deep.equal(array);
  });

  it('should use the default verbs if a list is not passed in', () => {
    expect(verbs()).to.deep.equal(['get']);
  });
});
