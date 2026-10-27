import { Departure } from '../domain/entities/Departure';
import { IDepartureRepository } from '../domain/repositories/IDepartureRepository';
import { DepartureDelay } from '../domain/value-objects/DepartureDelay';
import { RouteNumber } from '../domain/value-objects/RouteNumber';

const MS_PER_MINUTE = 60 * 1000;

interface MockRow {
  id: string;
  route: string | number | null;
  headsign: string;
  inMinutes: number;
  delaySeconds: number | null;
}

// Made-up data for Stage I only. Covers every delay level, a TRISTAR prefix, a night line
// and an unknown route, so each case can be seen on the phone.
const MOCK_ROWS: MockRow[] = [
  { id: 'mock-1', route: 10177, headsign: 'Dworzec Główny', inMinutes: 2, delaySeconds: 0 },
  { id: 'mock-2', route: '8', headsign: 'Jelitkowo', inMinutes: 5, delaySeconds: 90 },
  { id: 'mock-3', route: 10012, headsign: 'Łostowice', inMinutes: 8, delaySeconds: 200 },
  { id: 'mock-4', route: 'n1', headsign: 'Oliwa', inMinutes: 14, delaySeconds: null },
  { id: 'mock-5', route: null, headsign: 'Brzeźno', inMinutes: 20, delaySeconds: 600 },
];

export class MockDepartureRepository implements IDepartureRepository {
  // The stop id is ignored: every stop shows the same mock list.
  async getDepartures(_stopId: string): Promise<Departure[]> {
    const now = Date.now();
    return MOCK_ROWS.map((row) =>
      Departure.create({
        id: row.id,
        routeNumber: RouteNumber.create(row.route),
        headsign: row.headsign,
        departureTime: new Date(now + row.inMinutes * MS_PER_MINUTE),
        delay: DepartureDelay.create(row.delaySeconds),
      }),
    );
  }
}
