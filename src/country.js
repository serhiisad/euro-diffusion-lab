import { countryConstants } from "./constants";
import Validation from "./validation";

export default class Country {
  constructor(name, coords) {
  
    Validation.validateCountryData(name, coords);

    this.cities = [];
    this.name = name;
    this.coords = coords;
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
