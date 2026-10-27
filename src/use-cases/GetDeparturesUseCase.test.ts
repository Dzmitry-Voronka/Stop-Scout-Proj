import { Departure } from '../domain/entities/Departure';
import { IDepartureRepository } from '../domain/repositories/IDepartureRepository';
import { DepartureDelay } from '../domain/value-objects/DepartureDelay';
import { RouteNumber } from '../domain/value-objects/RouteNumber';
import { GetDeparturesUseCase } from './GetDeparturesUseCase';

function departureAt(id: string, isoTime: string): Departure {
  return Departure.create({
    id,
    routeNumber: RouteNumber.create(8),
    headsign: 'Test',
    departureTime: new Date(isoTime),
    delay: DepartureDelay.create(0),
  });
}

describe('GetDeparturesUseCase', () => {
  it('sorts departures by time, earliest first', async () => {
    // Mocked port: this proves the use case logic, not a real data source.
    const repository: IDepartureRepository = {
      getDepartures: jest
        .fn()
        .mockResolvedValue([
          departureAt('late', '2026-01-01T10:20:00Z'),
          departureAt('early', '2026-01-01T10:05:00Z'),
          departureAt('middle', '2026-01-01T10:10:00Z'),
        ]),
    };

    const result = await new GetDeparturesUseCase(repository).execute('2072');

    expect(result.map((d) => d.id)).toEqual(['early', 'middle', 'late']);
  });

  it('asks the repository for the given stop', async () => {
    const getDepartures = jest.fn().mockResolvedValue([]);

    await new GetDeparturesUseCase({ getDepartures }).execute('2072');

    expect(getDepartures).toHaveBeenCalledWith('2072');
  });
});
