import { countryConstants } from "./constants";

export default class Validation {
  static areCoordsValid(coords) {
    const { xl, yl, xh, yh } = coords;

    const isCorrectBounds = (coord) => {
      if (!Number.isInteger(coord)) return false;
      return (
        coord >= countryConstants.MIN_COORD &&
        coord <= countryConstants.MAX_COORD
      );
    };
    const isCorrectLowHighRange = (coord_l, coord_h) => coord_l <= coord_h;
    return [
      [xl, yl, xh, yh].every((coord) => isCorrectBounds(coord)),
      isCorrectLowHighRange(xl, xh),
      isCorrectLowHighRange(yl, yh),
    ].every((result) => result);
  }

  static validateCountryData(countryName, coords) {
    if (!Validation.areCoordsValid(coords)) {
      throw new Error(`INVALID COORDINATES OF COUNTRY: ${countryName}`);
    }
    if (countryName.length > countryConstants.NAME_MAX_LENGTH) {
      throw new Error(
        `NAME MUST CONTAIN LESS THAT ${countryConstants.NAME_MAX_LENGTH} SYMBOLS`
      );
    }
  }
}
