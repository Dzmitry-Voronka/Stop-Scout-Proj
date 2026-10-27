import { DepartureDelay } from '../value-objects/DepartureDelay';
import { RouteNumber } from '../value-objects/RouteNumber';

export interface DepartureProps {
  id: string;
  routeNumber: RouteNumber;
  headsign: string;
  departureTime: Date;
  delay: DepartureDelay;
}

const EMPTY_ID_ERROR = 'Departure id must not be empty';
const INVALID_TIME_ERROR = 'Departure time must be a valid date';

// Entity: identified by its id. Two departures with the same id are the same departure,
// even if the delay changed between two refreshes.
export class Departure {
  private constructor(
    public readonly id: string,
    public readonly routeNumber: RouteNumber,
    public readonly headsign: string,
    public readonly departureTime: Date,
    public readonly delay: DepartureDelay,
  ) {}

  static create(props: DepartureProps): Departure {
    if (props.id.trim() === '') {
      throw new Error(EMPTY_ID_ERROR);
    }
    if (Number.isNaN(props.departureTime.getTime())) {
      throw new Error(INVALID_TIME_ERROR);
    }
    return new Departure(
      props.id,
      props.routeNumber,
      props.headsign,
      props.departureTime,
      props.delay,
    );
  }

  equals(other: Departure): boolean {
    return this.id === other.id;
  }
}
