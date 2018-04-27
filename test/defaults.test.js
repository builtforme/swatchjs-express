const expect = require('chai').expect;
const defaults = require('../lib/defaults');
const handlers = require('../lib/handlers');

describe('defaults', () => {
  describe('options', () => {
    it('should include all default options', () => {
      const options = defaults();
      expect(options).to.be.an('object').that.has.all.keys('verbs', 'prefix', 'onException');
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
      expect(defaults().verbs).to.deep.equal(Object.keys(handlers));
    });
  });

  describe('prefix', () => {
    it('should use the passed prefix', () => {
      const prefix = 'api';
      const options = {
        prefix,
      };
      expect(defaults(options).prefix).to.equal(`/${prefix}/`);
    });

    it('should use the default prefix if not specified', () => {
      expect(defaults({}).prefix).to.equal('/');
    });
  });

  describe('onException', () => {
    it('should use the passed onException method', () => {
      function onExceptionHandler() {
      }
      const options = {
        onException: onExceptionHandler,
      };

      expect(defaults(options).onException).to.deep.equal(onExceptionHandler);
    });

    it('should throw an error if the passed onException property is not a method', () => {
      const options = {
        onException: true,
      };

      expect(() => defaults(options).onException).to.throw();
    });

    it('should use the default method if not specified', () => {
      const defaultFunction = defaults({}).onException;
      expect(typeof defaultFunction).to.equal('function');

      // Make sure the default method rethrows any error
      const err = { x: true };
      expect(() => defaultFunction(err)).to.throw();
    });
  });
});
