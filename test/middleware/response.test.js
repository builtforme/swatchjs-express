const { expect } = require('chai');
const sinon = require('sinon');

const response = require('../../lib/middleware/response');

describe('response', () => {
  describe('error', () => {
    it('allows request.onException to return a success response', () => {
      const result = {
        x: true,
      };
      const loggerErrorSpy = sinon.spy();
      const loggerWarnSpy = sinon.spy();
      const onExceptionStub = sinon.stub().returns(result);
      expect(response.error.apply({
        logger: {
          error: loggerErrorSpy,
          warn: loggerWarnSpy,
        },
        request: {
          onException: onExceptionStub,
        },
      }, [{
        message: 'some message',
        details: 'some details',
      }])).to.deep.equal({
        ok: true,
        result,
      });
    });

    it('returns a rethrown exception with ok: false', () => {
      const result = {
        x: true,
      };
      const loggerErrorSpy = sinon.spy();
      const loggerWarnSpy = sinon.spy();
      const onExceptionStub = sinon.stub().throws(result);
      expect(response.error.apply({
        logger: {
          error: loggerErrorSpy,
          warn: loggerWarnSpy,
        },
        request: {
          onException: onExceptionStub,
        },
      }, [{
        message: 'some message',
        details: 'some details',
      }])).to.deep.equal({
        ok: false,
        error: result,
        details: undefined,
      });
    });

    it('returns an object with both error but no details when details not present', () => {
      expect(response.exception({
        x: 'some message',
      })).to.deep.equal({
        ok: false,
        error: { x: 'some message' },
        details: undefined,
      });
    });
  });

  describe('exception', () => {
    it('returns an object with both error and details', () => {
      expect(response.exception({
        message: 'some message',
        details: 'some details',
      })).to.deep.equal({
        ok: false,
        error: 'some message',
        details: 'some details',
      });
    });

    it('returns an object with error but no details when details not present', () => {
      expect(response.exception({
        message: 'some message',
      })).to.deep.equal({
        ok: false,
        error: 'some message',
        details: undefined,
      });
    });

    it('returns an object with both error but no details when details not present', () => {
      expect(response.exception({
        x: 'some message',
      })).to.deep.equal({
        ok: false,
        error: { x: 'some message' },
        details: undefined,
      });
    });
  });

  describe('raw', () => {
    it('returns whatever was passed', () => {
      expect(response.raw('x')).to.equal('x');
      expect(response.raw({
        x: true,
      })).to.deep.equal({ x: true });
    });
  });

  describe('success', () => {
    it('wraps whatever was passed', () => {
      expect(response.success('x')).to.deep.equal({
        ok: true,
        result: 'x',
      });
      expect(response.success({
        x: true,
      })).to.deep.equal({
        ok: true,
        result: { x: true },
      });
    });
  });
});
