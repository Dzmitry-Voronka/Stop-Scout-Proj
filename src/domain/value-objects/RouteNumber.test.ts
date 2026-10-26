import { RouteNumber } from './RouteNumber';

describe('RouteNumber', () => {
  describe('operator prefix', () => {
    it('strips the TRISTAR prefix from a number', () => {
      expect(RouteNumber.create(10177).value).toBe('177');
    });

    it('strips the TRISTAR prefix from a numeric string', () => {
      expect(RouteNumber.create('10177').value).toBe('177');
    });

    it('keeps a number below 10000 unchanged', () => {
      expect(RouteNumber.create(9999).value).toBe('9999');
    });

    it('strips the prefix at the lower boundary 10001', () => {
      expect(RouteNumber.create(10001).value).toBe('1');
    });
  });

  describe('unknown route', () => {
    it.each([null, undefined, '', '   '])('returns "?" for %p', (raw) => {
      expect(RouteNumber.create(raw).value).toBe('?');
    });
  });

  describe('non-numeric lines', () => {
    it('trims and uppercases the text', () => {
      expect(RouteNumber.create('  n1 ').value).toBe('N1');
    });

    it('does not apply the prefix rule to text that contains digits', () => {
      expect(RouteNumber.create('N10177').value).toBe('N10177');
    });
  });

  describe('isNightLine', () => {
    it('is true for a line starting with N', () => {
      expect(RouteNumber.create('N1').isNightLine()).toBe(true);
    });

    it('is false for a day line', () => {
      expect(RouteNumber.create(177).isNightLine()).toBe(false);
    });

    it('is false for an unknown route', () => {
      expect(RouteNumber.create(null).isNightLine()).toBe(false);
    });
  });

  describe('equality', () => {
    it('is equal by value, not by reference', () => {
      expect(RouteNumber.create(10177).equals(RouteNumber.create('177'))).toBe(true);
    });

    it('is not equal for different lines', () => {
      expect(RouteNumber.create(177).equals(RouteNumber.create(178))).toBe(false);
    });
  });
});
