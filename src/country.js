import { isInteger } from "lodash";
import City from "./city";
import { countryConstants } from "./constants";

//country coords

export default class Country {

  constructor(name, coords) {
    if (!Country.areCoordinatesValid(coords)) {
      throw new Error("Coordinates are invalid");
    }
    if (name.length > countryConstants.NAME_MAX_LENGTH) {
      throw new Error(
        `Name must be less than ${countryConstants.NAME_MAX_LENGTH} characters`
      );
    }

    this.cities = [];
    this.name = name;
    this.coords = coords;
  }

  static areCoordinatesValid({ xl, yl, xh, yh }) {
    const isCorrectLowHighRange = (low, high) => low <= high;

    const isIntegerInBounds = (coord) => {
      if (!Number.isInteger(coord)) return false;
      return (
        coord >= countryConstants.MIN_COORD &&
        coord <= countryConstants.MAX_COORD
      );
    };

    return [
      isIntegerInBounds(xl),
      isIntegerInBounds(yl),
      isIntegerInBounds(xh),
      isIntegerInBounds(yh),
      isCorrectLowHighRange(xl, xh),
      isCorrectLowHighRange(yl, yh),
    ].every((result) => result === true);
  }

  addCity(city) {
    this.cities.push(city);
  }

  isCompleted() {
    return this.cities.every((city) => city.isCompleted());
  }

  static parseCountryString(countryString) {
    const [name, ...coords] = countryString.split(" ");
    const [xl, yl, xh, yh] = coords.map((coord) => parseInt(coord));
    return new Country(name, { xl, yl, xh, yh });
  }
}
