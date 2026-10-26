// TRISTAR operator ids are added in front of the line number: 10177 -> 177.
const OPERATOR_PREFIX_DIVISOR = 10000;
const UNKNOWN_ROUTE = '?';
const NIGHT_LINE_PREFIX = 'N';

export class RouteNumber {
  // Private constructor: the only way to get a RouteNumber is create(), so every instance is normalized.
  private constructor(public readonly value: string) {}

  static create(raw: string | number | null | undefined): RouteNumber {
    if (raw === null || raw === undefined) {
      return new RouteNumber(UNKNOWN_ROUTE);
    }

    const text = String(raw).trim();
    if (text === '') {
      return new RouteNumber(UNKNOWN_ROUTE);
    }

    // Only whole numbers are line numbers with a possible operator prefix; "N1" or "A" are not.
    if (/^\d+$/.test(text)) {
      const number = Number(text);
      if (number >= OPERATOR_PREFIX_DIVISOR) {
        return new RouteNumber(String(number % OPERATOR_PREFIX_DIVISOR));
      }
    }

    return new RouteNumber(text.toUpperCase());
  }

  isNightLine(): boolean {
    return this.value.startsWith(NIGHT_LINE_PREFIX);
  }

  // Value objects are equal when their values are equal, not when they are the same object.
  equals(other: RouteNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
