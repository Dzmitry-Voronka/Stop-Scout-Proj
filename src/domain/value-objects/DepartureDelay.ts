// Handout thresholds: from 120 s the delay is "major" (shown in minutes and pulses).
const MAJOR_DELAY_SECONDS = 120;
const SECONDS_PER_MINUTE = 60;
const ON_TIME_LABEL = 'Na czas';

export type DelaySeverity = 'on-time' | 'minor' | 'major';

export class DepartureDelay {
  // Private constructor: instances only come from create(), so the seconds are always valid.
  private constructor(public readonly seconds: number) {}

  // null, undefined, NaN and Infinity mean "no usable delay", which the handout treats as on time.
  static create(seconds: number | null | undefined): DepartureDelay {
    if (seconds === null || seconds === undefined || !Number.isFinite(seconds)) {
      return new DepartureDelay(0);
    }
    // Whole seconds only; a negative delay (early departure) is on time too.
    return new DepartureDelay(Math.max(0, Math.floor(seconds)));
  }

  get severity(): DelaySeverity {
    if (this.seconds === 0) {
      return 'on-time';
    }
    return this.seconds < MAJOR_DELAY_SECONDS ? 'minor' : 'major';
  }

  // Only a major delay pulses; the component reads this instead of knowing the thresholds.
  get shouldPulse(): boolean {
    return this.severity === 'major';
  }

  get label(): string {
    switch (this.severity) {
      case 'on-time':
        return ON_TIME_LABEL;
      case 'minor':
        return `+${this.seconds}s`;
      case 'major':
        return `+${Math.floor(this.seconds / SECONDS_PER_MINUTE)} min`;
    }
  }

  equals(other: DepartureDelay): boolean {
    return this.seconds === other.seconds;
  }
}
