import { countryConstants } from "./constants";

export default class Country {
  constructor(name, coords) {
    if (!Country.areCoordsValid(coords)) {
      throw new Error(`INVALID COORDINATES OF COUNTRY: ${name}`);
    }
    if (name.length > countryConstants.NAME_MAX_LENGTH) {
      throw new Error(
        `NAME MUST CONTAIN LESS THAT ${countryConstants.NAME_MAX_LENGTH} SYMBOLS`
      );
    }
    //validateCountry(this);

    this.cities = [];
    this.name = name;
    this.coords = coords;
  }

  static areCoordsValid({ xl, yl, xh, yh }) {
    const isCorrectLowHighRange = (low, high) => low <= high;

    const isIntegerInBounds = (coord) => {
      if (!Number.isInteger(coord)) return false;
      return (
        coord >= countryConstants.MIN_COORD &&
        coord <= countryConstants.MAX_COORD
      );
    };

    return [
      [xl, yl, xh, yh].every((coord) => isIntegerInBounds(coord)),
      isCorrectLowHighRange(xl, xh),
      isCorrectLowHighRange(yl, yh),
    ].every((result) => result);
  }

  addCity(city) {
    this.cities.push(city);
  }

  isCompleted() {
    return this.cities.every((city) => city.isCompleted());
  }

  //todo refactor
  static parseCountryString(countryString) {
    const [name, ...coords] = countryString.split(" ");
    const [xl, yl, xh, yh] = coords.map((coord) => parseInt(coord));
    return new Country(name, { xl, yl, xh, yh });
  }
}
