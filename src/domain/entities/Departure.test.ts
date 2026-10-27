import { DepartureDelay } from '../value-objects/DepartureDelay';
import { RouteNumber } from '../value-objects/RouteNumber';
import { Departure, DepartureProps } from './Departure';

function validProps(overrides: Partial<DepartureProps> = {}): DepartureProps {
  return {
    id: 'd-1',
    routeNumber: RouteNumber.create(8),
    headsign: 'Jelitkowo',
    departureTime: new Date('2026-01-01T10:00:00Z'),
    delay: DepartureDelay.create(0),
    ...overrides,
  };
}

describe('Departure', () => {
  it('rejects an empty id', () => {
    expect(() => Departure.create(validProps({ id: '  ' }))).toThrow('id');
  });

  it('rejects an invalid date', () => {
    expect(() => Departure.create(validProps({ departureTime: new Date('nope') }))).toThrow(
      'valid date',
    );
  });

  it('is the same departure when the id matches, even if the delay differs', () => {
    const a = Departure.create(validProps({ delay: DepartureDelay.create(0) }));
    const b = Departure.create(validProps({ delay: DepartureDelay.create(300) }));

    expect(a.equals(b)).toBe(true);
  });

  it('is a different departure when the id differs', () => {
    const a = Departure.create(validProps({ id: 'a' }));
    const b = Departure.create(validProps({ id: 'b' }));

    expect(a.equals(b)).toBe(false);
  });
});
