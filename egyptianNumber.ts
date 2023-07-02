export class EgyptianNumber {
  static readonly numberToGlyph: readonly [number, string][] = [
    [1000000, '𓁨'],
    [100000, '𓆐'],
    [90000, '𓂵'],
    [80000, '𓂴'],
    [70000, '𓂳'],
    [60000, '𓂲'],
    [50000, '𓂱'],
    [40000, '𓂰'],
    [30000, '𓂯'],
    [20000, '𓂮'],
    [10000, '𓂭'],
    [9000, '𓇄'],
    [8000, '𓇃'],
    [7000, '𓇂'],
    [6000, '𓇁'],
    [5000, '𓇀'],
    [4000, '𓆿'],
    [3000, '𓆾'],
    [2000, '𓆽'],
    [1000, '𓆼'],
    [900, '𓍪'],
    [800, '𓍩'],
    [700, '𓍨'],
    [600, '𓍧'],
    [500, '𓍦'],
    [400, '𓍥'],
    [300, '𓍤'],
    [200, '𓍣'],
    [100, '𓍢'],
    [90, '𓎎'],
    [80, '𓎍'],
    [70, '𓎌'],
    [60, '𓎋'],
    [50, '𓎊'],
    [40, '𓎉'],
    [30, '𓎈'],
    [20, '𓎇'],
    [10, '𓎆'],
    [9, '𓐂'],
    [8, '𓐁'],
    [7, '𓐀'],
    [6, '𓏿'],
    [5, '𓏾'],
    [4, '𓏽'],
    [3, '𓏼'],
    [2, '𓏻'],
    [1, '𓏺'],
  ];
  static readonly glyphToNumber: ReadonlyMap<string, number> = new Map<string, number>();

  readonly nominator: bigint;
  readonly denominator: bigint;
  private _normalized: readonly [bigint, bigint][];
  private _hieroglyphs: string;

  static {
    const additionalGlyphs: [number, string][] = [
      [5, '𓐃'],
      [20, '𓎏'],
      [30, '𓎐'],
      [40, '𓎑'],
      [50, '𓎒'],
      [500, '𓍫'],
      [50000, '𓂶'],
    ];

    this.numberToGlyph.forEach(([integer, glyph]) => {
      this.glyphToNumber[glyph] = integer;
    });
    additionalGlyphs.forEach(([integer, glyph]) => {
      this.glyphToNumber[glyph] = integer;
    });
  }

  constructor(nominator: number | bigint, denominator: number | bigint = 1) {
    const gcd = EgyptianNumber.gcd(nominator, denominator);
    this.nominator = BigInt(nominator) / gcd;
    this.denominator = BigInt(denominator) / gcd;
    if (this.denominator < 0) {
      this.nominator = -this.nominator;
      this.denominator = -this.denominator;
    }
  }

  toString(): string {
    return `EgyptianNumber(${this.nominator}, ${this.denominator}) ${this.toHieroglyphs()}`;
  }

  toHieroglyphs(): string {
    if (this._hieroglyphs)  return this._hieroglyphs;

    {
      let glyphs: string = '';
      this.normalized.forEach(([nom, denom]) => {
        if (denom == BigInt(1))       glyphs += EgyptianNumber.formatIntegerToString(nom);
        else if (nom == BigInt(2))    glyphs += '𓂌';
        else if (denom == BigInt(2))  glyphs += '𓐛';
        else if (denom == BigInt(4))  glyphs += '𓏴';
        else glyphs += '𓂋' + EgyptianNumber.formatIntegerToString(denom);
      });
      this._hieroglyphs = glyphs;
    }

    return this._hieroglyphs;
  }

  get normalized(): readonly [bigint, bigint][] {
    if (this._normalized) return this._normalized;

    let nom: bigint = this.nominator;
    let denom: bigint = this.denominator;
    let normalized: [bigint, bigint][] = [];
    if (nom == BigInt(0)) {
      this._normalized = [[BigInt(0), BigInt(1)]];
      return this._normalized;
    }
    const sign = (nom > 0) ? 1 : -1;
    if (nom < 0) {
      nom = -nom;
    }
    { // extract integer part.
      if (nom < denom) {
        // normalized[0] must always be an integer.
        normalized.push([BigInt(0), BigInt(1)]);
      }
      else {
        normalized.push([nom / denom, BigInt(1)]);
        nom %= denom;
      }
    }
    { // extract 2/3
      const newNom = BigInt(3) * nom - BigInt(2) * denom;
      if (newNom >= 0) {
        normalized.push([BigInt(2), BigInt(3)]);
        nom = newNom;
        denom *= BigInt(3);
      }
    }
    while (nom > 0) {
      const unitFrac = denom / nom + BigInt((denom % nom) ? 1 : 0);
      normalized.push([BigInt(1), unitFrac]);
      nom = nom * unitFrac - denom;
      denom *= unitFrac;
    }
    if (sign < 0) {
      normalized = normalized.map(([x, y]) => [x, -y]);
    }

    this._normalized = normalized;
    return this._normalized;
  }

  isEqualTo(a: EgyptianNumber): boolean {
    return this.denominator * a.nominator == a.denominator * this.nominator;
  }

  static add(a: EgyptianNumber, b: EgyptianNumber): EgyptianNumber {
    return new EgyptianNumber(a.nominator * b.denominator + b.nominator * a.denominator, a.denominator * b.denominator);
  }

  static addAll(...summands: EgyptianNumber[]): EgyptianNumber {
    let result = new EgyptianNumber(0);
    summands.forEach((summand, i, array) => {
      result = this.add(result, summand);
    })
    return result;
  }

  static subtract(a: EgyptianNumber, b: EgyptianNumber): EgyptianNumber {
    return new EgyptianNumber(a.nominator * b.denominator - b.nominator * a.denominator, a.denominator * b.denominator);
  }

  static reverseSubtract(b: EgyptianNumber, a: EgyptianNumber): EgyptianNumber {
    return EgyptianNumber.subtract(a, b);
  }

  static multiply(a: EgyptianNumber, b: EgyptianNumber): EgyptianNumber {
    return new EgyptianNumber(a.nominator * b.nominator, a.denominator * b.denominator);
  }

  static divide(a: EgyptianNumber, b: EgyptianNumber): EgyptianNumber {
    return new EgyptianNumber(a.nominator * b.denominator, a.denominator * b.nominator);
  }

  static parseIntegerFromString(str: string | undefined): number {
    if (str == undefined)
      return 0;
    return Array.from(str).map(glyph => this.glyphToNumber[glyph]).reduce((a, b) => a + b);
  }

  static formatIntegerToString(a: bigint): string {
    let glyphs = '';
    EgyptianNumber.numberToGlyph.forEach(([integer, glyph]) => {
      if (a >= integer) {
        glyphs += glyph.repeat(Number(a / BigInt(integer)));
        a %= BigInt(integer);
      }
    });
    return glyphs;
  }

  static gcd(a: bigint | number, b: bigint | number): bigint {
    if (b == 0) {
      return (a > 0) ? BigInt(a) : BigInt(-a);
    }
    return this.gcd(b, BigInt(a) % BigInt(b));
  }
}
