import { DepartureDelay } from './DepartureDelay';

describe('DepartureDelay', () => {
  describe('on time', () => {
    it.each([null, undefined, 0, -30, NaN, Infinity])('is on time for %p', (raw) => {
      const delay = DepartureDelay.create(raw);

      expect(delay.severity).toBe('on-time');
      expect(delay.label).toBe('Na czas');
      expect(delay.shouldPulse).toBe(false);
    });

    it('treats a fraction below one second as on time', () => {
      expect(DepartureDelay.create(0.9).severity).toBe('on-time');
    });
  });

  describe('minor delay', () => {
    it('starts at 1 second', () => {
      const delay = DepartureDelay.create(1);

      expect(delay.severity).toBe('minor');
      expect(delay.label).toBe('+1s');
    });

    it('shows seconds, for example +90s', () => {
      expect(DepartureDelay.create(90).label).toBe('+90s');
    });

    it('still is minor at 119 seconds and does not pulse', () => {
      const delay = DepartureDelay.create(119);

      expect(delay.severity).toBe('minor');
      expect(delay.label).toBe('+119s');
      expect(delay.shouldPulse).toBe(false);
    });
  });

  describe('major delay', () => {
    it('starts at 120 seconds and pulses', () => {
      const delay = DepartureDelay.create(120);

      expect(delay.severity).toBe('major');
      expect(delay.label).toBe('+2 min');
      expect(delay.shouldPulse).toBe(true);
    });

    it('rounds minutes down', () => {
      expect(DepartureDelay.create(179).label).toBe('+2 min');
    });

    it('shows +3 min for 200 seconds', () => {
      expect(DepartureDelay.create(200).label).toBe('+3 min');
    });
  });

  describe('equality', () => {
    it('is equal by value', () => {
      expect(DepartureDelay.create(90).equals(DepartureDelay.create(90.7))).toBe(true);
    });

    it('treats null and a negative delay as equal', () => {
      expect(DepartureDelay.create(null).equals(DepartureDelay.create(-5))).toBe(true);
    });

    it('is not equal for different delays', () => {
      expect(DepartureDelay.create(60).equals(DepartureDelay.create(61))).toBe(false);
    });
  });
});
