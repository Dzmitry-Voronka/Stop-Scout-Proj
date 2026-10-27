import { Departure } from '../domain/entities/Departure';
import { IDepartureRepository } from '../domain/repositories/IDepartureRepository';

// Depends on the port only, never on a concrete repository.
export class GetDeparturesUseCase {
  constructor(private readonly departures: IDepartureRepository) {}

  // Business rule: the earliest departure comes first, whatever order the source returns.
  async execute(stopId: string): Promise<Departure[]> {
    const all = await this.departures.getDepartures(stopId);
    return [...all].sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime());
  }
}
