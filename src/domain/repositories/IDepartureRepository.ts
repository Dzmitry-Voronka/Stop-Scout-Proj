import { Departure } from '../entities/Departure';

// Port: the domain says what it needs; infrastructure decides how to get it (mock now, API later).
export interface IDepartureRepository {
  getDepartures(stopId: string): Promise<Departure[]>;
}
