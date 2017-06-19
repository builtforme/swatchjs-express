'use strict';

const expect = require('chai').expect;
const defaults = require('../lib/defaults');
const verbs = require('../lib/web-methods');

describe('defaults', () => {
  describe('options', () => {
    it('should include all default options', () => {
      const options = defaults();
      expect(options).to.be.an('object').that.has.all.keys('verbs');
    });
  });

  describe('verbs', () => {
    it('should throw if verbs is passed, but is not an array', () => {
      const options = {
        verbs: 1,
      };
      expect(() => defaults(options)).to.throw();
    });

    it('should throw if a requested verb is not supported', () => {
      const options = {
        verbs: ['test'],
      };
      expect(() => defaults(options)).to.throw();
    });

    it('should use the passed array', () => {
      const expectedVerbs = ['get'];
      const options = {
        verbs: expectedVerbs,
      };
      expect(defaults(options).verbs).to.deep.equal(expectedVerbs);
    });

    it('should use the default verbs if a list is not passed in', () => {
      expect(defaults().verbs).to.deep.equal(Object.keys(verbs));
    });
  });
});
